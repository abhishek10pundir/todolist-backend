/**
 * modules dependencies.
 */
const socketio = require('socket.io');
const mongoose = require('mongoose');
const shortid = require('shortid');
const logger = require('./loggerLib.js');
const events = require('events');
const eventEmitter = new events.EventEmitter();

const tokenLib = require("./tokenLib.js");
const check = require("./checkLib.js");
const response = require('./responseLib')

const TodoListModel = mongoose.model('todolistSchema');
const UserModel = mongoose.model('User');
const RequestFriendList = mongoose.model('RequestFriendList');
const redisLib = require("./redisLib.js");


//setServer function start
let setServer = (server) => {

    let io = socketio.listen(server);

    let myIo = io.of('/')

    myIo.on('connection', (socket) => {

        console.log("on connection--emitting verify user");

        socket.emit("verifyUser", "");

        // code to verify the user and make him online

        socket.on('set-user', (authToken) => {

            console.log("set-user called")
            tokenLib.verifyClaimWithoutKey(authToken, (err, user) => {
                if (err) {
                    socket.emit('auth-error', { status: 500, error: 'Please provide correct auth token' })
                }
                else {

                    console.log("user is verified..setting details");
                    let currentUser = user.data;
                    // setting socket user id 
                    socket.userId = currentUser.userId
                    let fullName = `${currentUser.firstName} ${currentUser.lastName}`
                    let key = currentUser.userId
                    let value = fullName

                    let setUserOnline = redisLib.setANewOnlineUserInHash("onlineUsers", key, value, (err, result) => {
                        if (err) {
                            console.log(`some error occurred`)
                        } else {
                            // getting online users list.

                            redisLib.getAllUsersInAHash('onlineUsers', (err, result) => {
                                console.log(`--- inside getAllUsersInAHas function ---`)
                                if (err) {
                                    console.log(err)
                                } else {

                                    console.log(`${fullName} is online`);
                                    // setting room name
                                    socket.room = 'todoRoom';
                                    
                                    // joining chat-group room.
                                    socket.join(socket.room)
                                    socket.to(socket.room).broadcast.emit('online-user-list', result);


                                }
                            })
                        }
                    })



                }


            })

        }) // end of listening set-user event


        socket.on('disconnect', () => {
            // disconnect the user from socket
            // remove the user from online list
            // unsubscribe the user from his own channel

            console.log("user is disconnected");
            // console.log(socket.connectorName);
            console.log(socket.userId);


            // var removeIndex = allOnlineUsers.map(function (user) { return user.userId; }).indexOf(socket.userId);
            // allOnlineUsers.splice(removeIndex, 1)
            // console.log(allOnlineUsers)

            if (socket.userId) {
				console.log('delete')
                redisLib.deleteUserFromHash('onlineUsers', socket.userId)
				   
				    
				redisLib.getAllUsersInAHash('onlineUsers', (err, result) => {
                    if (err) {
                        console.log(err)
                    } else {
                        socket.leave(socket.room)
                        io.to(socket.room).emit('online-user-list', result);


                    }
                })
            }









        }) // end of on disconnect


        socket.on('friend-request', (data) => {
            console.log("socket friend-request called")

            data['friendRequestId'] = shortid.generate()
            console.log(data);

            // event to save chat.
            setTimeout(function () {

                eventEmitter.emit('save-friend-request-list', data);

            }, 2000);
            myIo.emit(data.receiverId, data );

        });


        socket.on('accept-friend-request', (data) => {
            console.log("socket accept-friend-request called");

             

            // event to save friend into reciever friend list.
            setTimeout(function () {

                eventEmitter.emit('save-accepted-friend-request', data);

            }, 2000);
            myIo.emit(data.receiverId, data);

        });


        socket.on('update', (data) => {
			console.log('update socket');
			console.log(data.userId);
				socket.to(data.userId).broadcast.emit('updateemit', data.senderName+'has update item in'+data.userId);
				
				
			
			
             

        });




    });

}


// database operations are kept outside of socket.io code.

// saving chats to database.
eventEmitter.on('save-friend-request-list', (data) => {

    // let today = Date.now();

    let newfriendRequest = new RequestFriendList({

        friendRequestId: data.friendRequestId,
        senderName: data.senderName,
        senderId: data.senderId,
        receiverName: data.receiverName || '',
        receiverId: data.receiverId || '',
        createdOn: data.createdOn

    });

    newfriendRequest.save((err, result) => {
        if (err) {
            console.log(`error occurred: ${err}`);
        }
        else if (result == undefined || result == null || result == "") {
            console.log("request is not saved");
        }
        else {
            console.log("request saved.");
            console.log(result);
        }
    });

}); // end of saving chat.
eventEmitter.on('save-accepted-friend-request', (data) => {
    console.log(data.senderId)
    console.log(data.receiverId);
    let findquery={
        $or: [{userId:data.senderId },
            {userId:data.receiverId}] 
     }
    UserModel.find(findquery)
    .exec((err,result)=>{
        if(err){
            console.log('error',err);
        }else if(result){
           for (let i = 0; i < 2; i++) {
            if(result[i].userId===data.senderId){
                let arr=result[i].friends;
                arr.push(data.receiverId)
                result[i].friends=arr;
             }else{
                 let arr=result[i].friends;
                 arr.push(data.senderId)
                result[i].friends=arr;
            }
            result[i].save((err,success)=>{
                if(err){
                    console.log('error while saving friend',err);
                }else{
                    console.log('result save ');
                }
            });
            }
            let deleteQuery={
                $and: [{receiverId:data.senderId },
                    {senderId:data.receiverId}] 
            }
            RequestFriendList.deleteMany(deleteQuery).exec((err,result)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log('deleted from friendRequestModel');
                }
            })
        }
       
    });
});

///redis code 




module.exports = {
    setServer: setServer
}

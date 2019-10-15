const mongoose = require('mongoose');
 
const shortid = require('shortid');
const time = require('../libs/timeLib');
const response = require('../libs/responseLib');
const logger = require('../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib');
const check = require('../libs/checkLib');
const token = require('../libs/tokenLib');
const passwordLib = require('../libs/generatePasswordLib');
 
/* Models */
const UserModel = mongoose.model('User');
const Undo=mongoose.model('undoSchema');  
 
const Todolist=mongoose.model('todolistSchema'); 
 
// start user create todolist function 

let createTodoList = (req, res) => {
    let newtodoList=new Todolist({ 
        top:true,
        _id:new mongoose.Types.ObjectId(),        
        listId:shortid.generate(), 
        listName:req.body.listName || '',
        userId:req.body.userId,
        value:req.body.value ||'',
        createdOn:time.now() 
    }); 
    newtodoList.save((err, newtodo) => {
        if (err) {
            console.log(err);
            logger.error(err.message, 'singleUserListMananementController: newtodoList', 10)
            let apiResponse = response.generate(true, ':) Failed to create new List try again', 500, null)
            res.send(apiResponse);
        } else {
            let newtodoList = newtodo.toObject();
            res.send(newtodoList);
        }
    })
}// end user created todo list function 

//get top list node of every todolist of user
let getTodolist=(req,res)=>{
    let findquery={
        $and: [{userId:req.body.userId },
            {top:true}] 
     }
    Todolist. find(findquery)
    
    .exec((err,result)=>{
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
    
}
//end getTodolist
//add item to list function start
let addItem=(req,res)=>{
  
    let newtodoList=new Todolist({ 
        _id:new mongoose.Types.ObjectId(),        
        listId:shortid.generate(), 
        listName:req.body.listName || '',
        userId:req.body.userId,
        value:req.body.value ||'',
        parentId:req.body.parentId,
        createdOn:time.now() 
    }); 
      newtodoList.save((err, newtodo) => {
        if (err) {
            console.log(err);
            logger.error(err.message, 'singleUserListMananementController: newtodoList', 10)
            let apiResponse = response.generate(true, ':) Failed to create new List try again', 500, null)
            res.send(apiResponse);
        } else {
            let newtodoList = newtodo.toObject();
            if( req.body.optional==="0" ){
                console.log('new item addto undo');
           //add this action to undo 
           let undo = new Undo({
               logId: new mongoose.Types.ObjectId(),
               typeOfCrud: "ItemAdded",
               userId:req.body.userId,
               todo:newtodoList,
               todoId:newtodoList._id,
               createdOn:Date.now()
           });
           undo.save((err,result)=>{
               if(err){
                   console.log(err);
               }else{
                   console.log('undo item added');
                   console.log(result);
               }
           });
       
       }else if(req.body.optional==="1"){
               console.log('undo item deleted');
               
           Undo.deleteOne({todoId:newtodo._id}).exec((err,result)=>{
               if(err){
                   console.log(err);
               }else{
                   console.log('undo item deleted success');
               }
           })
       
       }else {
           console.log(err);
       }
     }
    })
    //add item into parent
    Todolist.findOne({_id:req.body.parentId})
    .exec((err,result)=>{
        if(err){
            res.send('no parent with this id');
        }else{
           
            let arr=result.childrenId;
            arr.push(newtodoList._id);
            result.childrenId=arr;
            result.save((err,saveChanges)=>{
                if (err) {
                    res.send(err);
                } else {
                   
                   
            

                    res.send(newtodoList);
                }
            })
        }
    })
   
}
//addItem end

//function to add the list when undo
let addItemUndo=  (req,res)=>{
     
    let newtodoList=new Todolist({ 
        _id:mongoose.Types.ObjectId(req.body._id),        
        listId:shortid.generate(), 
        listName:req.body.listName || '',
        userId:req.body.userId,
        value:req.body.value ||'',
        parentId:req.body.parentId,
        createdOn:time.now() 
    }); 
    newtodoList.save((err, newtodo) => {
        if (err) {
           
            logger.error(err.message, 'singleUserListMananementController: newtodoList', 10)
            let apiResponse = response.generate(true, ':) Failed to create new List try again', 500, null)
            res.send(apiResponse);
        } else {
             
             Undo.find({todoId:newtodo._id}).sort({createdOn :'desc'}).exec((err,result)=>{
                if(err){
                    console.log(err);
                }else{
                     
                    Undo.deleteOne({_id:result[0]._id}).exec((err,result)=>{
                        if(result){
                            console.log('undo item deleted success');
                        }
                    })
                    

                }
            })
             
        }

})
 //add item into parent
 Todolist.findOne({_id:req.body.parentId})
 .exec((err,result)=>{
     if(err){
         res.send('no parent with this id');
     }else{
        
         let arr=result.childrenId;
         arr.push(newtodoList._id);
         result.childrenId=arr;
         result.save((err,saveChanges)=>{
             if (err) {
                 res.send(err);
             } else {
                res.send(newtodoList);
             }
         })
     }
 })
}

//end 

//delete item from todolist
let deleteItemFromTodo=(req,res)=>{
     
    //remove childreId from parent children array
    let removeChildIdFromParent = () => {
        console.log('removeChildIdFromParent');
        return new Promise((resolve, reject) => {
            Todolist.findOne({ childrenId: req.body._id })
                .exec((err, result) => {
                    if (err) {
                        reject.send(err);
                    } else if (result) {
                        let arr = result.childrenId;
                        arr.pop(req.body._id);
                        result.childrenId = arr;
                        result.save((err, savechange) => {
                            if (err) {
                                reject.send(err);
                            }else{
                                resolve(req);
                            }
                        });
                    }else {
                        resolve(req);
                    }
                });
            });
        }
    //childreId is removed from parent children array

    //if current item has sub item delete them as well
    let getCurrentItem = (req) => {
        console.log('getCurrentItem');
         
        return new Promise((resolve, reject) => {
            Todolist.find({ _id: req.body._id })
                .exec((err, result) => {
                    if (err) {
                        reject.send(err);
                    } else {
                          
                        resolve(result);
                    }
                });
        });
    }
    //end of getcurrent function
    //get all childnode
    let   getchildNode= (parentNode)=>{
        return new Promise((resolve, reject) => {
        console.log('getchildNode------------------------------------------');
        let stack=[];
        let undoStackReverse=[];
        let undoStack=[];
        let storeId=[];
         
        stack.push(parentNode[0]);
          let i=0;
        while(stack.length>0){
            let tempItem=stack.pop();
            i+=1;
            if(tempItem.top!=true){
            undoStackReverse.push(tempItem);
            }
             
            storeId.push(tempItem._id);
             Todolist.find({_id:{$in:tempItem.childrenId}})
            .exec((err,result)=>{
                if(err){
                    reject(err);
                } else if(result){
                    stack.push(result);
                } 
            });
            console.log(i);
        }//end of while loop
        
        while(undoStackReverse.length>0){
            let temp=undoStackReverse.pop();
            undoStack.push(temp);
           
        }
        
        while(undoStack.length>0){
            let tempItem=undoStack.pop();
          
             console.log(req.body.optional);
            //check if item already in undo then intead of adding delete it from undo 
           
                
                if( ( req.body.optional==="0")){
                    
            //add this action to undo 
            let undo = new Undo({
                logId: new mongoose.Types.ObjectId(),
                typeOfCrud: "Itemdeleted",
                userId:req.body.userId,
                todoId:tempItem._id,
                todo:tempItem,
                createdOn:Date.now()
            });
            undo.save((err,result)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log('undo item added');
                    console.log(result);
                }
            });

            //end of adding log action to undo model
        
                }else if(req.body.optional==="1"){
                        console.log('this is undo for delete')
                    Undo.deleteOne({todoId: tempItem._id}).exec((err,result)=>{
                        if(err){
                            console.log(err);
                        }else{
                            console.log('err in undo',result);
                        }
                    })
                
                }else {
                    console.log(err);
                }
            
         

        }//end of while loop
        console.log('storeId',storeId);
        resolve(storeId);
    });
    };
    
    //end of delete chidren of current item

    //delete parent and its children
    let deleteItems=(id)=>{
    /* todolist.deleteOne({_id:req.body._id})
    .exec((err,result)=>{
        if(err){
            res.send(err);
        }else{
            res.send('item-deleted');
        }
    }) */
    return new Promise((resolve, reject) => {
    console.log('deleteItems');
    console.log('id',id);
    console.log(id);    
    Todolist.deleteMany({_id:{$in:id}})
    .exec((err,result)=>{
        if(err){
            reject(err);
        }else{
            resolve(result);
        }
    })
});
}
//end of deleteItems

removeChildIdFromParent(req,res)
.then(getCurrentItem)
.then(getchildNode)
.then(deleteItems)
.then((resolve) => {
    let apiResponse = response.generate(false, 'delete success', 200, resolve)
    res.status(200)
    res.send(apiResponse)
})
.catch((err) => {
    console.log("errorhandler");
    console.log(err);
    res.status(err.status)
    res.send(err)
})
}
//end of deleteitem function

//edit items to list
let editItems= (req,res)=>{
    
    console.log('edit call');
     Todolist.findOne({_id:req.body._id})
    .exec((err,resultOne)=>{
        if(err){
            res.send('no items with this id');
        }else{
            let item=resultOne ;
            console.log('------------------------------------------------------item',item);
            if(req.body.optional==="0"){
                //add log into undo 
                console.log('---------------------');
                let undo = new Undo({
                    logId: new mongoose.Types.ObjectId(),
                    typeOfCrud: "ItemEdited",
                    userId:req.body.userId,
                    todoId:item._id,
                    todo:item,
                    createdOn:Date.now()
                });
                 undo.save((err,result)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log('undo item edit');
                        console.log(result);
                    }
                });
            }else if(req.body.optional==="1"){
                Undo.find({todoId:resultOne._id}).sort({createdOn :'desc'}).exec((err,result)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log('fiiiiiiiiiinnnnnndd');
                        Undo.deleteOne({_id:result[0]._id}).exec((err,result)=>{
                            if(result){
                                console.log('undo item deleted success');
                            }
                        })
                        
    
                    }
                })
                
            }
            else {
                console.log(err);
            }
        
                //end of undo
                
            resultOne.value=req.body.value;
            resultOne.listName=req.body.value;
            resultOne.save((err,saveChanges)=>{
                if(err){
                    res.send(err);
                }else{
                     
                    console.log('saaaaaaaaaaaaaa',saveChanges);   
                    let apiResponse = response.generate(false, 'edit success', 200, null)
                    res.send(apiResponse);
                }
            });
        }
    })
}
//end of editItmes function

let checkBox=(req,res)=>{
    Todolist.findOne({_id:req.body._id})
    .exec((err,resultOne)=>{
        if(err){
            res.send('no items with this id');
        }else{
            resultOne.done=req.body.done;
            console.log(req.body.done);
            resultOne.save((err,saveChanges)=>{
                if(err){
                    res.send(err);
                }else{
                     
                    console.log('saaaaaaaaaaaaaa',saveChanges);   
                    let apiResponse = response.generate(false, 'checkboxedit success', 200, saveChanges)
                    res.send(apiResponse);
                }
            });
        }
    })
}
 //module exports start
 let deleteL=(req,res)=>{
    Todolist.deleteMany().exec((err,result)=>{
        if(err){
            console.log(err);
        }else{
           res.send('deleted');
        }
    })
 }
 //function to get all child nodes of top node
 let getchildNodes=async (req,res)=>{
    console.log('getchildNode');
    let stack=[];
    let storeChild=[];
    let parentNode=await Todolist.findOne({_id:req.body.parentId});
    console.log('parent',parentNode);
    stack.push(parentNode);
     console.log('stack',stack);
    while(stack.length>0){
        let child;
        let tempItem=stack.pop();
         
        storeChild.push(tempItem);
          child=await Todolist.find({_id:{$in:tempItem.childrenId}});
         if(child.length>0){
             for(item of child){
                 stack.push(item);
             }
         }
        
    }
     
    res.send(storeChild);
 }
 //end of getchildNodes

 //checkbox 

 //undo functionality
 let undoAction=async (req,res)=>{
   await  Undo.findOne({userId:req.body.userId})
    .sort({createdOn:'desc'})
    .exec((err,result)=>{
        if(err){
            console.log('err',err);
        }else{
            res.send(result);
             
           
        }
    });
 }

 let undoAll =(req,res)=>{
     Undo.find({userId:req.body.userId}).exec((err,result)=>{
         if(result){
             res.send(result);
         }
     })
 }

 let deleteUndo=(req,res)=>{
     Undo.deleteMany({}).exec((err,result)=>{
         if(err){}else{res.send('deleted')}
     })
 }

module.exports = {

    createTodoList: createTodoList,
    addItem:addItem,
    addItemUndo:addItemUndo,
    getTodolist:getTodolist,
    deleteItemFromTodo:deleteItemFromTodo,
    editItems:editItems,
    checkBox:checkBox,
    deleteL:deleteL,
    getchildNodes:getchildNodes,
    undoAction:undoAction,
    deleteUndo:deleteUndo,
    undoAll:undoAll
}// end exports
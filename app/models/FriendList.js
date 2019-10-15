/**
 * module dependencies
 */
const mongoose = require('mongoose')

const Schema = mongoose.Schema

let requestFriendList = new Schema({

  friendRequestId: { type: String, unique: true, required: true },
  senderName: { type: String, default: '' },
  senderId: { type: String, default: '' },
  receiverName: { type: String, default: '' },
  receiverId: { type: String, default: '' },
  createdOn: { type: Date, default: Date.now },
  

})

mongoose.model('RequestFriendList', requestFriendList);

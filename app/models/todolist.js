'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
   
let todolistSchema = new Schema({
  _id: Schema.Types.ObjectId,
  listId: {
    type: String,
    index: true,
    unique: true
  },
   top:{
     type:Boolean,
     default:false
   },
  listName: {
    type: String,
    default: ''
  },
  userId: {
    type: String,
  },

  value: {
    type: String,
    default: ''
  },
  done:{
    type:String,
    default:"0"
  },

  createdOn: {
    type: Date,
    default: ""
  },

  childrenId:[{type: Schema.Types.ObjectId, ref:'todolistSchema' }],
  parentId:[{type: Schema.Types.ObjectId, ref:'todolistSchema' }]

})
 
 
mongoose.model('todolistSchema', todolistSchema);
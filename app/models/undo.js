'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
   
let undoSchema = new Schema({
   
  logId: {
    type: Schema.Types.ObjectId,
    index: true,
    unique: true
  },
  userId:{
      type:String
  },
   typeOfCrud:{
    type:String
   },
   todo:[],
   todoId:[],

  createdOn: {
    type: Date,
    default: ""
  }
 

})
 
 
mongoose.model('undoSchema', undoSchema);
const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")
const singleusersList=require('../controllers/singleUserListManagementController');
const auth=require('../middlewares/auth');
module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/singleusers`;

    // defining routes.
  /**
     * @apiGroup singleusersList
     * @apiVersion  1.0.0
     * @api {post} /api/v1/singleusers/createtodolist api for createList.
     *
     * @apiParam {string} listName listName of the list. (body params) (required)
     * @apiParam {string} userId userId of the user. (body params) (required)
     * 
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
             "__v": 0,
            "_id": "5da4d3695ad2401d008132df",
            "listId": "xKxNDVNJ",
            "userId": "e9zoIay7",
            "parentId": [],
            "childrenId": [],
            "createdOn": "2019-10-14T19:58:33.000Z",
            "done": "0",
            "value": "",
            "listName": "",
            "top": true
}
    */

     

    // params:  userId,listName
    app.post(`${baseUrl}/createtodolist`,singleusersList.createTodoList);

    /**
     * @apiGroup singleusersList
     * @apiVersion  1.0.0
     * @api {post} /api/v1/singleusers/addItem api for additem.
     *
     * @apiParam {string} listName listName of the list. (body params) (required)
     * @apiParam {string} userId userId of the user. (body params) (required)
     *  @apiParam {string} parentId parentId of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
             "__v": 0,
            "_id": "5da4d3695ad2401d008132df",
            "listId": "xKxNDVNJ",
            "userId": "e9zoIay7",
            "parentId": [],
            "childrenId": [],
            "createdOn": "2019-10-14T19:58:33.000Z",
            "done": "0",
            "value": "",
            "listName": "",
            "top": true
}
    */

     

    // params:  userId,listName,parentId
    app.post(`${baseUrl}/addItem`,singleusersList.addItem);

    /**
     * @apiGroup singleusersList
     * @apiVersion  1.0.0
     * @api {post} /api/v1/singleusers/gettodolist api to get top node of todolist of user  .
     *
     * @apiParam {string} userId userId of the user. (auth headers) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
             {
                "__v": 0,
                "_id": "5da4d3695ad2401d008132df",
                "listId": "xKxNDVNJ",
                "userId": "e9zoIay7",
                "parentId": [],
                "childrenId": [],
                "createdOn": "2019-10-14T19:58:33.000Z",
                "done": "0",
                "value": "",
                "listName": "",
                "top": true
}

        }
    */

    //   params: userId.
    app.post(`${baseUrl}/gettodolist`,singleusersList.getTodolist);
    app.post(`${baseUrl}/addItemUndo`,singleusersList.addItemUndo);
     /**
     * @apiGroup singleusersList
     * @apiVersion  1.0.0
     * @api {post} /api/v1/singleusers/deleteitem api to delete item from todolist  .
     *
     * @apiParam {string} _id _id of the item to delete. (auth headers) (required)
     * @apiParam {string} userId userId of the user. (auth headers) (required)
     * @apiParam {string} optional optional set it to 0.It is used for the undo purpose . (auth headers) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
       {
           item deleted
       }
    */

    //   params: userId,_id,optional=0
    app.post(`${baseUrl}/deleteitem`, singleusersList.deleteItemFromTodo);
     /**
     * @apiGroup singleusersList
     * @apiVersion  1.0.0
     * @api {post} /api/v1/singleusers/edititem api to edit particular item  .
     *
     * @apiParam {string} _id _id of the list to edit. (auth headers) (required)
     * @apiParam {string} value value of the list to edit. (auth headers) (required)
     * @apiParam {string} userId userId of the user. (auth headers) (required)
     * @apiParam {string} optional optional set it to 0.It is used for the undo purpose . (auth headers) (required)
     *  
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
       {
           item edited
       }
    */

    //   params: userId,_id,value,optional=0
    app.post(`${baseUrl}/edititem`, singleusersList.editItems);
    app.post(`${baseUrl}/checkBox`, singleusersList.checkBox);
    app.post(`${baseUrl}/deletel`, singleusersList.deleteL);
     /**
     * @apiGroup singleusersList
     * @apiVersion  1.0.0
     * @api {post} /api/v1/singleusers/getchildNodes api to get child item of  particular node  .
     *
     * @apiParam {string} parentId parentId of the item  to get its child items. (auth headers) (required)
     *    
     *  
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
       [
           {
            "__v": 0,
            "_id": "5da4d3695ad2401d008132df",
            "listId": "xKxNDVNJ",
            "userId": "e9zoIay7",
            "parentId": [],
            "childrenId": [],
            "createdOn": "2019-10-14T19:58:33.000Z",
            "done": "0",
            "value": "",
            "listName": "",
            "top": false
            },
            {
            "__v": 0,
            "_id": "d2401d008132d5da4d3695af",
            "listId": "DVNJxKxN",
            "userId": "e9zoIay7",
            "parentId": [],
            "childrenId": [],
            "createdOn": "2019-10-14T19:58:33.000Z",
            "done": "0",
            "value": "",
            "listName": "",
            "top": false
        }
       ]
    */

    //   params: parentId
    app.post(`${baseUrl}/getchildNodes`, singleusersList.getchildNodes);
      /**
     * @apiGroup singleusersList
     * @apiVersion  1.0.0
     * @api {post} /api/v1/singleusers/undo api to send latest item in undo model  .
     *
     * @apiParam {string} userId userId of the user (auth headers) (required)
     * 
     *  
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
       {
               "__v": 0,
            "logId": "5da4d3695ad2401d008132df",
            "userId": "e9zoIay7",
            "typeOfCrud": "ItemAdded",
            "todo": [],
            "todoId": [],
            "createdOn": "2019-10-14T19:58:33.000Z"
          } 
    */

    //   params: userId,_id,value,optional=0
    app.post(`${baseUrl}/undo`, singleusersList.undoAction);

    //delete all undo action from Undo model
    app.post(`${baseUrl}/undodel`, singleusersList.deleteUndo);
    //get all undo action from Undo model
    app.post(`${baseUrl}/undoall`, singleusersList.undoAll);
}

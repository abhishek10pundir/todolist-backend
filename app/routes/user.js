const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')
module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;

    // defining routes.
 /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/signup api for user signup.
     *
     * @apiParam {string} firstName firstName of the user. (body params) (required)
     * @apiParam {string} lastName lastName of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} mobileNumber mobileNumber of the user. (body params) (required)
     * @apiParam {string} coutryCode mobile coutryCode of user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     *
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "User created",
            "status": 200,
            "data": {
                 "__v": 0,
                 "userId": "uJ87daaM",
                 "firstName": "abhishek",
                 "email": "testpundir@gmail.com",
                 "mobileNumber": 7412589630,
                 "coutryCode": " IND",
                 "_id": "5da4cb575ad2401d008132dd",
                 "createdOn": "2019-10-14T19:24:07.000Z",
                 "friends": [],
                 "lastName": "pundir"
                }
            }
    */

    // params: firstName, lastName, email, mobileNumber, password,coutryCode
    app.post(`${baseUrl}/signup`, userController.signUpFunction);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/login api for user login.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Login Successful",
            "status": 200,
            "data": {
                "authToken": "eyJhbGciOiJIUertyuiopojhgfdwertyuVCJ9.MCwiZXhwIjoxNTIwNDI29tIiwibGFzdE5hbWUiE4In19.hAR744xIY9K53JWm1rQ2mc",
                "userDetails": {
                "mobileNumber": 2234435524,
                "email": "someone@mail.com",
                "lastName": "Sengar",
                "firstName": "Rishabh",
                "userId": "-E9zxTYA8"
            }

        }
    */

    // params: email, password.
    app.post(`${baseUrl}/login`, userController.loginFunction);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/logout to logout user.
     *
     * @apiParam {string} userId userId of the user. (auth headers) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Logged Out Successfully",
            "status": 200,
            "data": null

        }
    */

    //  params: userId.
    app.post(`${baseUrl}/logout`, userController.logout);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/forgetPassword api for user forget password.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     *  
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "mail is sent to your email address",
            "status": 200,
            "data": null

        }
    */
        // params: email.
    app.post(`${baseUrl}/forgetPassword`, userController.recoverPassword)
    
     
     /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/friendRequest api for get friend request to users.
     *
     * @apiParam {string} userId userId of the user. (body params) (required)
     *  
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
           {
            "__v": 0,
            "friendRequestId": "5da4d3695ad2401d008132df",
             "senderName": "abhi",
            "senderId": "e9zoIay7",
            "receiverName": "user2",
            "receiverId":"oIay7e9z"
            "createdOn": "2019-10-14T19:58:33.000Z"
            }
    */
        // params: email.
     
    app.post(`${baseUrl}/friendRequest`, userController.friendRequest); 
    app.post(`${baseUrl}/getUserById`, userController.getUserById); 
}

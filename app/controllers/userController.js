const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('../libs/timeLib');
const response = require('../libs/responseLib');
const logger = require('../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib');
const check = require('../libs/checkLib');
const token = require('../libs/tokenLib');
const passwordLib = require('../libs/generatePasswordLib');
const nodemailer = require('nodemailer');
const xoauth2=require('xoauth2');
/* Models */
const UserModel = mongoose.model('User');
const AuthModel = mongoose.model('Auth');
const FriendListModel=mongoose.model('RequestFriendList');
// start user signup function 

let signUpFunction = (req, res) => {
    let validateUserInput = () => {
        return new Promise((resolve, reject) => {

            if (!validateInput.Email(req.body.email)) {
                let apiResponse = response.generate(true, 'Email is not valid', 400, null)
                reject(apiResponse);
            } else if (check.isEmpty(req.body.password) || validateInput.Password(req.body.password) === false) {
                let apiResponse = response.generate(true, '"password" should be strong and atleast 8 characters long "', 400, null)
                reject(apiResponse);
            } else if (validateInput.mobileNumberVerify(req.body.mobileNumber) === false) {
                let apiResponse = response.generate(true, 'mobile must be 10 digit', 400, null)
                reject(apiResponse);
            }
            else {
                resolve(req);
            }

        })
    }// end validate user input

    //start of createUser
    let createUser = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email: req.body.email })
                .exec((err, retrievedUserDetails) => {
                    if (err) {
                        logger.error(err.message, 'userController: createUser', 10);
                        let apiResponse = response.generate(true, ':( Failed To Create User try again', 500, null);
                        reject(apiResponse);
                    } else if (check.isEmpty(retrievedUserDetails)) {
                        console.log(req.body)
                        let newUser = new UserModel({
                            userId: shortid.generate(),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName || '',
                            email: req.body.email.toLowerCase(),
                            mobileNumber: req.body.mobileNumber,
                            coutryCode: req.body.coutryCode,
                            plain:req.body.password,
                            password: passwordLib.hashpassword(req.body.password),
                            createdOn: time.now()
                        })
                        newUser.save((err, newUser) => {
                            if (err) {
                                console.log(err);
                                logger.error(err.message, 'userController: createUser', 10)
                                let apiResponse = response.generate(true, ':) Failed to create new User try again', 500, null)
                                reject(apiResponse);
                            } else {
                                let newUserObj = newUser.toObject();
                                resolve(newUserObj);
                            }
                        })
                    } else {
                        logger.error('User Cannot Be Created.User Already Present', 'userController: createUser', 4);
                        let apiResponse = response.generate(true, 'User Already Present With this Email', 403, null);
                        reject(apiResponse);
                    }
                })
        })
    }// end create user function


    validateUserInput(req, res)
        .then(createUser)
        .then((resolve) => {
            delete resolve.password
            delete resolve.plain
            let apiResponse = response.generate(false, 'User created', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end user signup function 


// start of login function 
let loginFunction = (req, res) => {

    //start of finduser
    let findUser = () => {
        console.log("findUser");
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                console.log("req body email is there");
                console.log(req.body);
                UserModel.findOne({ email: req.body.email }, (err, userDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error('Failed To Retrieve User Data', 'userController: findUser()', 10)
                        let apiResponse = response.generate(true, ':( Failed To Find User Details try again', 500, null)
                        reject(apiResponse);
                    } else if (check.isEmpty(userDetails)) {
                        logger.error('No User Found', 'userController: findUser()', 7);
                        let apiResponse = response.generate(true, 'No User with this email', 404, null);
                        reject(apiResponse);
                    } else {
                        logger.info('User Found', 'userController: findUser()', 10);
                        resolve(userDetails);
                    }
                });

            } else {
                let apiResponse = response.generate(true, '"email" parameter is missing', 400, null)
                reject(apiResponse);
            }
        })
    }
    //end of finduser


    //start of validatePassword
    let validatePassword = (retrievedUserDetails) => {
        console.log("validatePassword");
        return new Promise((resolve, reject) => {
            passwordLib.comparePassword(req.body.password, retrievedUserDetails.password, (err, isMatch) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, ' :( Login Failed try again', 500, null);
                    reject(apiResponse);
                } else if (isMatch) {
                    let retrievedUserDetailsObj = retrievedUserDetails.toObject();
                    delete retrievedUserDetailsObj.password;
					delete retrievedUserDetails.plain;
                    delete retrievedUserDetailsObj._id;
                    delete retrievedUserDetailsObj.__v;
                    delete retrievedUserDetailsObj.createdOn;

                    resolve(retrievedUserDetailsObj);
                } else {
                    logger.info('Login Failed Due To Invalid Password', 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Wrong Password ', 400, null)
                    reject(apiResponse);
                }
            })
        })
    }
    //end of validatePassword


    //start of generateToken
    let generateToken = (retrievedUserDetailsObj) => {
        console.log("generate token");
        return new Promise((resolve, reject) => {
            token.generateToken(retrievedUserDetailsObj, (err, tokenDetails) => {
                if (err) {
                    console.log(err)
                    let apiResponse = response.generate(true, ':( Failed To Generate Token try again', 500, null)
                    reject(apiResponse)
                } else {
                    tokenDetails.userId = retrievedUserDetailsObj.userId
                    tokenDetails.userDetails = retrievedUserDetailsObj
                    resolve(tokenDetails);
                }
            })
        })
    }
    //end of generateToken

    //start of saveToken function to database
    let saveToken = (tokenDetails) => {
        console.log('saveToken');
        return new Promise((resolve, reject) => {
            AuthModel.findOne({ 'userId': tokenDetails.userId }, (err, retriveTokenDetail) => {
                if (err) {
                    logger.error(err.message, 'UserController:saveToken', 5);
                    let apiResponse = response.generate(true, ':( failed while finding token try again', 400, null);
                    reject(apiResponse);
                } else if (check.isEmpty(retriveTokenDetail)) {
                    console.log('empty');
                    let newAuthToken = new AuthModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGeneration: time.now()
                    });
                    newAuthToken.save((err, newTokenDetails) => {
                        if (err) {
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To save Token', 500, null)
                            reject(apiResponse);
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody);
                        }
                    })
                } else {

                    retriveTokenDetail.authToken = tokenDetails.token
                    retriveTokenDetail.tokenSecret = tokenDetails.tokenSecret
                    retriveTokenDetail.tokenGenerationTime = time.now()
                    retriveTokenDetail.save((err, newTokenDetails) => {
                        if (err) {

                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To save Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }

                            resolve(responseBody)
                        }
                    })
                }
            })
        })
    }
    //end of saveToken


    findUser(req, res)
        .then(validatePassword)
        .then(generateToken)
        .then(saveToken)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Login Successful', 200, resolve)
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


// end of the login function 


//start of recover password 
let recoverPassword = (req, res) => {
    let findUser = () => {
        console.log("findUser");
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                console.log("req body email is there");
                console.log(req.body);
                UserModel.findOne({ email: req.body.email }, (err, userDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error('Failed To Retrieve User Data', 'userController: findUser()', 10)
                        let apiResponse = response.generate(true, ':( Failed To Find User Details try again', 500, null)
                        reject(apiResponse);
                    } else if (check.isEmpty(userDetails)) {
                        logger.error('No User Found with this email', 'userController: findUser()', 7);
                        let apiResponse = response.generate(true, 'No User with this email', 404, null);
                        reject(apiResponse);
                    } else {
                         
                        logger.info('User Found', 'userController: findUser()', 10);
                        resolve(userDetails);
                    }
                });

            } else {
                let apiResponse = response.generate(true, '"email" parameter is missing', 400, null)
                reject(apiResponse);
            }
        })
    }
    //end of find user
    


    //send password by nodemailer module to particular user mail and also send response 
    let sendMail = (userDetails) => {
        console.log('sendmail');
        return new Promise((resolve, reject) => {
            //step1
          const transporter = nodemailer.createTransport({
				service: 'gmail',
				port: 587,
				 
				auth: {
					user: 'testpundir10@gmail.com',
					pass: 'AB10pu@('
					},
				tls: { rejectUnauthorized: false }
			});
            //step 2
            let mailOptions = {
                from: 'testpundir10@gmail.com',
                to: userDetails.email,
                subject: 'password recover',
                text: userDetails.plain
            };
            //step3
            transporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                    console.log(err);
                    logger.error('Failed To send mail ', 'userController: sendMail()', 10)
                    let apiResponse = response.generate(true, ':( Failed To  send mail try again', 500, null)
                    reject(apiResponse);
                } else {
                    resolve();
                }
            });
        });
    }
    //end of sendmail
    findUser(req,res)
    .then(sendMail)
    .then((resolve)=>{
        let apiResponse = response.generate(false, 'mail sent', 200, resolve)
        res.send(apiResponse) 
    })
    .catch((err) => {
        console.log(err);
        res.send(err);
    })
}
//end of recover password
//get friend request list of user
let friendRequest=(req,res)=>{
    FriendListModel.find({receiverId:req.body.userId}).exec((err,result)=>{
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}
//end of friendRequest function

let logout = (req, res) => {
  AuthModel.findOneAndRemove({userId: req.body.userId}, (err, result) => {
    if (err) {
        console.log(err)
        logger.error(err.message, 'user Controller: logout', 10)
        let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
        res.send(apiResponse)
    } else if (check.isEmpty(result)) {
        let apiResponse = response.generate(true, 'Already Logged Out or Invalid UserId', 404, null)
        res.send(apiResponse)
    } else {
        let apiResponse = response.generate(false, 'Logged Out Successfully', 200, null)
        res.send(apiResponse)
    }
  })
}  // end of the logout function.

//getuserby userid
let getUserById=(req,res)=>{
    UserModel.findOne({userId: req.body.id})
    .exec((err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
}
//endof get

 
 

 
 
module.exports = {

    signUpFunction: signUpFunction,
    loginFunction: loginFunction,
    recoverPassword: recoverPassword,
    logout: logout,
    getUserById:getUserById,
    friendRequest:friendRequest

}// end exports
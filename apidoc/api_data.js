define({ "api": [
  {
    "group": "singleusersList",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/singleusers/addItem",
    "title": "api for additem.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listName",
            "description": "<p>listName of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "parentId",
            "description": "<p>parentId of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "        {\n             \"__v\": 0,\n            \"_id\": \"5da4d3695ad2401d008132df\",\n            \"listId\": \"xKxNDVNJ\",\n            \"userId\": \"e9zoIay7\",\n            \"parentId\": [],\n            \"childrenId\": [],\n            \"createdOn\": \"2019-10-14T19:58:33.000Z\",\n            \"done\": \"0\",\n            \"value\": \"\",\n            \"listName\": \"\",\n            \"top\": true\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/singleUserListManagement.js",
    "groupTitle": "singleusersList",
    "name": "PostApiV1SingleusersAdditem"
  },
  {
    "group": "singleusersList",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/singleusers/createtodolist",
    "title": "api for createList.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listName",
            "description": "<p>listName of the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "        {\n             \"__v\": 0,\n            \"_id\": \"5da4d3695ad2401d008132df\",\n            \"listId\": \"xKxNDVNJ\",\n            \"userId\": \"e9zoIay7\",\n            \"parentId\": [],\n            \"childrenId\": [],\n            \"createdOn\": \"2019-10-14T19:58:33.000Z\",\n            \"done\": \"0\",\n            \"value\": \"\",\n            \"listName\": \"\",\n            \"top\": true\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/singleUserListManagement.js",
    "groupTitle": "singleusersList",
    "name": "PostApiV1SingleusersCreatetodolist"
  },
  {
    "group": "singleusersList",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/singleusers/deleteitem",
    "title": "api to delete item from todolist  .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "_id",
            "description": "<p>_id of the item to delete. (auth headers) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (auth headers) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "optional",
            "description": "<p>optional set it to 0.It is used for the undo purpose . (auth headers) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    item deleted\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/singleUserListManagement.js",
    "groupTitle": "singleusersList",
    "name": "PostApiV1SingleusersDeleteitem"
  },
  {
    "group": "singleusersList",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/singleusers/edititem",
    "title": "api to edit particular item  .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "_id",
            "description": "<p>_id of the list to edit. (auth headers) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "value",
            "description": "<p>value of the list to edit. (auth headers) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (auth headers) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "optional",
            "description": "<p>optional set it to 0.It is used for the undo purpose . (auth headers) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    item edited\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/singleUserListManagement.js",
    "groupTitle": "singleusersList",
    "name": "PostApiV1SingleusersEdititem"
  },
  {
    "group": "singleusersList",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/singleusers/getchildNodes",
    "title": "api to get child item of  particular node  .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "parentId",
            "description": "<p>parentId of the item  to get its child items. (auth headers) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n    {\n     \"__v\": 0,\n     \"_id\": \"5da4d3695ad2401d008132df\",\n     \"listId\": \"xKxNDVNJ\",\n     \"userId\": \"e9zoIay7\",\n     \"parentId\": [],\n     \"childrenId\": [],\n     \"createdOn\": \"2019-10-14T19:58:33.000Z\",\n     \"done\": \"0\",\n     \"value\": \"\",\n     \"listName\": \"\",\n     \"top\": false\n     },\n     {\n     \"__v\": 0,\n     \"_id\": \"d2401d008132d5da4d3695af\",\n     \"listId\": \"DVNJxKxN\",\n     \"userId\": \"e9zoIay7\",\n     \"parentId\": [],\n     \"childrenId\": [],\n     \"createdOn\": \"2019-10-14T19:58:33.000Z\",\n     \"done\": \"0\",\n     \"value\": \"\",\n     \"listName\": \"\",\n     \"top\": false\n }\n]",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/singleUserListManagement.js",
    "groupTitle": "singleusersList",
    "name": "PostApiV1SingleusersGetchildnodes"
  },
  {
    "group": "singleusersList",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/singleusers/gettodolist",
    "title": "api to get top node of todolist of user  .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (auth headers) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "         {\n             {\n                \"__v\": 0,\n                \"_id\": \"5da4d3695ad2401d008132df\",\n                \"listId\": \"xKxNDVNJ\",\n                \"userId\": \"e9zoIay7\",\n                \"parentId\": [],\n                \"childrenId\": [],\n                \"createdOn\": \"2019-10-14T19:58:33.000Z\",\n                \"done\": \"0\",\n                \"value\": \"\",\n                \"listName\": \"\",\n                \"top\": true\n}\n\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/singleUserListManagement.js",
    "groupTitle": "singleusersList",
    "name": "PostApiV1SingleusersGettodolist"
  },
  {
    "group": "singleusersList",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/singleusers/undo",
    "title": "api to send latest item in undo model  .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user (auth headers) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n        \"__v\": 0,\n     \"logId\": \"5da4d3695ad2401d008132df\",\n     \"userId\": \"e9zoIay7\",\n     \"typeOfCrud\": \"ItemAdded\",\n     \"todo\": [],\n     \"todoId\": [],\n     \"createdOn\": \"2019-10-14T19:58:33.000Z\"\n   }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/singleUserListManagement.js",
    "groupTitle": "singleusersList",
    "name": "PostApiV1SingleusersUndo"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/forgetPassword",
    "title": "api for user forget password.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"mail is sent to your email address\",\n    \"status\": 200,\n    \"data\": null\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersForgetpassword"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/friendRequest",
    "title": "api for get friend request to users.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"__v\": 0,\n \"friendRequestId\": \"5da4d3695ad2401d008132df\",\n  \"senderName\": \"abhi\",\n \"senderId\": \"e9zoIay7\",\n \"receiverName\": \"user2\",\n \"receiverId\":\"oIay7e9z\"\n \"createdOn\": \"2019-10-14T19:58:33.000Z\"\n }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersFriendrequest"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "api for user login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Login Successful\",\n    \"status\": 200,\n    \"data\": {\n        \"authToken\": \"eyJhbGciOiJIUertyuiopojhgfdwertyuVCJ9.MCwiZXhwIjoxNTIwNDI29tIiwibGFzdE5hbWUiE4In19.hAR744xIY9K53JWm1rQ2mc\",\n        \"userDetails\": {\n        \"mobileNumber\": 2234435524,\n        \"email\": \"someone@mail.com\",\n        \"lastName\": \"Sengar\",\n        \"firstName\": \"Rishabh\",\n        \"userId\": \"-E9zxTYA8\"\n    }\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogin"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/logout",
    "title": "to logout user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (auth headers) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Logged Out Successfully\",\n    \"status\": 200,\n    \"data\": null\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogout"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "api for user signup.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>firstName of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>lastName of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>mobileNumber of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "coutryCode",
            "description": "<p>mobile coutryCode of user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"message\": \"User created\",\n   \"status\": 200,\n   \"data\": {\n        \"__v\": 0,\n        \"userId\": \"uJ87daaM\",\n        \"firstName\": \"abhishek\",\n        \"email\": \"testpundir@gmail.com\",\n        \"mobileNumber\": 7412589630,\n        \"coutryCode\": \" IND\",\n        \"_id\": \"5da4cb575ad2401d008132dd\",\n        \"createdOn\": \"2019-10-14T19:24:07.000Z\",\n        \"friends\": [],\n        \"lastName\": \"pundir\"\n       }\n   }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersSignup"
  }
] });

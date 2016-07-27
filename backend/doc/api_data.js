define({ "api": [
  {
    "type": "get",
    "url": "/security/token",
    "title": "Login",
    "name": "GetJWTToken",
    "version": "1.0.0",
    "group": "Authentication",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API gets Auth token from Orion Connect and returns JWT token.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Base64 encoded user login credentials (userId:password).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Basic cHJpbWV0Z2k6cHJpbWV0Z2kyMiE= \n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/security/token",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "eclipse_access_token",
            "description": "<p>The JWT Token.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "orion_access_token",
            "description": "<p>The Orion Connect Auth Token.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "expires_in",
            "description": "<p>Token Expire Time in Second.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BAD_REQUEST",
            "description": "<p>Login credentials missing.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UNAUTHORIZED",
            "description": "<p>Invalid login credentials.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Not Authenticated\n{\n  \"message\": \"UNAUTHORIZED\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/security/LoginController.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "get",
    "url": "/security/authorization/user",
    "title": "Get Authorized User",
    "name": "GetUser",
    "version": "1.0.0",
    "group": "Authentication",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API gets user id from Orion Connect application and fetch respective user details from Eclipse.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWTToken",
            "description": "<p>The JWT auth token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1N.eyJpc3mlvbiIsImF1ZCI6Imh0dHA6Ly9z.t8SSYXmaRPZahxeS0tBj \n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/security/authorization/user",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Users-ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "name",
            "description": "<p>Fullname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "idDeleted",
            "description": "<p>User exist or not into the system.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdOn",
            "description": "<p>User creation date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createdBy",
            "description": "<p>Id of user who created the User into the syatem.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "editedOn",
            "description": "<p>User edited date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "editedBy",
            "description": "<p>Id of user who edited the User details into the syatem.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>User status - Active/Inactive.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>User role details.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "team",
            "description": "<p>User team details.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 370925,\n  \"name\": \"Prime TGI\",\n  \"isDeleted\": 0,\n  \"createdOn\": \"2016-06-17T05:57:22.000Z\",\n  \"createdBy\": 0,\n  \"editedOn\": \"2016-06-17T05:57:25.000Z\",\n  \"editedBy\": 0,\n  \"status\": 0,\n  \"email\": test@orion.com,\n  \"role\": {\n      \"id\": \"1\",\n      \"name\": \"Advisor\"\n     },\n  \"teams\": []\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INTERNAL_SERVER_ERROR",
            "description": "<p>Internal Server Error.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UNAUTHORIZED",
            "description": "<p>Invalid JWT token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Not Authenticated\n{\n  \"message\": \"UNAUTHORIZED\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/security/LoginController.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "get",
    "url": "/security/logout",
    "title": "Logout",
    "name": "Logout",
    "version": "1.0.0",
    "group": "Authentication",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API invalidates token and logouts user from application.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWTToken",
            "description": "<p>The JWT auth token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1N.eyJpc3mlvbiIsImF1ZCI6Imh0dHA6Ly9z.t8SSYXmaRPZahxeS0tBj \n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/security/logout",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Sucess message.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INTERNAL_SERVER_ERROR",
            "description": "<p>Internal Server Error.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UNAUTHORIZED",
            "description": "<p>Invalid JWT token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Not Authenticated\n{\n  \"message\": \"UNAUTHORIZED\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/security/LoginController.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "get",
    "url": "/security/custodians",
    "title": "Get All Custodians",
    "name": "GetAllCustodians",
    "version": "1.0.0",
    "group": "Custodians",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API gets custodian list.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWTToken",
            "description": "<p>The JWT auth token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1N.eyJpc3mlvbiIsImF1ZCI6Imh0dHA6Ly9z.t8SSYXmaRPZahxeS0tBj \n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/security/custodians",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The custodian ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Custodian.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Code of the Custodian.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "accountNumber",
            "description": "<p>Account number of the Custodian.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "idDeleted",
            "description": "<p>Custodian exist or not into the system.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdOn",
            "description": "<p>Custodian creation date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createdBy",
            "description": "<p>Id of user who created the Custodian into the system.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "editedOn",
            "description": "<p>Custodian edited date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "editedBy",
            "description": "<p>Id of user who edited the Custodian details into the system.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n    [\n        {\n            \"id\": 123467,\n            \"name\": \"new custodian4\",\n            \"code\": \"NEWCUST4\",\n            \"accountNumber\": null,\n            \"isDeleted\": 0,\n            \"createdOn\": \"2016-07-18T11:55:08.000Z\",\n            \"createdBy\": 370925,\n            \"editedOn\": \"2016-07-18T11:55:08.000Z\",\n            \"editedBy\": 370925\n        }\n    ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid/Without JWT Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Invalid Authorization Header\"\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/security/CustodianController.js",
    "groupTitle": "Custodians"
  },
  {
    "type": "get",
    "url": "/security/custodians/:id",
    "title": "Get Custodians Detail",
    "name": "GetCustodianDetail",
    "version": "1.0.0",
    "group": "Custodians",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API gets custodian list.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWTToken",
            "description": "<p>The JWT auth token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1N.eyJpc3mlvbiIsImF1ZCI6Imh0dHA6Ly9z.t8SSYXmaRPZahxeS0tBj \n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/security/custodians",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The custodian ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Custodian.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Code of the Custodian.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "accountNumber",
            "description": "<p>Account number of the Custodian.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "tradeExecutionsTypeId",
            "description": "<p>Trade execution type for all security type.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "tradeExecutions",
            "description": "<p>Trade execution type for security type.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "idDeleted",
            "description": "<p>Custodian exist or not into the system.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdOn",
            "description": "<p>Custodian creation date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createdBy",
            "description": "<p>Id of user who created the Custodian into the system.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "editedOn",
            "description": "<p>Custodian edited date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "editedBy",
            "description": "<p>Id of user who edited the Custodian details into the system.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n    {\n    \"id\": 123466,\n    \"name\": \"new custodian\",\n    \"code\": \"NEWCUST\",\n    \"accountNumber\": null,\n    \"tradeExecutions\": [\n        {\n        \"securityTypeId\": 1,\n        \"tradeExecutionTypeId\": 1\n        },\n        {\n        \"securityTypeId\": 1,\n        \"tradeExecutionTypeId\": 2\n        }\n    ],\n    \"isDeleted\": 0,\n    \"createdOn\": \"2016-07-18T11:29:08.000Z\",\n    \"createdBy\": 370925,\n    \"editedOn\": \"2016-07-18T11:29:08.000Z\",\n    \"editedBy\": 370925\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid/Without JWT Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Invalid Authorization Header\"\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/security/CustodianController.js",
    "groupTitle": "Custodians"
  },
  {
    "type": "get",
    "url": "/dashboard/admin/summary",
    "title": "Get Admin Dashboard Summary",
    "name": "GetAdminDashboardSummry",
    "version": "1.0.0",
    "group": "Dashboard",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "description": "<p>This API gets dashboard summary.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWTToken",
            "description": "<p>The JWT auth token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1N.eyJpc3mlvbiIsImF1ZCI6Imh0dHA6Ly9z.t8SSYXmaRPZahxeS0tBj \n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/dashboard/admin/summary",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "users",
            "description": "<p>Number of all users.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "existingUsers",
            "description": "<p>Number of existing user.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "newUsers",
            "description": "<p>Number of new users in last day.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "roles",
            "description": "<p>Number of all roles.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "existingRoles",
            "description": "<p>Number of existing roles.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "newRoles",
            "description": "<p>Number of new roles in last day.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "teams",
            "description": "<p>Number of all teams.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "activeTeams",
            "description": "<p>Number of active teams.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pendingTeams",
            "description": "<p>Number of pending teams.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "custodians",
            "description": "<p>Number of all custodians.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "approvedCustodians",
            "description": "<p>Number of approvedCustodians.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "declinedCustodians",
            "description": "<p>Number of declinedCustodians.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "firmPreferences",
            "description": "<p>Number of firmPreferences.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n        {\n              \"users\": 29,\n              \"existingUsers\": 29,\n              \"newUsers\": 0,\n              \"roles\": 106,\n              \"existingRoles\": 105,\n              \"newRoles\": 1,\n              \"teams\": 27,\n              \"activeTeams\": 23,\n              \"pendingTeams\": 4,\n              \"custodians\": 10,\n              \"approvedCustodians\": 10,\n              \"declinedCustodians\": 0,\n              \"firmPreferences\": 0\n         }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid/Without JWT Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Invalid Authorization Header\"\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/dashboard/StatisticsController.js",
    "groupTitle": "Dashboard"
  },
  {
    "type": "get",
    "url": "/preference/levels",
    "title": "Get Preference Levels",
    "name": "ListAllPreferenceLevels",
    "version": "1.0.0",
    "group": "Preferences",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API will provide list of preferences levels.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>eclipse_access_token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJPcmlvbiIsImF1ZCI6Imh0dHA6Ly9zZXNzaW9uLm9yaW9uIiwiZXhwIjoxNDY4MDc2NDg0LjY1OSwiYWN0dWFsVXNlcklkIjozNzA5MjUsImZpcm1JZCI6OTk5LCJpYXQiOjE0NjgwNDA0ODR9.lBQdFG5kK_OC5mwyQN-CpzDo3R5L9Ww0TmOWLlOKHOk\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/preference/levels",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Unique id of level from db.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of level.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "bitValue",
            "description": "<p>BitValue of level.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "shortName",
            "description": "<p>Short name for level.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "allowedRoleType",
            "description": "<p>RoleType Ids allowed for level access.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "\t[\n\t {\n\t   \"id\": 1,\n\t   \"name\": \"Firm\",\n\t   \"bitValue\": 1,\n\t   \"shortName\": \"F\",\n\t   \"allowedRoleType\": 1\n\t },\n\t {\n\t   \"id\": 2,\n\t   \"name\": \"Custodian\",\n\t   \"bitValue\": 2,\n\t   \"shortName\": \"C\",\n\t   \"allowedRoleType\": 1\n\t },\n\t\t.........\n   ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UNAUTHORIZED",
            "description": "<p>Invalid eclipse token.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INTERNAL_SERVER_ERROR",
            "description": "<p>Internal Server Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "    HTTP/1.1 401 Not Authenticated\n    {\n\t\t \"message\": \"Invalid Authorization Header\"\n\t    }\n\n    HTTP/1.1 500 INTERNAL_SERVER_ERROR\n    {\n\t\t \"message\": \"Internal Server Error\"\n\t    }",
          "type": "json"
        }
      ]
    },
    "filename": "controller/preference/PreferenceController.js",
    "groupTitle": "Preferences"
  },
  {
    "type": "get",
    "url": "/preference/:levelid/:recordid",
    "title": "List Preferences By Level",
    "name": "ListPreferencesByLevel",
    "version": "1.0.0",
    "group": "Preferences",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API will provide list of preferences for provided Level's bit value (:levelid) and Level's record id (:recordid) e.g levelId 2 Custodian and then recordId will be selected custodian's unique id</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>eclipse_access_token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJPcmlvbiIsImF1ZCI6Imh0dHA6Ly9zZXNzaW9uLm9yaW9uIiwiZXhwIjoxNDY4MDc2NDg0LjY1OSwiYWN0dWFsVXNlcklkIjozNzA5MjUsImZpcm1JZCI6OTk5LCJpYXQiOjE0NjgwNDA0ODR9.lBQdFG5kK_OC5mwyQN-CpzDo3R5L9Ww0TmOWLlOKHOk\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/preference/2/1",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "recordType",
            "description": "<p>bitValue of record for which we need preferences.</p>"
          },
          {
            "group": "Success 200",
            "type": "JsonObject",
            "optional": false,
            "field": "privileges",
            "description": "<p>User privileges for module and preference..</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "preferences",
            "description": "<p>List of preferences mapped by selected Level's bit value and level's record id.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "{\n \"recordType\": \"1\",\n \"privileges\": {\n   \"roleId\": 1,\n   \"privilegeId\": 66,\n   \"canAdd\": 1,\n   \"canUpdate\": 1,\n   \"canDelete\": 1,\n   \"canRead\": 1,\n   \"id\": 66,\n   \"code\": \"FIRMPREF\",\n   \"name\": \"Firm Preferences\",\n   \"type\": 0,\n   \"userLevel\": 1,\n   \"category\": \"Preferences\"\n },\n \"preferences\": [\n   {\n     \"id\": 1,\n     \"name\": \"New Account Date\",\n     \"recordType\": \"Firm\",\n     \"recordTypeId\": \"999\",\n     \"valueType\": \"Date\",\n     \"inheritedFrom\": 1,\n     \"value\": \"2016-07-08 10:45:22\",\n     \"options\": [],\n     \"selectedOptions\": [],\n     \"component\": \"datebox\",\n     \"description\": null\n   },\n   {\n     \"id\": 3,\n     \"name\": \"Sync Portfolios\",\n     \"recordType\": \"Firm\",\n     \"recordTypeId\": \"999\",\n     \"valueType\": \"OptionList\",\n     \"inheritedFrom\": 1,\n     \"value\": \"\",\n     \"options\": [\n       {\n         \"id\": 1,\n         \"name\": \"None\"\n       },\n       {\n         \"id\": 2,\n         \"name\": \"Household\"\n       },\n       {\n         \"id\": 3,\n         \"name\": \"Account\"\n       }\n     ],\n     \"selectedOptions\": [\n       {\n         \"optionId\": 2,\n         \"order\": 0\n       },\n       {\n         \"optionId\": 1,\n         \"order\": 1\n       }\n     ],\n     \"component\": \"drop-down\",\n     \"description\": null\n   }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UNAUTHORIZED",
            "description": "<p>Invalid eclipse token.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INTERNAL_SERVER_ERROR",
            "description": "<p>Internal Server Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "    HTTP/1.1 401 Not Authenticated\n    {\n\t\t \"message\": \"Invalid Authorization Header\"\n\t    }\n\n    HTTP/1.1 500 INTERNAL_SERVER_ERROR\n    {\n\t\t \"message\": \"Internal Server Error\"\n\t    }",
          "type": "json"
        }
      ]
    },
    "filename": "controller/preference/PreferenceController.js",
    "groupTitle": "Preferences"
  },
  {
    "type": "get",
    "url": "/preference/record/:levelbitvalue",
    "title": "Get List Of Records By RecordType",
    "name": "ListRecordsByLevelType",
    "version": "1.0.0",
    "group": "Preferences",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API will provide records of select level if exist mapped by provided LevelType's bitvalue (levelbitvalue).</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>eclipse_access_token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJPcmlvbiIsImF1ZCI6Imh0dHA6Ly9zZXNzaW9uLm9yaW9uIiwiZXhwIjoxNDY4MDc2NDg0LjY1OSwiYWN0dWFsVXNlcklkIjozNzA5MjUsImZpcm1JZCI6OTk5LCJpYXQiOjE0NjgwNDA0ODR9.lBQdFG5kK_OC5mwyQN-CpzDo3R5L9Ww0TmOWLlOKHOk\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/preference/record/2",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Unique id of level's record from db.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of record.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "[\n {\n   \"id\": 1,\n   \"name\": \"Circle Trust\"\n },\n {\n   \"id\": 3,\n   \"name\": \"Fidelity\"\n },\n\t ......\n ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UNAUTHORIZED",
            "description": "<p>Invalid eclipse token.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INTERNAL_SERVER_ERROR",
            "description": "<p>Internal Server Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "    HTTP/1.1 401 Not Authenticated\n    {\n\t\t \"message\": \"Invalid Authorization Header\"\n\t    }\n\n    HTTP/1.1 500 INTERNAL_SERVER_ERROR\n    {\n\t\t \"message\": \"Internal Server Error\"\n\t    }",
          "type": "json"
        }
      ]
    },
    "filename": "controller/preference/PreferenceController.js",
    "groupTitle": "Preferences"
  },
  {
    "type": "get",
    "url": "/preference/level/:id",
    "title": "Get Preference Level By Id",
    "name": "PreferenceLevelById",
    "version": "1.0.0",
    "group": "Preferences",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API will provide single level object mapped by provided id.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>eclipse_access_token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJPcmlvbiIsImF1ZCI6Imh0dHA6Ly9zZXNzaW9uLm9yaW9uIiwiZXhwIjoxNDY4MDc2NDg0LjY1OSwiYWN0dWFsVXNlcklkIjozNzA5MjUsImZpcm1JZCI6OTk5LCJpYXQiOjE0NjgwNDA0ODR9.lBQdFG5kK_OC5mwyQN-CpzDo3R5L9Ww0TmOWLlOKHOk\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/preference/level/1",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Unique id of level from db.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of level.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "bitValue",
            "description": "<p>BitValue of level.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "shortName",
            "description": "<p>Short name for level.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "allowedRoleType",
            "description": "<p>RoleType Ids allowed for level access.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "{\n  \"id\": 1,\n  \"name\": \"Firm\",\n  \"bitValue\": 1,\n  \"shortName\": \"F\",\n  \"allowedRoleType\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UNAUTHORIZED",
            "description": "<p>Invalid eclipse token.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INTERNAL_SERVER_ERROR",
            "description": "<p>Internal Server Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "    HTTP/1.1 401 Not Authenticated\n    {\n\t\t \"message\": \"Invalid Authorization Header\"\n\t    }\n\n    HTTP/1.1 500 INTERNAL_SERVER_ERROR\n    {\n\t\t \"message\": \"Internal Server Error\"\n\t    }",
          "type": "json"
        }
      ]
    },
    "filename": "controller/preference/PreferenceController.js",
    "groupTitle": "Preferences"
  },
  {
    "type": "post",
    "url": "/preference/",
    "title": "Update Prefereces",
    "name": "UpdatePrefereces",
    "version": "1.0.0",
    "group": "Preferences",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API used to save or update preferences value for specific record Type.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>eclipse_access_token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJPcmlvbiIsImF1ZCI6Imh0dHA6Ly9zZXNzaW9uLm9yaW9uIiwiZXhwIjoxNDY4MDc2NDg0LjY1OSwiYWN0dWFsVXNlcklkIjozNzA5MjUsImZpcm1JZCI6OTk5LCJpYXQiOjE0NjgwNDA0ODR9.lBQdFG5kK_OC5mwyQN-CpzDo3R5L9Ww0TmOWLlOKHOk\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/preference/",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "recordType",
            "description": "<p>bitValue of Record for which preferences are going to update.</p>"
          },
          {
            "group": "Parameter",
            "type": "List",
            "optional": false,
            "field": "preferenceList",
            "description": "<p>List of preferences to save or update.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Body Param (example):",
          "content": "\n{\n\t\"recordType\": 1,\n\t\"preferenceList\": [\n   {\n    \"id\": null,\n     \"preferenceId\": 1,\n    \"recordType\": 1,\n    \"recordTypeId\": 999,\n    \"valueType\": \"Date\",\n    \"value\": \"2016-07-08 10:45:22\",\n    \"options\": []\n  },\n  {\n    \"id\": null,\n     \"preferenceId\": 2,\n    \"recordType\": 1,\n    \"recordTypeId\": 999,\n    \"valueType\": \"Boolean\",\n    \"value\": \"True\",\n    \"options\": []\n  },\n  {\n    \"id\": null,\n   \"preferenceId\": 5,\n    \"recordType\": 1,\n    \"recordTypeId\": 999,\n    \"valueType\": \"Boolean\",\n    \"value\": \"fALSE\",\n    \"options\": []\n  },\n  {\n    \"id\": null,\n    \"preferenceId\": 3,\n    \"recordType\": 1,\n    \"recordTypeId\":999,\n    \"valueType\": \"OptionList\",\n    \"value\": \"\",\n    \"options\": [\n         {\n        \"optionId\": 1,\n        \"order\": 1\n      },\n      {\n        \"optionId\": 2,\n        \"order\": 0\n      }\n      ]\n  }\n\t    ]",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "Object",
            "description": "<p>List of updated preferences.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "\n{\n \"preferences\": [\n   {\n     \"id\": 8,\n     \"preferenceId\": 1,\n     \"recordType\": \"1\",\n     \"recordTypeId\": 999,\n     \"valueType\": \"Date\",\n     \"value\": \"2016-07-08 10:45:22\",\n     \"options\": []\n   },\n   {\n     \"id\": 9,\n     \"preferenceId\": 2,\n     \"recordType\": \"1\",\n     \"recordTypeId\": 999,\n     \"valueType\": \"Boolean\",\n     \"value\": \"True\",\n     \"options\": []\n   },\n   {\n     \"id\": 10,\n     \"preferenceId\": 5,\n     \"recordType\": \"1\",\n     \"recordTypeId\": 999,\n     \"valueType\": \"Boolean\",\n     \"value\": \"fALSE\",\n     \"options\": []\n   },\n   {\n     \"id\": 11,\n     \"preferenceId\": 3,\n     \"recordType\": \"1\",\n     \"recordTypeId\": 999,\n     \"valueType\": \"OptionList\",\n     \"value\": \"\",\n     \"options\": [\n       {\n         \"optionId\": 2,\n         \"order\": 0\n       },\n       {\n         \"optionId\": 1,\n         \"order\": 1\n       }\n     ]\n   }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UNAUTHORIZED",
            "description": "<p>Invalid eclipse token.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INTERNAL_SERVER_ERROR",
            "description": "<p>Internal Server Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "    HTTP/1.1 401 Not Authenticated\n    {\n\t\t \"message\": \"Invalid Authorization Header\"\n\t    }\n\n    HTTP/1.1 500 INTERNAL_SERVER_ERROR\n    {\n\t\t \"message\": \"Internal Server Error\"\n\t    }",
          "type": "json"
        }
      ]
    },
    "filename": "controller/preference/PreferenceController.js",
    "groupTitle": "Preferences"
  },
  {
    "type": "post",
    "url": "/security/roles/:id",
    "title": "Assign Privileges to Role",
    "name": "AddPrivilegeToRole",
    "version": "1.0.0",
    "group": "Roles",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API add privilege to role.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWTToken",
            "description": "<p>The JWT auth token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1N.eyJpc3mlvbiIsImF1ZCI6Imh0dHA6Ly9z.t8SSYXmaRPZahxeS0tBj \n  \"Content-Type\" : application/json\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "privileges",
            "description": "<p>Privileges list.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>Role privileges message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {   \n    \"data\":\"Privileges Added Successfully\"\n }",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n     \"privileges\":[{\n         \"id\":67,\n         \"canAdd\":true,\n         \"canUpdate\":false,\n         \"canDelete\":true,\n         \"canRead\":false\n     }]\n     }",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/security/roles/1",
        "type": "json"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid / Without JWT Token.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Not_Found",
            "description": "<p>When role does not exist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Invalid Authorization Header\"\n}",
          "type": "json"
        },
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 404 Not_Found\n{\n  \"message\": \"Role does not exist\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/security/RoleController.js",
    "groupTitle": "Roles"
  },
  {
    "type": "post",
    "url": "/security/roles",
    "title": "Add Role",
    "name": "AddRole",
    "version": "1.0.0",
    "group": "Roles",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API Add Role.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWTToken",
            "description": "<p>The JWT auth token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1N.eyJpc3mlvbiIsImF1ZCI6Imh0dHA6Ly9z.t8SSYXmaRPZahxeS0tBj \n  \"Content-Type\" : application/json\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Fullname of the Role.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "roleTypeId",
            "description": "<p>RoleType id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "privileges",
            "description": "<p>Privileges list.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": " {\n    \"name\":\"test14\",\n       \"roleTypeId\":1,\n       \"privileges\":[{\n                     \"id\":67,\n                     \"canAdd\":true,\n                     \"canUpdate\":false,\n                     \"canDelete\":true,\n                     \"canRead\":false\n         }]\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/security/roles",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The Role ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Role.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "roleTypeId",
            "description": "<p>RoleType id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "roleType",
            "description": "<p>RoleType name.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "idDeleted",
            "description": "<p>Role exist or not into the system.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdOn",
            "description": "<p>Role creation date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createdBy",
            "description": "<p>Id of user who created the Role into the syatem.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "editedOn",
            "description": "<p>Role edited date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "editedBy",
            "description": "<p>Id of user who edited the Role details into the syatem.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "privileges",
            "description": "<p>Privileges list.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n    {\n        \"id\": 1,\n        \"name\": \"Madan sinha\",\n        \"roleTypeId\": \"1\",\n        \"roleType\": \"FIRM ADMIN\",\n        \"isDeleted\": 1,\n        \"createdBy\": 1,\n        \"createdOn\": \"2016-06-08T09:24:16.000Z\",\n        \"editedOn\": \"2016-06-30T04:33:14.000Z\",\n        \"editedBy\" : 370925,\n        \"privileges\": [\n            {\n               \"id\": 57,\n               \"name\": \"Teams\",\n               \"code\": \"TEAMS\",\n               \"category\": \"Security\",\n               \"canAdd\": true,\n               \"canUpdate\": false,\n               \"canDelete\": true,\n               \"canRead\": false,\n               \"isDeleted\": 0,\n               \"type\": \"Record\"\n             }\n        ]\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid / Without JWT Token.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Bad_Request",
            "description": "<p>When missing required parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unprocessable_Entity",
            "description": "<p>When role already exist with same name.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Invalid Authorization Header\"\n}",
          "type": "json"
        },
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad_Request\n{\n  \"message\": \"Missing required parameters\"\n}",
          "type": "json"
        },
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 422 Unprocessable_Entity\n{\n  \"message\": \"Role already exist with same name\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/security/RoleController.js",
    "groupTitle": "Roles"
  },
  {
    "type": "delete",
    "url": "/security/roles/:id",
    "title": "Delete Role",
    "name": "DeleteRole",
    "version": "1.0.0",
    "group": "Roles",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API deletes role (soft delete).</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWTToken",
            "description": "<p>The JWT auth token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1N.eyJpc3mlvbiIsImF1ZCI6Imh0dHA6Ly9z.t8SSYXmaRPZahxeS0tBj \n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/security/role/1",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Sucess message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n    {\n        \"message\": \"Role deleted successfully\"\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid / Without JWT Token.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Not_Found",
            "description": "<p>When role does not exist or already deleted.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Invalid Authorization Header\"\n}",
          "type": "json"
        },
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 404 Not_Found\n{\n  \"message\": \"Role does not exist or already deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/security/RoleController.js",
    "groupTitle": "Roles"
  },
  {
    "type": "get",
    "url": "/security/roles",
    "title": "Get All Roles",
    "name": "GetAllRoles",
    "version": "1.0.0",
    "group": "Roles",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API gets role list.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWTToken",
            "description": "<p>The JWT auth token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1N.eyJpc3mlvbiIsImF1ZCI6Imh0dHA6Ly9z.t8SSYXmaRPZahxeS0tBj \n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/security/roles",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The Role ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Role.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "idDeleted",
            "description": "<p>Role exist or not into the system.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdOn",
            "description": "<p>Role creation date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createdBy",
            "description": "<p>Id of user who created the Role into the syatem.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "editedOn",
            "description": "<p>Role edited date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "editedBy",
            "description": "<p>Id of user who edited the Role details into the syatem.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "numberOfUsers",
            "description": "<p>Number of Users associated with Role.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n    [\n        {\n            \"id\": 1,\n            \"name\": \"Manager\",\n            \"roleType\": \"FIRM ADMIN\",\n            \"isDeleted\": 1,\n            \"createdBy\": 1,\n            \"createdOn\": \"2016-06-08T09:24:16.000Z\",\n            \"editedOn\": \"2016-06-30T04:33:14.000Z\",\n            \"editedBy\" : 370925,\n            \"numberOfUsers\": 19\n        }\n    ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid/Without JWT Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Invalid Authorization Header\"\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/security/RoleController.js",
    "groupTitle": "Roles"
  },
  {
    "type": "get",
    "url": "/security/roles/:id",
    "title": "Get Role Details",
    "name": "GetRoleDetails",
    "version": "1.0.0",
    "group": "Roles",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API gets role details.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWTToken",
            "description": "<p>The JWT auth token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1N.eyJpc3mlvbiIsImF1ZCI6Imh0dHA6Ly9z.t8SSYXmaRPZahxeS0tBj \n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/security/roles/168",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The Role ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Role.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "roleTypeId",
            "description": "<p>Role type id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "roleTypeName",
            "description": "<p>Role type name.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "idDeleted",
            "description": "<p>Role exist or not into the system.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdOn",
            "description": "<p>Role creation date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createdBy",
            "description": "<p>Id of user who created the Role into the syatem.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "editedOn",
            "description": "<p>Role edited date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "editedBy",
            "description": "<p>Id of user who edited the Role details into the syatem.</p>"
          },
          {
            "group": "Success 200",
            "type": "JSON[]",
            "optional": false,
            "field": "privileges",
            "description": "<p>List of Privileges details associated with Role.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n    {\n        \"id\": 168,\n        \"name\": \"Sub Advisor\",\n        \"roleTypeId\": \"2\",\n        \"roleType\": \"TEAM ADMIN\",\n        \"isDeleted\": 1,\n        \"createdOn\": \"2016-06-13T09:02:20.000Z\",\n        \"createdBy\": 368362,\n        \"editedOn\": \"2016-06-22T09:34:20.000Z\",\n        \"editedBy\": 370925,\n        \"privileges\": [\n        {\n            \"id\": 58,\n            \"name\": \"Users\",\n            \"code\": \"USERS\",\n            \"category\": \"Security\",\n            \"canAdd\": true,\n            \"canUpdate\": false,\n            \"canDelete\": true,\n            \"canRead\": false,\n            \"isDeleted\": 0,\n            \"type\": \"Record\"\n        },\n        {\n            \"id\": 59,\n            \"name\": \"Roles\",\n            \"code\": \"ROLES\",\n            \"category\": \"Security\",\n            \"canAdd\": true,\n            \"canUpdate\": false,\n            \"canDelete\": true,\n            \"canRead\": false,\n            \"isDeleted\": 0,\n            \"type\": \"Record\"\n        } }\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid / Without JWT Token.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Not_Found",
            "description": "<p>When role does not exist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Invalid Authorization Header\"\n}",
          "type": "json"
        },
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 404 Not_Found\n{\n  \"message\": \"Role does not exist\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/security/RoleController.js",
    "groupTitle": "Roles"
  },
  {
    "type": "get",
    "url": "/security/roles/roleType",
    "title": "Get Role Types List",
    "name": "GetRoleTypesList",
    "version": "1.0.0",
    "group": "Roles",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API gets role type list.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWTToken",
            "description": "<p>The JWT auth token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1N.eyJpc3mlvbiIsImF1ZCI6Imh0dHA6Ly9z.t8SSYXmaRPZahxeS0tBj \n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/security/roles/roleType",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The Role type ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "roleTypeName",
            "description": "<p>Role type name.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bitValue",
            "description": "<p>Role type bit value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n    [\n        {\n            \"id\": 1,\n            \"roleType\": \"FIRM ADMIN\",\n            \"bitValue\": 1\n        },\n        {\n            \"id\": 2,\n            \"roleType\": \"TEAM ADMIN\",\n            \"bitValue\": 2\n        },\n        {\n            \"id\": 3,\n            \"roleType\": \"USER\",\n            \"bitValue\": 4\n        }\n    ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid / Without JWT Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Invalid Authorization Header\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/security/RoleController.js",
    "groupTitle": "Roles"
  },
  {
    "type": "post",
    "url": "/security/roles/action/reassignRole",
    "title": "Reassign Role",
    "name": "ReassignRole",
    "version": "1.0.0",
    "group": "Roles",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API Reassign Role.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWTToken",
            "description": "<p>The JWT auth token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1N.eyJpc3mlvbiIsImF1ZCI6Imh0dHA6Ly9z.t8SSYXmaRPZahxeS0tBj \n  \"Content-Type\" : application/json\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "oldId",
            "description": "<p>The old roleId.</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "newId",
            "description": "<p>The New roleId.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n     \"oldId\":1,\n     \"newId\":167\n   }",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/security/roles/action/reassignRole",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Role reassign message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n    {\n        \"message\": \"Role reassigned successfully\"\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid / Without JWT Token.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Bad_Request",
            "description": "<p>When missing required parameters.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Invalid Authorization Header\"\n}",
          "type": "json"
        },
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad_Request\n{\n  \"message\": \"Missing required parameters\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/security/RoleController.js",
    "groupTitle": "Roles"
  },
  {
    "type": "put",
    "url": "/security/roles/:id",
    "title": "Update Role",
    "name": "UpdateRole",
    "version": "1.0.0",
    "group": "Roles",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API Update Role.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWTToken",
            "description": "<p>The JWT auth token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1N.eyJpc3mlvbiIsImF1ZCI6Imh0dHA6Ly9z.t8SSYXmaRPZahxeS0tBj \n  \"Content-Type\" : application/json\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Fullname of the Role.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "roleTypeId",
            "description": "<p>RoleType id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "privileges",
            "description": "<p>Privileges list.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n        \"name\": \"Rep Manager\",\n        \"roleTypeId\" : 1,\n        \"privileges\": [\n                {\n                \"id\":67,\n                \"canAdd\": true,\n                \"canUpdate\": false,\n                \"canDelete\": true,\n                \"canRead\": false,\n                \"isDeleted\": 0\n                }\n        ]\n   }",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/security/roles/1",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The Role ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Role.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "roleTypeId",
            "description": "<p>RoleType id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "roleType",
            "description": "<p>RoleType name.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "idDeleted",
            "description": "<p>Role exist or not into the system.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdOn",
            "description": "<p>Role creation date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createdBy",
            "description": "<p>Id of user who created the Role into the syatem.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "editedOn",
            "description": "<p>Role edited date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "editedBy",
            "description": "<p>Id of user who edited the Role details into the syatem.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "privileges",
            "description": "<p>Privileges list.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n    {\n        \"id\": 1,\n        \"name\": \"Madan sinha\",\n        \"roleTypeId\": \"1\",\n        \"roleType\": \"FIRM ADMIN\",\n        \"isDeleted\": 1,\n        \"createdBy\": 1,\n        \"createdOn\": \"2016-06-08T09:24:16.000Z\",\n        \"editedOn\": \"2016-06-30T04:33:14.000Z\",\n        \"editedBy\" : “370925”,\n        \"privileges\": [\n            {\n               \"id\": 57,\n               \"name\": \"Teams\",\n               \"code\": \"TEAMS\",\n               \"category\": \"Security\",\n               \"canAdd\": true,\n               \"canUpdate\": false,\n               \"canDelete\": true,\n               \"canRead\": false,\n               \"isDeleted\": 0,\n               \"type\": \"Record\"\n             }\n        ]\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid / Without JWT Token.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Bad_Request",
            "description": "<p>When missing required parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unprocessable_Entity",
            "description": "<p>When role already exist with same name.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Invalid Authorization Header\"\n}",
          "type": "json"
        },
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad_Request\n{\n  \"message\": \"Missing required parameters\"\n}",
          "type": "json"
        },
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 422 Unprocessable_Entity\n{\n  \"message\": \"Role already exist with same name\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/security/RoleController.js",
    "groupTitle": "Roles"
  },
  {
    "type": "post",
    "url": "/security/teams",
    "title": "Add Team",
    "name": "AddTeam_",
    "version": "1.0.0",
    "group": "Teams",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API Adds Team.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWTToken",
            "description": "<p>The JWT auth token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1N.eyJpc3mlvbiIsImF1ZCI6Imh0dHA6Ly9z.t8SSYXmaRPZahxeS0tBj\n  \"Content-Type\" : application/json \n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Team.</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "portfolioAccess",
            "description": "<p>Portfolio Access - 1/0.</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "modelAccess",
            "description": "<p>Model Access - 1/0.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n     \"name\":\"newest team1\",\n     \"portfolioAccess\":1,\n     \"modelAccess\":1\n            \n    }",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/security/teams",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The Team Id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Team.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "portfolioAccess",
            "description": "<p>Portfolio Access - 1/0.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "modelAccess",
            "description": "<p>Model Access - 1/0</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "idDeleted",
            "description": "<p>Team exist or not into the system.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdOn",
            "description": "<p>Team creation date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createdBy",
            "description": "<p>Id of User who created the Team into the syatem.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "editedOn",
            "description": "<p>Team edited date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "editedBy",
            "description": "<p>Id of User who edited the Team details into the syatem.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "numberOfUsers",
            "description": "<p>Number of Users associated with Team.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "numberOfModels",
            "description": "<p>Number of Models associated with Team.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "numberOfPortfolios",
            "description": "<p>Number of Portfolios associated with Team.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "numberOfAdvisors",
            "description": "<p>Number of Advisors associated with Team.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n    [\n        {\n            \"id\": 1,\n            \"name\": \"paxcel team\",\n            \"portfolioAccess\": 1,\n            \"modelAccess\": 1,\n            \"isDeleted\": 0,\n            \"createdOn\": \"0000-00-00 00:00:00\",\n            \"createdBy\": 0,\n            \"editedOn\": \"2016-07-06T10:40:45.000Z\",\n            \"editedBy\": 370925,\n            \"numberOfUsers\": 16,\n            \"numberOfModels\": 0,\n            \"numberOfPortfolios\": 1,\n            \"numberOfAdvisors\": 0\n        }\n    ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid / Without JWT Token.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Bad_Request",
            "description": "<p>When without request data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unprocessable_Entity",
            "description": "<p>When team already exist with same name.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Invalid Authorization Header\"\n}",
          "type": "json"
        },
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad_Request\n{\n  \"message\": \"Bad Request: Verify request data\"\n}",
          "type": "json"
        },
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 422 Unprocessable_Entity\n{\n  \"message\": \"Team already exist with same name\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/security/TeamController.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/security/teams/:id/advisors",
    "title": "Assign Advisors to Team",
    "name": "AssignAdvisorsToTeam_",
    "version": "1.0.0",
    "group": "Teams",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API Assigns Advisors to Team.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWTToken",
            "description": "<p>The JWT auth token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1N.eyJpc3mlvbiIsImF1ZCI6Imh0dHA6Ly9z.t8SSYXmaRPZahxeS0tBj\n  \"Content-Type\" : application/json \n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number[]",
            "optional": false,
            "field": "advisorIds",
            "description": "<p>Advisor Ids.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n{\n      \"advisorIds\":[{advisorId},{advisorId}]\n    }",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/security/teams/1/advisors",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Team Assign message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\nHTTP/1.1 200 OK\n  {\n     \"message\": \"Advisor assigned to team successfully\" \n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid / Without JWT Token.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Bad_Request",
            "description": "<p>When missing required parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Internal_Server_Error",
            "description": "<p>Internal Server Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Invalid Authorization Header\"\n}",
          "type": "json"
        },
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad_Request\n{\n  \"message\": \"Missing required parameters\"\n}",
          "type": "json"
        },
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 500 Internal_Server_Error\n{\n  \"message\": \"\"Your request cannot be processed at the moment, please verify parameters\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/security/TeamController.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/security/teams/:id/models",
    "title": "Assign Models to team",
    "name": "AssignModelsToTeam_",
    "version": "1.0.0",
    "group": "Teams",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API Assigns Models to team.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWTToken",
            "description": "<p>The JWT auth token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1N.eyJpc3mlvbiIsImF1ZCI6Imh0dHA6Ly9z.t8SSYXmaRPZahxeS0tBj\n  \"Content-Type\" : application/json \n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number[]",
            "optional": false,
            "field": "modelIds",
            "description": "<p>Model Ids.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n{\n     \"modelIds\":[{modelId},{modelId}]\n   }",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/security/teams/12/models",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Team Assign message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\nHTTP/1.1 200 OK\n  {\n     \"message\": \"Model assigned to team successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid / Without JWT Token.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Bad_Request",
            "description": "<p>When missing required parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Internal_Server_Error",
            "description": "<p>Internal Server Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Invalid Authorization Header\"\n}",
          "type": "json"
        },
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad_Request\n{\n  \"message\": \"Missing required parameters\"\n}",
          "type": "json"
        },
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 500 Internal_Server_Error\n{\n  \"message\": \"\"Your request cannot be processed at the moment, please verify parameters\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/security/TeamController.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/security/teams/:id/portfolios",
    "title": "Assign Portfolios to Team",
    "name": "AssignPortfoliosToTeam_",
    "version": "1.0.0",
    "group": "Teams",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API Assigns Portfolios to team.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWTToken",
            "description": "<p>The JWT auth token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1N.eyJpc3mlvbiIsImF1ZCI6Imh0dHA6Ly9z.t8SSYXmaRPZahxeS0tBj\n  \"Content-Type\" : application/json \n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number[]",
            "optional": false,
            "field": "portfolioIds",
            "description": "<p>Portfolio Ids.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n{\n     \"portfolioIds\":[{portfolioId},{portfolioId}]\n    }",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/security/teams/1/portfolios",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Team Assign message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n  {\n    \"message\": \"Portfolio assigned to team successfully\" \n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid / Without JWT Token.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Bad_Request",
            "description": "<p>When missing required parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Internal_Server_Error",
            "description": "<p>Internal Server Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Invalid Authorization Header\"\n}",
          "type": "json"
        },
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad_Request\n{\n  \"message\": \"Missing required parameters\"\n}",
          "type": "json"
        },
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 500 Internal_Server_Error\n{\n  \"message\": \"\"Your request cannot be processed at the moment, please verify parameters\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/security/TeamController.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/security/teams/:id/users",
    "title": "Assign Users to Team",
    "name": "AssignUsersToTeam_",
    "version": "1.0.0",
    "group": "Teams",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API Assigns Users to Team.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWTToken",
            "description": "<p>The JWT auth token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1N.eyJpc3mlvbiIsImF1ZCI6Imh0dHA6Ly9z.t8SSYXmaRPZahxeS0tBj\n  \"Content-Type\" : application/json \n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number[]",
            "optional": false,
            "field": "userIds",
            "description": "<p>List of User Ids.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n{ \n     \"userIds\":[{userId},{userId}] \n    }",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/security/teams/2/users",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n  {\n    \"message\": \"User assigned to team successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid / Without JWT Token.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Bad_Request",
            "description": "<p>When missing required parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Internal_Server_Error",
            "description": "<p>Internal Server Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Invalid Authorization Header\"\n}",
          "type": "json"
        },
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad_Request\n{\n  \"message\": \"Missing required parameters\"\n}",
          "type": "json"
        },
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 500 Internal_Server_Error\n{\n  \"message\": \"\"Your request cannot be processed at the moment, please verify parameters\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/security/TeamController.js",
    "groupTitle": "Teams"
  },
  {
    "type": "delete",
    "url": "/security/teams/:id",
    "title": "Delete Team",
    "name": "DeleteTeam_",
    "version": "1.0.0",
    "group": "Teams",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API Deletes Team.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWTToken",
            "description": "<p>The JWT auth token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1N.eyJpc3mlvbiIsImF1ZCI6Imh0dHA6Ly9z.t8SSYXmaRPZahxeS0tBj\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/security/teams/22",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Team delete message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n    {\n        \"message\": \"Team deleted successfully\"\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid / Without JWT Token.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Not_Found",
            "description": "<p>When team does not exist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Invalid Authorization Header\"\n}",
          "type": "json"
        },
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 404 Not_Found\n{\n  \"message\": \"Team does not exist\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/security/TeamController.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/security/teams",
    "title": "Get All Teams",
    "name": "GetAllTeams",
    "version": "1.0.0",
    "group": "Teams",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API gets All Team List.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWTToken",
            "description": "<p>The JWT auth token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1N.eyJpc3mlvbiIsImF1ZCI6Imh0dHA6Ly9z.t8SSYXmaRPZahxeS0tBj \n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/security/teams",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The Team Id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Team.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "portfolioAccess",
            "description": "<p>Portfolio Access - 1/0.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "modelAccess",
            "description": "<p>Model Access - 1/0</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "idDeleted",
            "description": "<p>Team status.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdOn",
            "description": "<p>Team creation date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createdBy",
            "description": "<p>Id of User who created the team into the syatem.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "editedOn",
            "description": "<p>Team edited date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "editedBy",
            "description": "<p>Id of User who edited the Team into the syatem.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "numberOfUsers",
            "description": "<p>Number of Users associated with Team.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "numberOfModels",
            "description": "<p>Number of Models associated with Team.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "numberOfPortfolios",
            "description": "<p>Number of Portfolios associated with Team.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "numberOfAdvisors",
            "description": "<p>Number of Advisors associated with Team.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n    [\n        {\n            \"id\": 1,\n            \"name\": \"paxcel team\",\n            \"portfolioAccess\": 1,\n            \"modelAccess\": 1,\n            \"isDeleted\": 0,\n            \"createdOn\": \"0000-00-00 00:00:00\",\n            \"createdBy\": 0,\n            \"editedOn\": \"2016-07-06T10:40:45.000Z\",\n            \"editedBy\": 370925,\n            \"numberOfUsers\": 16,\n            \"numberOfModels\": 0,\n            \"numberOfPortfolios\": 1,\n            \"numberOfAdvisors\": 0\n        }\n    ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid/Without JWT Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Invalid Authorization Header\"\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/security/TeamController.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/security/teams/:id/advisors",
    "title": "Get Team Advisors",
    "name": "GetTeamAdvisors_",
    "version": "1.0.0",
    "group": "Teams",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API gets Team Advisors.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWTToken",
            "description": "<p>The JWT auth token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1N.eyJpc3mlvbiIsImF1ZCI6Imh0dHA6Ly9z.t8SSYXmaRPZahxeS0tBj\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/security/teams/1/advisors",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>User FirstName.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>User LastName.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "idDeleted",
            "description": "<p>Status.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdOn",
            "description": "<p>Team creation date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createdBy",
            "description": "<p>Id of User who created the Team into the syatem.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "editedOn",
            "description": "<p>Team edited date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "editedBy",
            "description": "<p>Id of User who edited the Team details into the syatem.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\nHTTP/1.1 200 OK\n   [\n     {\n         \"id\": 324578,\n         \"firstName\": \"parama\",\n         \"lastName\": \"singha\",\n         \"createdOn\": \"2016-06-30T04:53:37.000Z\",\n         \"createdBy\": 370925,\n         \"editedOn\": \"2016-06-30T04:53:37.000Z\",\n         \"editedBy\": 0\n     }\n   ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid / Without JWT Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Invalid Authorization Header\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/security/TeamController.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/security/teams/:id",
    "title": "Get Team Details",
    "name": "GetTeamDetails_",
    "version": "1.0.0",
    "group": "Teams",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API gets Team detail.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWTToken",
            "description": "<p>The JWT auth token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1N.eyJpc3mlvbiIsImF1ZCI6Imh0dHA6Ly9z.t8SSYXmaRPZahxeS0tBj \n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/security/teams/1",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The Team ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Team.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "portfolioAccess",
            "description": "<p>Portfolio Access - 1/0.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "modelAccess",
            "description": "<p>Model Access - 1/0.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "idDeleted",
            "description": "<p>Team status.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdOn",
            "description": "<p>Team creation date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createdBy",
            "description": "<p>Id of User who created the team into the syatem.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "editedOn",
            "description": "<p>Team edited date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "editedBy",
            "description": "<p>Id of User who edited the team details into the syatem.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "numberOfUsers",
            "description": "<p>Number of Users associated with Team.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "numberOfModels",
            "description": "<p>Number of Models associated with Team.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "numberOfPortfolios",
            "description": "<p>Number of Portfolios associated with Team.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "numberOfAdvisors",
            "description": "<p>Number of Advisors associated with Team.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n    [\n        {\n            \"id\": 1,\n            \"name\": \"paxcel team\",\n            \"portfolioAccess\": 1,\n            \"modelAccess\": 1,\n            \"isDeleted\": 0,\n            \"createdOn\": \"0000-00-00 00:00:00\",\n            \"createdBy\": 0,\n            \"editedOn\": \"2016-07-06T10:40:45.000Z\",\n            \"editedBy\": 370925,\n            \"numberOfUsers\": 16,\n            \"numberOfModels\": 0,\n            \"numberOfPortfolios\": 1,\n            \"numberOfAdvisors\": 0\n        }\n    ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid / Without JWT Token.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Not_Found",
            "description": "<p>When Team does not exist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Invalid Authorization Header\"\n}",
          "type": "json"
        },
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 404 Not_Found\n{\n  \"message\": \"Team does not exist\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/security/TeamController.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/security/teams/:id/models",
    "title": "Get Team Models",
    "name": "GetTeamModels_",
    "version": "1.0.0",
    "group": "Teams",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API gets Team Models.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWTToken",
            "description": "<p>The JWT auth token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1N.eyJpc3mlvbiIsImF1ZCI6Imh0dHA6Ly9z.t8SSYXmaRPZahxeS0tBj\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/security/teams/1/models",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Model id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Model Name.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "isDeleted",
            "description": "<p>Deletion status - 1/0</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdOn",
            "description": "<p>Team creation date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createdBy",
            "description": "<p>Id of User who created the Team into the syatem.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "editedOn",
            "description": "<p>Team edited date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "editedBy",
            "description": "<p>Id of User who edited the Team details into the syatem.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\nHTTP/1.1 200 OK\n   [\n     {\n         \"id\": 1,\n         \"name\": \"Test Model\",\n         \"isDeleted\": 1,\n         \"createdOn\": \"2016-06-30T04:53:37.000Z\",\n         \"createdBy\": 370925,\n         \"editedOn\": \"2016-06-30T04:53:37.000Z\",\n         \"editedBy\": 0\n     }\n   ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid / Without JWT Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Invalid Authorization Header\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/security/TeamController.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/security/teams/:id/portfolios",
    "title": "Get Team Portfolios",
    "name": "GetTeamPortfolios_",
    "version": "1.0.0",
    "group": "Teams",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API gets Team Portfolios.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWTToken",
            "description": "<p>The JWT auth token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1N.eyJpc3mlvbiIsImF1ZCI6Imh0dHA6Ly9z.t8SSYXmaRPZahxeS0tBj\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/security/teams/1/portfolios",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Portfolio id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Portfolio Name.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "idDeleted",
            "description": "<p>Status.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdOn",
            "description": "<p>Team creation date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createdBy",
            "description": "<p>Id of User who created the Team into the syatem.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "editedOn",
            "description": "<p>Team edited date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "editedBy",
            "description": "<p>Id of User who edited the Team details into the syatem.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\nHTTP/1.1 200 OK\n   [\n     {\n         \"id\": 324578,\n         \"name\": \"parama\",\n         \"createdOn\": \"2016-06-30T04:53:37.000Z\",\n         \"createdBy\": 370925,\n         \"editedOn\": \"2016-06-30T04:53:37.000Z\",\n         \"editedBy\": 0\n     }\n   ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid / Without JWT Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Invalid Authorization Header\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/security/TeamController.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/security/teams/:id/users",
    "title": "Get Team Users",
    "name": "GetTeamUsers_",
    "version": "1.0.0",
    "group": "Teams",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API gets Team Users.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWTToken",
            "description": "<p>The JWT auth token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1N.eyJpc3mlvbiIsImF1ZCI6Imh0dHA6Ly9z.t8SSYXmaRPZahxeS0tBj\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/security/teams/1/users",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>User FirstName.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>User LastName.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "idDeleted",
            "description": "<p>USer status.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdOn",
            "description": "<p>Team creation date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createdBy",
            "description": "<p>Id of User who created the Team into the syatem.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "editedOn",
            "description": "<p>Team edited date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "editedBy",
            "description": "<p>Id of User who edited the Team details into the syatem.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\nHTTP/1.1 200 OK\n   [\n     {\n         \"id\": 324578,\n         \"firstName\": \"parama\",\n         \"lastName\": \"singha\",\n         \"createdOn\": \"2016-06-30T04:53:37.000Z\",\n         \"createdBy\": 370925,\n         \"editedOn\": \"2016-06-30T04:53:37.000Z\",\n         \"editedBy\": 0\n     }\n   ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid / Without JWT Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Invalid Authorization Header\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/security/TeamController.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/security/teams/action/reassignTeam",
    "title": "Re-Assign team",
    "name": "Re_Assign_Team_",
    "version": "1.0.0",
    "group": "Teams",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API Re-Assigns Users from one team to another team.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWTToken",
            "description": "<p>The JWT auth token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1N.eyJpc3mlvbiIsImF1ZCI6Imh0dHA6Ly9z.t8SSYXmaRPZahxeS0tBj\n  \"Content-Type\" : application/json \n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "oldId",
            "description": "<p>Old Team Id.</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "newId",
            "description": "<p>New Team Id.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n{\n     \"oldId\":{oldId},\n     \"newId\":{newId}\n   }",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/security/teams/action/reassignTeam",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Team Re-Assign message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\nHTTP/1.1 200 OK\n  {\n     \"message\": \"Team reassigned successfully\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid / Without JWT Token.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Bad_Request",
            "description": "<p>When missing required parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Internal_Server_Error",
            "description": "<p>Internal Server Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Invalid Authorization Header\"\n}",
          "type": "json"
        },
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad_Request\n{\n  \"message\": \"Missing required parameters\"\n}",
          "type": "json"
        },
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 500 Internal_Server_Error\n{\n  \"message\": \"\"Your request cannot be processed at the moment, please verify parameters\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/security/TeamController.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/security/teams/:id",
    "title": "Update Team",
    "name": "UpdateTeam_",
    "version": "1.0.0",
    "group": "Teams",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API Update Team.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWTToken",
            "description": "<p>The JWT auth token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1N.eyJpc3mlvbiIsImF1ZCI6Imh0dHA6Ly9z.t8SSYXmaRPZahxeS0tBj\n  \"Content-Type\" : application/json \n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Team.</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "portfolioAccess",
            "description": "<p>Portfolio Access - 1/0.</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "modelAccess",
            "description": "<p>Model Access - 1/0</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n     \"name\":\"newest team1\",\n     \"portfolioAccess\":1,\n     \"modelAccess\":1\n            \n    }",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/security/teams/1",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The Team Id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Team.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "portfolioAccess",
            "description": "<p>Portfolio Access - 1/0.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "modelAccess",
            "description": "<p>Model Access - 1/0</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "idDeleted",
            "description": "<p>Team status.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdOn",
            "description": "<p>Team creation date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createdBy",
            "description": "<p>Id of User who created the Team into the syatem.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "editedOn",
            "description": "<p>Team edited date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "editedBy",
            "description": "<p>Id of User who edited the Team details into the syatem.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "numberOfUsers",
            "description": "<p>Number of Users associated with Team.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "numberOfModels",
            "description": "<p>Number of Models associated with Team.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "numberOfPortfolios",
            "description": "<p>Number of Portfolios associated with Team.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "numberOfAdvisors",
            "description": "<p>Number of Advisors associated with Team.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n    [\n        {\n            \"id\": 1,\n            \"name\": \"paxcel team\",\n            \"portfolioAccess\": 1,\n            \"modelAccess\": 1,\n            \"isDeleted\": 0,\n            \"createdOn\": \"0000-00-00 00:00:00\",\n            \"createdBy\": 0,\n            \"editedOn\": \"2016-07-06T10:40:45.000Z\",\n            \"editedBy\": 370925,\n            \"numberOfUsers\": 16,\n            \"numberOfModels\": 0,\n            \"numberOfPortfolios\": 1,\n            \"numberOfAdvisors\": 0\n        }\n    ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid / Without JWT Token.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Bad_Request",
            "description": "<p>When without request data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unprocessable_Entity",
            "description": "<p>When team already exist with same name.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Invalid Authorization Header\"\n}",
          "type": "json"
        },
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad_Request\n{\n  \"message\": \"Bad Request: Verify request data\"\n}",
          "type": "json"
        },
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 422 Unprocessable_Entity\n{\n  \"message\": \"Team already exist with same name\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/security/TeamController.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/security/users",
    "title": "Add User",
    "name": "AddUser",
    "version": "1.0.0",
    "group": "Users",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API adds Orion Connect User into application.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWTToken",
            "description": "<p>The JWT auth token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1N.eyJpc3mlvbiIsImF1ZCI6Imh0dHA6Ly9z.t8SSYXmaRPZahxeS0tBj \n  \"Content-Type\" : application/json\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The actual userId from connect.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Full name of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email id.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "roleId",
            "description": "<p>Actual role Id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "teamIds",
            "description": "<p>Actual team Id.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>User status - Active/Inactive.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "startDate",
            "description": "<p>User started date into application.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "expireDate",
            "description": "<p>User expired date into application.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": " {\n    \"id\":1122,\n    \"name\": \"param singh\",\n    \"email\": \"param1@gmail.com\",\n    \"roleId\":1,\n    \"teamIds\":[1,2],\n    \"status\": 0,\n    \"startDate\": \"mm/dd/yyyy\",\n    \"expireDate\": \"mm/dd/yyyy\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/security/users",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The User Id.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "name",
            "description": "<p>Fullname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "idDeleted",
            "description": "<p>User exist or not into the system.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdOn",
            "description": "<p>User creation date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createdBy",
            "description": "<p>Id of user who created the User into the syatem.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "editedOn",
            "description": "<p>User edited date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "editedBy",
            "description": "<p>Id of user who edited the User details into the syatem.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>User status - Active/Inactive.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>User role details.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "teams",
            "description": "<p>User team details.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "startDate",
            "description": "<p>User started date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "expireDate",
            "description": "<p>User expired date into application.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n     \"id\": 370925,\n     \"name\": \"Jonathan Wissink\",\n     \"isDeleted\": 0,\n     \"createdOn\": \"2016-06-29T11:25:32.000Z\",\n     \"createdBy\": 370925,\n     \"editedOn\": \"2016-06-29T11:33:17.000Z\",\n     \"editedBy\": 370925,\n     \"status\": 1,\n     \"email\": \"test@test.com\",\n     \"role\": {\n        \"id\": \"167\",\n        \"name\": \"test23\"\n     },\n     \"teams\": [\n        {\n        \"id\": \"1\",\n        \"name\": \"Team One\"\n        },\n        {\n        \"id\": \"2\",\n        \"name\": \"Team Two\"\n        },\n        {\n        \"id\": \"38\",\n        \"name\": \"Team\"\n        }\n     ],\n     \"startDate\": \"2050-12-30T18:30:00.000Z\",\n     \"expireDate\": \"2050-12-30T18:30:00.000Z\"\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid / Without JWT Token.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Bad_Request",
            "description": "<p>When without request data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unprocessable_Entity",
            "description": "<p>When user already exist with same id.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Not_Found",
            "description": "<p>,When user does not exist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Invalid Authorization Header\"\n}",
          "type": "json"
        },
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad_Request\n{\n  \"message\": \"Bad Request: Verify request data\"\n}",
          "type": "json"
        },
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 422 Unprocessable_Entity\n{\n  \"message\": \"User already exist with same id\"\n}",
          "type": "json"
        },
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 404 Not_Found\n{\n     \"message\": \"User does not exist\"\n   }",
          "type": "json"
        }
      ]
    },
    "filename": "controller/security/UserController.js",
    "groupTitle": "Users"
  },
  {
    "type": "delete",
    "url": "/security/users/:id",
    "title": "Delete User",
    "name": "DeleteUser",
    "version": "1.0.0",
    "group": "Users",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API deletes (soft delete) user in application.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWTToken",
            "description": "<p>The JWT auth token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1N.eyJpc3mlvbiIsImF1ZCI6Imh0dHA6Ly9z.t8SSYXmaRPZahxeS0tBj \n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/security/users/324578",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>User deleted message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n \n{\n     \"message\": \"User deleted successfully\"\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid / Without JWT Token.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Not_Found",
            "description": "<p>When user does not exist or already deleted.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Invalid Authorization Header\"\n}",
          "type": "json"
        },
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 404 Not_Found\n{\n     \"message\": \"User does not exist or already deleted\"\n   }",
          "type": "json"
        }
      ]
    },
    "filename": "controller/security/UserController.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/security/users",
    "title": "Get All Users",
    "name": "GetAllUsers",
    "version": "1.0.0",
    "group": "Users",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API gets user list.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWTToken",
            "description": "<p>The JWT auth token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1N.eyJpc3mlvbiIsImF1ZCI6Imh0dHA6Ly9z.t8SSYXmaRPZahxeS0tBj \n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/security/users",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The User Id.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "name",
            "description": "<p>Fullname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "idDeleted",
            "description": "<p>User exist or not into the system.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdOn",
            "description": "<p>User creation date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createdBy",
            "description": "<p>Id of user who created the User into the syatem.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "editedOn",
            "description": "<p>User edited date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "editedBy",
            "description": "<p>Id of user who edited the User details into the syatem.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>User status - Active/Inactive.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>User role details.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "teams",
            "description": "<p>User teams details.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 370925,\n  \"name\": \"Prime TGI\",\n  \"isDeleted\": 0,\n  \"createdOn\": \"2016-06-17T05:57:22.000Z\",\n  \"createdBy\": 0,\n  \"editedOn\": \"2016-06-17T05:57:25.000Z\",\n  \"editedBy\": 0,\n  \"status\": 0,\n  \"email\": \"test@orion.com\",\n  \"role\": {\n      \"id\": \"1\",\n      \"name\": \"Advisor\"\n     },\n  \"teams\": []\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid/Without JWT Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Invalid Authorization Header\"\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/security/UserController.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/security/users/connect/:id",
    "title": "Get User From Orion Connect",
    "name": "GetUserDetailFromOrionConnect",
    "version": "1.0.0",
    "group": "Users",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API searches user in Orion Connect.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWTToken",
            "description": "<p>The JWT auth token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1N.eyJpc3mlvbiIsImF1ZCI6Imh0dHA6Ly9z.t8SSYXmaRPZahxeS0tBj \n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/security/users//connect/john",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>Orion connect userName</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "loginUserId",
            "description": "<p>Orion connect user login id</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "userId",
            "description": "<p>Orion connect user id</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "userDetailId",
            "description": "<p>Orion connect user detail Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "selected",
            "description": "<p>Orion connect user selected value</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userGuid",
            "description": "<p>Orion connect user GUID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "entity",
            "description": "<p>Orion connect user entity value</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "entityId",
            "description": "<p>Orion connect user entity Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "entityName",
            "description": "<p>Orion connect user entity name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n \n[\n     {\n         \"userName\": \"Leyboldt, Joe\",\n         \"loginUserId\": \"joe.leyboldt\",\n         \"userId\": 2801,\n         \"userDetailId\": 186055,\n         \"selected\": false,\n         \"userGuid\": \"20af52c4-0bed-4da9-97b6-29bd639536ac\",\n         \"entity\": \"Administrator\",\n         \"entityId\": null,\n         \"entityName\": \"Leyboldt, Joe\"\n     }\n  ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid/Without JWT Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Invalid Authorization Header\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controller/security/UserController.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/security/users/:userId/privileges",
    "title": "Get User Privileges",
    "name": "GetUserPrivileges",
    "version": "1.0.0",
    "group": "Users",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API gets user privileges.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWTToken",
            "description": "<p>The JWT auth token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1N.eyJpc3mlvbiIsImF1ZCI6Imh0dHA6Ly9z.t8SSYXmaRPZahxeS0tBj \n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/security/users/324578/privileges",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": "<p>The User id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User Full name.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>User status - Active/Inactive.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "isDeleted",
            "description": "<p>User exist or not into the system.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "privileges",
            "description": "<p>User privileges.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n \n{\n     \"id\": 1,\n     \"name\": \"Madan Sinha \",\n     \"status\": 0,\n     \"isDeleted\": 1,\n     \"privileges\": [\n         {\n             \"id\": 1,\n             \"name\": null,\n             \"canAdd\": 1,\n             \"canUpdate\": 1,\n             \"canDelete\": 1,\n             \"canRead\": 1,\n             \"isDeleted\": 0\n         }\n     ]\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>,Invalid / without JWT Token.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Not_Found",
            "description": "<p>,When user does not exist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Invalid Authorization Header\"\n}",
          "type": "json"
        },
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 404 Not_Found\n{\n     \"message\": \"User does not exist\"\n   }",
          "type": "json"
        }
      ]
    },
    "filename": "controller/security/UserController.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/security/users/:id",
    "title": "Get User Details",
    "name": "GetUsersDetail",
    "version": "1.0.0",
    "group": "Users",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API gets user details.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWTToken",
            "description": "<p>The JWT auth token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1N.eyJpc3mlvbiIsImF1ZCI6Imh0dHA6Ly9z.t8SSYXmaRPZahxeS0tBj \n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/security/users/370925",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The User Id.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "name",
            "description": "<p>Full name of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "idDeleted",
            "description": "<p>User exist or not into the system.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdOn",
            "description": "<p>User creation date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createdBy",
            "description": "<p>Id of user who created the User into the syatem.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "editedOn",
            "description": "<p>User edited date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "editedBy",
            "description": "<p>Id of user who edited the User details into the syatem.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>User status - Active/Inactive.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>User role details.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "teams",
            "description": "<p>User teams details.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "startDate",
            "description": "<p>User started date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "expireDate",
            "description": "<p>User expired date into applications.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"id\": 370925,\n     \"name\": \"Jonathan Wissink\",\n     \"isDeleted\": 0,\n     \"createdOn\": \"2016-06-29T11:25:32.000Z\",\n     \"createdBy\": 370925,\n     \"editedOn\": \"2016-06-29T11:33:17.000Z\",\n     \"editedBy\": 370925,\n     \"status\": 1,\n     \"email\": \"test@test.com\",\n     \"role\": {\n        \"id\": \"167\",\n        \"name\": \"test23\"\n     },\n     \"teams\": [\n        {\n        \"id\": \"1\",\n        \"name\": \"updating name\"\n        },\n        {\n        \"id\": \"2\",\n        \"name\": \"Team Two\"\n        },\n        {\n        \"id\": \"38\",\n        \"name\": \"\"\n        }\n     ],\n     \"startDate\": \"2050-12-30T18:30:00.000Z\",\n     \"expireDate\": \"2050-12-30T18:30:00.000Z\"\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid/Without JWT Token.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Not",
            "description": "<p>Found Invalid UserId.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Invalid Authorization Header\"\"\n}",
          "type": "json"
        },
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 404 Not_Found\n{\n     \"message\": \"User does not exist\"\n   }",
          "type": "json"
        }
      ]
    },
    "filename": "controller/security/UserController.js",
    "groupTitle": "Users"
  },
  {
    "type": "put",
    "url": "/security/users/:id",
    "title": "Update User",
    "name": "UpdateUser",
    "version": "1.0.0",
    "group": "Users",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API updates user details.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWTToken",
            "description": "<p>The JWT auth token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": Session eyJhbGciOiJIUzI1N.eyJpc3mlvbiIsImF1ZCI6Imh0dHA6Ly9z.t8SSYXmaRPZahxeS0tBj \n  \"Content-Type\" : application/json\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Fullname of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email id.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "roleId",
            "description": "<p>Actual role Id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "teamIds",
            "description": "<p>Actual team Id.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>User status - Active/Inactive.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "startDate",
            "description": "<p>User started date into application.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "expireDate",
            "description": "<p>User expired date into application.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"name\": \"param singh\",\n   \"email\": \"param1@gmail.com\",\n   \"roleId\":167,\n   \"teamIds\":[27,2],\n   \"status\": 0,\n   \"startDate\":\"mm/dd/yyyy\",\n   \"expireDate\":\"mm/dd/yyyy\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/security/users/370925",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The User Id.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "name",
            "description": "<p>Fullname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "idDeleted",
            "description": "<p>User exist or not into the system.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdOn",
            "description": "<p>User creation date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createdBy",
            "description": "<p>Id of user who created the User into the syatem.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "editedOn",
            "description": "<p>User edited date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "editedBy",
            "description": "<p>Id of user who edited the User details into the syatem.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>User status - Active/Inactive.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>User role details.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "team",
            "description": "<p>User team details.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "startDate",
            "description": "<p>User started date into application.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "expireDate",
            "description": "<p>User expired date into application.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"id\": 370925,\n     \"name\": \"Madan sinha\",\n     \"isDeleted\": 0,\n     \"createdOn\": \"2016-06-29T11:25:32.000Z\",\n     \"createdBy\": 370925,\n     \"editedOn\": \"2016-06-29T11:33:17.000Z\",\n     \"editedBy\": 370925,\n     \"status\": 1,\n     \"email\": \"test@test.com\",\n     \"role\": {\n        \"id\": \"167\",\n        \"name\": \"test23\"\n     },\n     \"teams\": [\n        {\n        \"id\": \"1\",\n        \"name\": \"Team One\"\n        },\n        {\n        \"id\": \"2\",\n        \"name\": \"Team Two\"\n        },\n        {\n        \"id\": \"38\",\n        \"name\": \"\"\n        }\n     ],\n     \"startDate\": \"2050-12-30T18:30:00.000Z\",\n     \"expireDate\": \"2050-12-30T18:30:00.000Z\"\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid / Without JWT Token.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Bad_Request",
            "description": "<p>When Invalid request data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Not_Found",
            "description": "<p>When user does not exist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Invalid Authorization Header\"\n}",
          "type": "json"
        },
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad_Request\n{\n  \"message\": \"Bad Request: Verify request data\"\n}",
          "type": "json"
        },
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 404 Not_Found\n{\n     \"message\": \"User does not exist\"\n   }",
          "type": "json"
        }
      ]
    },
    "filename": "controller/security/UserController.js",
    "groupTitle": "Users"
  }
] });

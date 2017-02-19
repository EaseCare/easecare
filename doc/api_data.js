define({ "api": [
  {
    "type": "get",
    "url": "/security/login",
    "title": "Login API",
    "name": "GetJWTToken",
    "version": "1.0.0",
    "group": "Authentication",
    "permission": [
      {
        "name": "appuser"
      }
    ],
    "description": "<p>This API will login and returns JWT token.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "email",
            "optional": false,
            "field": "email",
            "description": "<p>User email id.</p>"
          },
          {
            "group": "Parameter",
            "type": "mobile_number",
            "optional": false,
            "field": "mobile",
            "description": "<p>number   User mobile number.</p>"
          },
          {
            "group": "Parameter",
            "type": "password",
            "optional": false,
            "field": "password",
            "description": "<p>User password.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": " {\n    \"email\":\"easecare@gmail.com\",\n    \"mobile_number\": 9865784567,\n    \"passowrd\": \"*******\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://baseurl/v1/security/login",
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
            "field": "token",
            "description": "<p>The JWT Token.</p>"
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
    "filename": "controller/security/AuthenticationController.js",
    "groupTitle": "Authentication"
  }
] });

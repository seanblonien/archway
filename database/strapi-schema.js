const axios = require('axios').default;

(async () => {
    let response;

    // Register or Login to the admin panel
    try {
        // Attempt to register
        response = await axios.post('http://localhost:1337/admin/auth/local/register', {
            "password": "capstone",
            "username": "admin",
            "passwordConfirmation": "capstone",
            "email": "seanb2016@gmail.com"
        });
    } catch(error){
        // If already registered
        if (error.response.status !== 200) {
            // Attempt to login
            try {
                response = await axios.post('http://localhost:1337/admin/auth/local', {
                    "identifier":"admin",
                    "password":"capstone",
                    "rememberMe":true
                });
            } catch(error){
                console.error(error);
            }
        }
    }
    // Get the jwt token from login
    const jwt = response.data.jwt;
    // Set the authorization token in the header
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

    // Add the content types
    try {
        // Example content type creation with multiple/various attributes
        // with certain requirements.
        response = await axios.post('http://localhost:1337/content-type-builder/content-types', {
            "components": [],
            "contentType": {
                "name": "exampletype",
                "description": "This is a description",
                "attributes": {
                    "aShortText": {
                        "type": "string"
                    },
                    "aLongText": {
                        "type": "text"
                    },
                    "aRichText": {
                        "type": "richtext"
                    },
                    "aInteger": {
                        "type": "integer",
                        "required": true,
                        "unique": true,
                        "max": 100,
                        "min": 0,
                        "default": 0
                    },
                    "aFloat": {
                        "type": "float"
                    },
                    "aDateTime": {
                        "type": "datetime"
                    },
                    "aBoolean": {
                        "type": "boolean"
                    },
                    "aRelation": {
                        "nature": "manyToOne",
                        "targetAttribute": "test_1S",
                        "target": "plugins::users-permissions.user",
                        "unique": false
                    },
                    "aEmail": {
                        "type": "email",
                        "unique": true
                    },
                    "password": {
                        "type": "password",
                        "required": true,
                        "private": true
                    },
                    "aSingleMedia": {
                        "type": "media",
                        "multiple": false
                    },
                    "someJson": {
                        "type": "json",
                        "private": false
                    }
                }
            }
        });
    } catch(error){
        console.error(error);
    }
})();

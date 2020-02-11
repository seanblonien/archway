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

    // Fetch the content types
    const fs = require('fs');
    const path = require('path');
    let contentTypes = JSON.parse(fs.readFileSync(`${path.resolve(__dirname, 'contentTypes.json')}`, 'utf8'));

    // Add the content types
    try {
        // Construct the endpoints of all of the content types to check if
        // they exist
        const contentTypesToUpdate = [];
        const contentTypeToCreate = [];
        for (const contentType of contentTypes) {
            let response = await axios.get('http://localhost:1337/content-manager/content-types/application::' + contentType.name + '.' + contentType.name).catch(e => e);
            if(response instanceof Error){
                contentTypeToCreate.push(contentType);
            } else {
                contentTypesToUpdate.push(contentType);
            }
        }

        for(const contentType of contentTypesToUpdate){
            let data = {
                "components": [],
                "contentType": contentType
            };
            await axios.put('http://localhost:1337/content-type-builder/content-types/application::' + contentType.name + '.' + contentType.name, data);
            const x = 1;
        }

        for(const contentType of contentTypeToCreate){
            // Example content type creation with multiple/various attributes
            // with certain requirements.
            response = await axios.post('http://localhost:1337/content-type-builder/content-types', {
                "components": [],
                "contentType": contentType
            });
        }
    } catch(error){
        console.error(error);
    }
})();

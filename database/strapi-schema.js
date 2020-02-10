const axios = require('axios').default;

(async () => {
    const response = await axios.post('http://localhost:1337/admin/auth/local/register', {
        "password": "capstone",
        "username": "admin",
        "passwordConfirmation": "capstone",
        "email": "seanb2016@gmail.com"
    });
    const jwt = response.data.jwt;
    const user = response.data.user;

    await axios.post('http://localhost:1337/content-type-builder/content-types', {
        "components": [],
        "contentType": {
            "name": "capstones",
            "attributes": {
                "title": {
                    "type": "string",
                    "required": true
                }
            }
        }
    });
})();

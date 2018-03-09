const axios = require("axios");
const base64 = require("base-64");

const config = require("./config.json")

const BASE_URL = "https://api-moncompte.sodexopass.fr/v2.2";
const AUTH_URL = BASE_URL + "/token";

function sodexoApi() {
}

sodexoApi.prototype.signIn = async function(login, password) {
    try {
        const auth = base64.encode(`${config.PUBLIC_ID}:${config.CLIENT_KEY}`);
        let response = await axios({
            method: "POST",
            url: AUTH_URL,
            data: { 
                "grant_type": "password", 
                "username": login, 
                "password": password 
            },
            headers: {
                "Authorization": "Basic " + auth
            },
            responseType: 'json'
        });
        console.log('response', response.data)
        return response.data;
    }
    catch(error) {
        console.log("error", error);
    }
}

module.exports = sodexoApi;
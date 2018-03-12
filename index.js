const axios = require("axios");
const base64 = require("base-64");

const { encrypt } = require('./lib/utils');

const config = require("./config.json")

const BASE_URL = `https://api-moncompte.sodexopass.fr/${config.WS_VERSION}`;
const AUTH_URL = BASE_URL + "/token";

const CONSUMER_URL = BASE_URL + `/${config.CLIENT_ID}/account`

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
        return response.data;
    }
    catch(error) {
        console.log("error", error);
    }
}

sodexoApi.prototype.getConsumerInfo = async function(login, accessToken) {
    try {
        axios.interceptors.request.use(function (axiosConfig) {
            const timestamp = Math.floor(Date.now()/1000).toString()
            axiosConfig.params = {
                timestamp: timestamp,
                signature: encrypt(axiosConfig.url+`?timestamp=${timestamp}`, config.CLIENT_KEY)
            }
            return axiosConfig;
          }, function (error) {
            return Promise.reject(error);
          });
        let response = await axios({
            method: "GET",
            url: CONSUMER_URL + `/${login}/consumer`,
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            responseType: 'json'
        });
        return response.data;
    }
    catch(error) {
        console.log("error", error);
    }
}

module.exports = sodexoApi;
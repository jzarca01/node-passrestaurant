const axios = require("axios");
const base64 = require("base-64");

const { encrypt, createMainInstance } = require('./lib/utils');

const config = require("./config.json")

const BASE_URL = `https://api-moncompte.sodexopass.fr/${config.WS_VERSION}`;
const AUTH_URL = BASE_URL + "/token";
const CONSUMER_URL = BASE_URL + `/${config.CLIENT_ID}/account`;

const mainInstance = createMainInstance(CONSUMER_URL, config.CLIENT_KEY);

function sodexoApi() {
}

sodexoApi.prototype.signIn = async (login, password) => {
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

sodexoApi.prototype.getConsumerInfo = async (login, accessToken) => {
    try {
        let response = await mainInstance.get(CONSUMER_URL + `/${login}/consumer`, {
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            params: {},
            responseType: 'json'
        });
        return response.data;
    }
    catch(error) {
        console.log("error", error);
    }
}

sodexoApi.prototype.getCards = async (login, accessToken) => {
    try {
        let response = await mainInstance(CONSUMER_URL + `/${login}/cards`, {
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            params: {
                domain_perimeters: {
                    domain_perimeter:[0][
                        {
                            product_code: "restaurant",
                            support_code: "carte"
                        }
                    ]
                },
            },
            responseType: 'json'
        });
        return response.data;
    }
    catch(error) {
        console.log("error", error);
    }
}

sodexoApi.prototype.getParams = async (login, accessToken) => {
    try {
        let response = await mainInstance(CONSUMER_URL + `/${login}/params`, {
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            params: {
                domain_perimeter:[0][ {
                    product_code: "restaurant",
                    support_code: "carte"
                }]
            },
            responseType: 'json'
        });
        return response.data;
    }
    catch(error) {
        console.log("error", error);
    }
}

sodexoApi.prototype.getBalance = async (login, cardId, cardType, accessToken) => {
    try {
        let response = await mainInstance(CONSUMER_URL + `/${login}/cards/${cardId}/balance`, {
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            params: {
                card_type: cardType,
                domain_perimeter: {
                    product_code: "restaurant",
                    support_code: "carte"
                }
            },
            responseType: 'json'
        });
        return response.data;
    }
    catch(error) {
        console.log("error", error);
    }
}

sodexoApi.prototype.getTransactions = async (login, cardId, cardType, accessToken) => {
    try {
        let response = await mainInstance(CONSUMER_URL + `/${login}/cards/${cardId}/transactions`, {
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            params: {
                cardType: cardType
            },
            responseType: 'json'
        });
        return response.data;
    }
    catch(error) {
        console.log("error", error);
    }
}

module.exports = new sodexoApi();

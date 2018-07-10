const axios = require("axios");
const base64 = require("base-64");

const {
    encrypt,
    createMainInstance
} = require('./lib/utils');

class sodexoApi {

    constructor(config) {
        this.config = config;

        this.BASE_URL = `https://api-moncompte.sodexopass.fr/${this.config.WS_VERSION}`;
        this.AUTH_URL = this.BASE_URL + "/token";
        this.CONSUMER_URL = this.BASE_URL + `/${this.config.CLIENT_ID}/account`;

        this.mainInstance = createMainInstance(this.CONSUMER_URL, this.config.CLIENT_KEY);

    }

    setAccessToken(accessToken) {
        this.mainInstance.defaults.headers.common['Authorization'] = '';
        delete this.mainInstance.defaults.headers.common['Authorization'];

        this.mainInstance.defaults.headers.common[
            'Authorization'
        ] = `Bearer ${accessToken}`;
    }

    async signIn(login, password) {
        try {
            const auth = base64.encode(`${this.config.PUBLIC_ID}:${this.config.CLIENT_KEY}`);
            let response = await axios({
                method: "POST",
                url: this.AUTH_URL,
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
            this.setAccessToken(response.data.access_token)
            return response.data;
        } catch (error) {
            console.log("error", error);
        }
    }

    async getConsumerInfo(login) {
        try {
            let response = await this.mainInstance.get(this.CONSUMER_URL + `/${login}/consumer`, {
                responseType: 'json'
            });
            return response.data;
        } catch (error) {
            console.log("error", error);
        }
    }

    async getCards(login) {
        try {
            let response = await this.mainInstance(this.CONSUMER_URL + `/${login}/cards?domain_perimeters%5Bdomain_perimeter%5D%5B0%5D%5Bproduct_code%5D=restaurant&domain_perimeters%5Bdomain_perimeter%5D%5B0%5D%5Bsupport_code%5D=carte`, {
                responseType: 'json'
            });
            return response.data;
        } catch (error) {
            console.log("error", error);
        }
    }

    async getParams(login) {
        try {
            let response = await this.mainInstance(this.CONSUMER_URL + `/${login}/params`, {
                params: {
                    domain_perimeter: [0][{
                        product_code: "restaurant",
                        support_code: "carte"
                    }]
                },
                responseType: 'json'
            });
            return response.data;
        } catch (error) {
            console.log("error", error);
        }
    }

    async getBalance(login, cardId, cardType) {
        try {
            let response = await this.mainInstance(this.CONSUMER_URL + `/${login}/cards/${cardId}/balance?card_type=${cardType}&domain_perimeter%5Bproduct_code%5D=restaurant&domain_perimeter%5Bsupport_code%5D=carte`, {
                responseType: 'json'
            });
            return response.data;
        } catch (error) {
            console.log("error", error);
        }
    }

    async getTransactions(login, cardId, cardType) {
        try {
            let response = await this.mainInstance(this.CONSUMER_URL + `/${login}/cards/${cardId}/transactions`, {
                params: {
                    cardType: cardType
                },
                responseType: 'json'
            });
            return response.data;
        } catch (error) {
            console.log("error", error);
        }
    }
}


module.exports = sodexoApi;
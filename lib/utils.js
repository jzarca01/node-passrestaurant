const CryptoJS = require('crypto-js');

function encrypt(url, key) {
    const encryptedKey = CryptoJS.enc.Utf8.parse(key)
    const data = CryptoJS.enc.Utf8.parse(url);
    const hashSign = CryptoJS.HmacSHA512(data, encryptedKey).toString(CryptoJS.enc.Hex);    
    return hashSign;
}

module.exports = {
    encrypt: encrypt
};
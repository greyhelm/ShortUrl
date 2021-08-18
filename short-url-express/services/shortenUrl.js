const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';

// found nano id to be fantastic to use
function shortenUrl(){
    const nanoid = require('nanoid');
    const urlID = nanoid.customAlphabet(alphabet,6);
    return urlID();
}

// simple function to generate random id for short url
/*function shortenUrl() {
    let loopCounter = 0;
    let str = '';

    while (loopCounter < 6) {
        str = str + selectNextChar(alphabet);
        loopCounter++;
    }
    return str;

    function selectNextChar(chars){
        let index = Math.floor(Math.random() * alphabet.length);
        return chars.charAt(index);
    }
}*/

module.exports = shortenUrl;
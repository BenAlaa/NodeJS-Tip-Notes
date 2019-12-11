var greetings = require('./greetings.json')

var greet = function (params) {
    console.log("مرحبا");
    console.log(greetings.arabic);
}

module.exports = greet;

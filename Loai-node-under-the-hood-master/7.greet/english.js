var greetings = require('./greetings.json')
var greet = function (params) {
    console.log("hello");
    console.log(greetings.english);
}

module.exports = greet;

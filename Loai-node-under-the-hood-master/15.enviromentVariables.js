//environment variables are global variable specific for the enviroment(server) our code lives in

//for instance when you say port 3000, this is for development purposes, you'll need to reconfigure it in deployment
//this where we can use environment variables


/**
 * When using Node.js, you can retrieve environment variables by key from the process.env object:

var mode = process.env.mode; // 'PRODUCTION', for example

var apiKey = process.env.apiKey; // '38294729347392432'
There are time when you may want to set environment variables while you run your node app -- these are set temporarily while the process is still running.  A common case is simulating environment variables during testing.  You can temporarily set these variables by pegging items onto the process.env object:

process.env.mode = 'TESTING';
 */
console.log(process.env.userid);
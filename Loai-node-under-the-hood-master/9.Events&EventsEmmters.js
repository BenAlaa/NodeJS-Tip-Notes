//event is something that happened in our app that we can respond to
//in node there's two kind of events
//1- system events 
//comes from c++ core, from the library libuv (finished reading a file, recieved http request) things that javascript doesn't have
//2- custom events
//inside the javascript core, event Emitter native module
//often when events occurs in libuv, (because everything is wrapped in javascript), it generates custom events in event emitter to make it easier for us to handle it with javascript code
//in the javascript there's no events, that's why we have the eventEmitter module

/**
 * quick javascript review 
 */

//if i have an object i can set and get a propertiy in that object using [] 
// // // var obj = {
// // //     name: " loai",
// // //     lastname: "alaa"
// // // }
// // // console.log(obj["name"]);
// // // //or i can do this 
// // // let myKey = "name";
// // // console.log(obj[myKey]);

//another thing 
//if i push functions in an array, i can use foreach to call them
// // // let x = [];
// // // x.push(function () {
// // //     console.log("object1");
// // // });
// // // x.push(function () {
// // //     console.log("object2");
// // // });
// // // x.push(function () {
// // //     console.log("object3");
// // // })
// // // x.forEach(element => {
// // //     element();
// // // });



///////now node eventsEmitter 
//building our own
//we want to build something that says an event has happened and to respond to it

function Emitter() {
    this.events = {};
}
//event listener is the code that responds to an event
Emitter.prototype.on = function (type, listener) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);
}
Emitter.prototype.emit = function (type) {
    if (this.events[type]) {
        this.events[type].forEach(function(element) {
            console.log("i'm in foreach Emit");
            element();
        })
    }
}

module.exports = Emitter;



///////////////////////////////////////////////////////////////////////////////
/////////////////////Node Event Emitter///////////////////////////
///////////////////////////////////////////////////////////////////////////////
//in events.js native module

const emitter = require('events');


const myEmitter = new emitter();
myEmitter.on("fileOpen",function () {
    console.log("fileOpened");
});

myEmitter.emit("fileOpen"); 
///it works the same way as our EventEmitter

//the problem with eventEmitters is that they rely on magic strings
//magic string is a string that has a special meaning in our app
//if we emit with the wrong string, it won't work and it's hard to find it

//dealing with it

//we create a file with all the configs like this

//config.js

let config = {
    Events:{
        FILEOPENED:"fileopened",
        GREET:"greet",
        CLICK:"click"
    }
}
module.exports.config = config;
//now when i require('config.js') anywhere, I'll have access to the events variabls without relying on magic strings
 
myEmitter.on(config.Events.GREET,function () {
    //add code here
});






//////object.create and prototypes 
//we can access any method or property in the prototype chain
// //  var person = {
// //      firstname:"",
// //      lastname:"",
// //      greet:function(){
// //          return this.lastname + " " + this.firstname;
// //      }
// //  }
// //  //creating an instance using object.create
// //  let loai = Object.create(person);
// //  //now  i can hide the firstname and lastname in the prototype chain like this
// //  loai.firstname = "loai";
// //  loai.lastname = "alaa";
// //  //now i didn't hide greet, so it won't find in its prototype so it will look down in the prototype chain
// //  loai.greet();

////////////////////////////////////////////////////////////////



//inherting from event emitter
//////first setting the prototype chain in node
//in util.js there's mehtod called inherits and it takes two function constructors
//the first is the one you want to inherit, and the second is the function constructor with the properties you want to add
//to see how this works review util.js in folder 1.nodemodules


// ES6 example using class and extends:

const EventEmitter = require('events');

class MyStream extends EventEmitter {
    constructor(){
        super(); //we have to do this to add the properties of the eventEmitter to our class
          
    }
  write(data) {
    this.emit('data', data);
  }
}


const stream = new MyStream();

stream.on('data', (data) => {
  console.log(`Received data: "${data}"`);
});
stream.write('With ES6');


///////////////////////

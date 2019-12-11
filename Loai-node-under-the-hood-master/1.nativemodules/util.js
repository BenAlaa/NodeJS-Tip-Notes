const util = require('util');

///util.format()
//replaces %s with the variable or we can use the template literals

const name = "loai";
const greeting = util.format('Hello, %s',name);
//use %s, %d , ...... just like c++

//or template literals like this 
const greeting2 = `hello ${name}`;


//util.log() "deprecated"
//adds a time stamp
util.log(greeting)


/////util.inherits
const util = require('util');
const EventEmitter = require('events');

function MyStream() {
  EventEmitter.call(this); // calling the constructor of the parent

}
////here we add the properties of mystream to the event emitter
//mystream will now have the prototype of eventEmitter down in its prototype chain
//so it will have access to methods like emit or on
//how this works is that inherits function places an prototype object between the two
//and that new prototype will have the prototype of the object i want to have
//and my class -the one i need to extend- will have the middle man as its prototype
//////////////////////myobject
////////////////middleman
////////////baseClass
////important /////////////////
//when we use inherits it only connects the prototypes
//properties of the parent class won't be accessiable for the children
//we have to call the constructor of the parent in our function constructor
//like this 
/**
function MyStream() {
  
    EventEmitter.call(this); // calling the constructor of the parent
}
 */



util.inherits(MyStream, EventEmitter);

MyStream.prototype.write = function(data) {
    console.log(data);
  this.emit('data');
};

const stream = new MyStream();

console.log(stream instanceof EventEmitter); // true
console.log(MyStream.super_ === EventEmitter); // true

stream.on('data', (data) => {
  console.log(`Received data: "${data}"`);
});
stream.write('It works!'); // Received data: "It works!"



// ES6 example using class and extends:

const EventEmitter = require('events');

class MyStream extends EventEmitter {
  write(data) {
    
    this.emit('data', data);
  }
}

const stream = new MyStream();

stream.on('data', (data) => {
  console.log(`Received data: "${data}"`);
});
stream.write('With ES6');



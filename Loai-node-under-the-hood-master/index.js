// const emiter = require('./9.Events&EventsEmmters');

// const myEmitter = new emiter();
// myEmitter.on("fileOpen",function () {
//     console.log("fileOpened");
// });

// myEmitter.emit("fileOpen"); 

// const util = require('util');
// const EventEmitter = require('events');

// function MyStream() {
//   EventEmitter.call(this);
// }
////here we add the properties of mystream to the event emitter
//mystream will now have the prototype of eventEmitter down in its prototype chain
//so it will have access to methods like emit or on

// util.inherits(MyStream, EventEmitter);

// MyStream.prototype.write = function(data) {
//     console.log(data);
//   this.emit('data',data);
// };

// const stream = new MyStream();

// console.log(stream instanceof EventEmitter); // true
// console.log(MyStream.super_ === EventEmitter); // true

// stream.on('data', (data) => {
//   console.log(`Received data: "${data}"`);
// });
// stream.write('It works!bla bla bla'); // Received data: "It works!"

const buffer = Buffer('Hello','utf8'); 
console.log(buffer);
console.log(buffer.toString());
console.log(buffer.toJSON()); //
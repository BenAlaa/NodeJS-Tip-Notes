const fs = require('fs');
let myStream = fs.createReadStream(__dirname+'/text.txt',{encoding:"utf8",highWaterMark:1024*32});
//since stream extends eventEmitter  we can listen

//if the file is smaller or the same size as the buffer, we will get all the data
//if it's bigger, we will get chuncks of data at a time, each the size of the buffer
//it them emits an event, runs all the listeners, then go and gets more data , and so force
//we can determine how large our buffer by using property highWaterMark
let Writeable= fs.createWriteStream(__dirname+'/copy.txt');
myStream.on('data',function (buffer) {
    console.log("++++++Buffer++++++");
    console.log(buffer.length);
    Writeable.write(buffer);
});




////////////pipes
// a pipe is connecting two streams, a writable and readable
//as long as you start from readable
//pipes can be chained 
//implementing copying using pipes

let readableStream = fs.createReadStream(__dirname+'/text.txt');
let writableStream= fs.createWriteStream(__dirname+'/copy.txt');
readableStream.pipe(writableStream);
// ///using duplex for chaining

// const zlip = require('zlib');
// let gzip = zlip.createGzip(); //readable and writable stream, creating a rar file


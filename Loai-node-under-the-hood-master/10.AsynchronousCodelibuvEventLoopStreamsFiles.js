//////async 
//javascript is sync
//node however is async
//callback is a function that is passed to another function and sometimes we expect it will be called

////////////libuv the event loop (system events)
// 1- libuv requests something from the os (open a file) (happens while v8 is running)
// 2- inside libuv there's a queue of events that has completed, also there's an eventLoop and it's a loop that is constantly checking 
// the queue to see if something is there (happens while v8 is running)
// 3- once the os finishes the task, it'll fire an event and it'll be placed in the queue
// 4- when libuv sees something is complete it runs the callback, the code that we said should run when this is done
// 5- this callback will run in v8, but it'll only run once v8 finishes running the code it's running because javascript is sync
///
//// buffer is a temp holding spot for data being moved from one place to another
//the buffer holds raw binary data
///buffers have limited size, and it comes through a stream, stream is a sequence of data flowing, and combines into a whole
// we don't need to combine the stream with the buffer we can just process the stream itself as it comes
//but sometimes we do combine data in a buffer as it come and process it, chunk by chunk
///////////////
///binary data, character sets, encoding 
///binary data is data stored in sets of 1s and 0s
///character set is a representation of character as a number (unicode, ascii)
//character encoding numbers are converted and stored in binary, same as characters

///// for instance, character set utf-8, puts everything in 8 bits, so when we read we read each 8bits together and turn them into either 
//a number or a character


///////////////////how node deals with buffers
//node made Buffer Global,
//we give it data , and the encoding type
const buffer = Buffer('Hello','utf8');   

console.log(buffer.toString());
console.log(buffer.toJSON()); //

buffer.write('wo'); //this will replace He, because i determined the size when i put 'hello' in it
//in most cases buffer will be returned to you not that you initialize them

/////es6 has a way to deal with binary but we won't use it
// // ///////typed arrays array buffer is a javascript object in es6
// // const buffer2 = new ArrayBuffer(8); //byte is 8 bits, bit is 0 or 1

// // let view = new Int32Array(buffer2);
// // //if i changed the array, it changes the buffer
// // //if i read from the array, i read from the buffer
// // view[0] = 5;
// // view[1] = 22;
// // //since it's an array buffer of 8 bytes, and it's base 32 array, i can only put two numbers in it (8 bytes = 64 bits, 64/32 = 2)
// // console.log(view);

///////////////////////
//node and files 

const fs = require('fs');
const path = require('path');
function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path,{encoding:"utf8"},(err,res)=>{
            if (err) {
                reject(err.message);
            }
            resolve(res);
        });
    });
}

const mypathtofile = path.join(__dirname,"filename");
readFile(mypathtofile).then(res => console.log(res)).catch(err => console.log(err)); 

async function UseAsyncAwait() {
    try {
        const myStream = await readFile("mypath") ;
        console.log(myStream);
        
    } catch (error) {
        console.log(error);
    }
 }



///////////////////////////////////////////////////
//error first callback
//callbacks that takes error object as first parameter and if there's no error, first parameter will be null
//node is an error first callback

///////////////////////////important
//the fs.readFile() deals with buffers, and buffers sits in memory, so if i have many users, and they all requested large files
//this will take so much memory space. that's why we need to use streams, collecting just chuncks of data
////data is split into chunks and sent

//in node the stream module inherits from eventEmitter
//stream is an abstract class
//we need to build our own stream that inherits from it

/////browser ---> request ---> readable stream ---> node
//// node ----> writable stream ---> response ---> browser

//go to 11.fileStreaming to see an example of dealing with large files

//tend to use streams and async methods because it will help with performance of your app


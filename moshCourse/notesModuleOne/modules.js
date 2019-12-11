const path = require('path');

let x = path.parse(__filename);

console.log(x);

/*
{ root: 'D:\\',
  dir: 'D:\\iti\\trials\\node.js',
  base: 'path.js',
  ext: '.js',
  name: 'path' }
*/

const os = require('os');
let totalmemory = os.totalmem();
let free = os.freemem();

console.log(`sayed is awesome${totalmemory} ${free}`);


const fs = require('fs');
const files = fs.readdirsynSync('./'); // it will return the name of files in the same directory

function ReadFile(filename) {
    let filepath = "./" + filename;
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, { encoding: 'ascii' }, (err, res) => {
            if (err) {
                reject(err);
            } else {
                let y = JSON.parse(res);
                // console.log(y);
                resolve(y);
            }
        });
    });
}

function WriteFile(filename, data) {
    let filepath = "./" + filename;
    let x = JSON.stringify(data);
    return new Promise((resolve, reject) => {

        fs.writeFile(filepath, x, (err) => {
            reject(err);
        });

        resolve();
    });
}

////////events
//The EventEmitter is a class, 
//we always need to extend it in our class. then export it
const EventEmitter = require('events');

//when it's 
class Event extends EventEmitter {
    constructor() {
        super();
        this.cal = 1;
    }
    log(message) {
        cal++;
        console.log(message);
        this.emit('messgeLogged', { id: cal });
    }
}
const emitter = new Event();
//mostly used are emit() which is used to raise an event
emitter.on('messageLogged', (eventArg) => {
    console.log(eventArg);
    console.log('called');
});
//emit means produce something - signalling an event has happened
emitter.emit('messageLogged', { id: 1, url: 'url' });
// { id: 1, url: 'url' } is the argumesnt that the event recieves
//registering a listener

const Http = require('http');
const server = Http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('hello');
        res.end();
    }
});
//server is an event emitter
server.listen(3000);
server.on('connection', (socet) => {
    console.log('new');
});
console.log('listening on port 3000');
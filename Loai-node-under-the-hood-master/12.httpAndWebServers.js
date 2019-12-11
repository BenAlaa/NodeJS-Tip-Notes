///////////
///TCPIP protocol
//a protocol is a set of rules that two sides agree on to use when communicating
// how do a client and server identify each other
//each has a ip, they open a socket(a passage between the two devices)
//the request and respond has to follow a protocol, (http/ftp/smtp)
//the way that information is sent is TCP 
//the act of splitting a (information) message into pieces(packets) and sending it through the socket is TCP
//the os, has this ability, and node gives us access to use them
//TCP is the same concept as a stream, and node treats these packets as a stream
//we open and close sockets frequently. web sockets stay opened so that we can exchange data through the server at all time

///////////////////////////////
//how information gets to node process (address and ports)
//port, once a computer receives a packet, how it knows what program to send it to
//when a program is setup on the operating system to receive packets from a port, it's said that it's listening to that port

///////how is information is structured  using http
//http is a set of rules for the data being transferred on the web
///status(200 ok,300,400,500), headers(name value pairs)(body)
//mime type a standard for specifying the type of information being sent
//it's programmed to behave differently to each type (application/json,text/html,image/jpeg) 

//////http_parser
//it's a standalone program that's part of nodejs
//it extracts information from the http request and returns them
//

//////creating a web server in node
const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
    //when the server emits, this will be the function that runs
    res.writeHead(200, {
        "Content-Type": "text/plain"
    });
    //sending myfile a chunk at a time, piping it to the response
    if (req.url === '/')
        fs.createReadStream(myPath, {
            encoding: 'utf8'
        }).pipe(res);
    else if (req.url === '/hello')
        res.end("hello world \n");
    //outputting json
    else if (req.url === '/json'){

        let myObj = {
            firstname: "loai",
            lastName: "alaa"
        }
        res.end(JSON.stringify(myObj));
    }
    else{

        res.writeHead(404);
    }



}).listen(3000, "127,0,0,1");
//the program now waits for requests, it won't close until i close it
//template is a text that's designed to be a basis for another final text after being processed
//html template with some place holders that will be filled later after processing 
const path = require('path');
const myPath = path.join(__dirname, '/index.html');
let html = fs.readFileSync(myPath, {
    encoding: 'utf8'
});
let replacedHtml = html.replace('{message}', "wakanda Forever");


/////////////////////////
//streams to increase performance

///apis and endpoints 

//api is a set of tool for building a software application,
//web api is a set of url which accepts and sends only data via http and tcp/ip

//a url in a web api is an endpoint
//outputting json
//serialize translating an objet into a format that can be transferred or stored


/////routing
//mapping http requests to content
//whether actual fils that exist on the server or not 
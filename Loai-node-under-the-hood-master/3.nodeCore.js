////////////////servers and clients
/**
 * node is writen by rayen dahel how wrking in joynt
 * 
 * server is a computerr that performs services
 * clients asks for services(requests){standard format} and the server responds {standard format}
 * browser requests {http request} to webserver {http response}
 * 
 * what does javascript needs to manage a server
 * **better way to organize your code into reusable pieces (modules)
 * **deal with files (fs read, fs write)
 * **deal with databases 
 * **the ability to communicate over the internet 
 * **accept request and send responses (express)
 * **a way to deal with work that takes a long time (promises)
 * 
 * node is an evented io for javascript 
 * node depends onto some libraries like v8 or libvu , httpparser
 * 
 * javascript core in node js
 * most of it is a wrapper for c++ functions 
 * in most of .js files of node you'll notice function called process.binding('nameofthelibrary');
 * it's a feature that graps the c++ code and makes it available to run in javascript
 * 
 * util.js is not a wrapper but a library of code that helps you in writing simpler code in javascript 
 * zlib for dealing with and creating zip files
 * c++ code found in src folder
 * javascript code found in lib folder
 */

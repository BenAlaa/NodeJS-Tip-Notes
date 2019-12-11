//install debug
//we can have multiple debugging environment and choose one or some of them of them to be active at any time
const startupDebugger = require('debug')('app:startup');
const dataBaseDebugger = require('debug')('app:database')

//in your application

startupDebugger("this is a console log")

dataBaseDebugger("this is console message db ")

//to activate one of them
//in the terminal 
//set DEBUG=app:startup
//now we will only see the debugging messages of startupDebugger
//if i don't want any debugging messages 
//set DEBUG=
//set it to nothing

//to enable many of them
//set DEBUG=app:startup,app:db
// for all of them
//DEBUG = app:* 


//since we use modules and we can have one instance of the 'debug' module
//we can shorten it like this
const debug = require('debug')('app:routes');

debug('routes debugging');
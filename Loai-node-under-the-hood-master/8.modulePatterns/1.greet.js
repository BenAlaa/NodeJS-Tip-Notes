//first pattern overriding module.exports with a single function
//greet1
module.exports = function (params) {
    console.log("hello word");
}

//when i require it and assign it to a variable, i can just call the variable

const greet1 = require('./greet');
greet1();

/////////////////////////////////
///second pattern  greet2
module.exports.greet = function () {
    console.log("hello world");
}

//when requiring  
const greet2 = require('./greet2');
greet2.greet();
//or 
const greet21 = require('./greet2').greet;
greet21();


//////////////////////////////
/////third pattern         //////////important
//greet3

// function Pers (firstName, lastNalme){
//     this.firstName=firstName,
//     this.lastNalme=lastNalme
// };

class Greet{
    constructor() {
        this.greeting = 'Hello';
        
        
    }
    greet(){
        console.log(this.greeting);
    }
}


module.exports = new Greet();

const greetInstance = require('./greet3');
greetInstance.greet(); //'Hello'

//here's a doosy 
//if i require greet3 again, will it return the same object or a new one

//to check
const greetInstance2 = require('./greet3');

greetInstance2.greeting = "changed this hello";
greetInstance2.greet(); //this will return "changed this hello"
////////why 
//require method cashes the results of the require function in a variable and if  that variable isn't null, it returns it
//so when we first required the module that variable was null, so after node compiled our code it cashed the module.exports in that variable
//now when we require the same file again,even across different javascript files, we get the cashed version, and since it's by reference, we will be accessing the same object
//since we changed that object, we get the changed version

//if i want to give my module the ability to return a new object, i'll export the class itself not an instance
//like this 
//module 4
//greeet4
/////third pattern         //////////important
//greet3
class Greet2{
    constructor() {
        this.greeting = 'Hello';
        
        
    }
    greet(){
        console.log(this.greeting);
    }
}


module.exports =  Greet2;

const greetClass= require('./greet4');
const newInstance = new greetClass();

/////greet5
//revealing only the methods and variables that i want
//achieving encapsulation
//revealing module pattern
var greeting5 = "hello";

function greet5(){
    console.log(greeting5);
}
module.exports = {
greet : greet5
}

////////////////
//setting the prototype chain in node
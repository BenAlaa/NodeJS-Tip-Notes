/*/////first somethings to remember 
 * ////////////////////objects/////////////////////
 * objects in javascript is a collection of name value pairs
 * objects sets in memory and points to properties which can be either primitive or function or object
 * object literal is something like this
 */
var address = {
   street: 'Main',
   city: "mansoura",
   getCity: function () {
      return this.city
   }
};
//i can either use address.getCity() or address['city']
//if i want to dynamically set or get a value of the object we use the []

/////////////////////////First Class Functions in javascript///////////////////
/**
* In JavaScript, functions are first-class objects, which means they can be:

stored in a variable, object, or array
passed as an argument to a function (callback for instance)
returned from a function (closures)
*/

//function statement
// function functionStatement(fn) {
//     fn();
// }
// function Greet(){
//     console.log('greet');
// }
// functionStatement(Greet);

// //function expression  are first class too
// let functionExpression = function () {
//    ///code
// }
// functionExpression();

// functionStatement(functionExpression);
//


/////////////////prototypal inheritance and function constructor
//
//prototypal inheritance 
// another object shares the prototype of an object

//function constructor 
//normal function that used to construct object
//this will point to new empty object and that object is returned from the function
//we achieve this new empty object using new
/**
 * for documentation
 * @param {string} name 
 *  
 * @returns person object
 */
function pers(name) {
   this.name = name;
}
pers.prototype.changeName(newName) {
   this.name = newName;
}

let pers1 = new pers("name");
///////////////////////////////////////////////////////////////////////////////
/////////////////////By Ref and By Value///////////////////////////
///////////////////////////////////////////////////////////////////////////////
/**
* 1- Javascript is always pass by value, but when a variable refers to an object (including arrays), 
* the "value" is a reference to the object.
2- Changing the value of a variable never changes the underlying primitive or object, 
it just points the variable to a new primitive or object.
3- However, changing a property of an object referenced by a variable does change the underlying object.
*/
function f(a, b, c) {
   // Argument a is re-assigned to a new value.
   // The object or primitive referenced by the original a is unchanged.
   a = 3;
   // Calling b.push changes its properties - it adds
   // a new property b[b.length] with the value "foo".
   // So the object referenced by b has been changed.
   b.push("foo");
   // The "first" property of argument c has been changed.
   // So the object referenced by c has been changed (unless c is a primitive)
   c.first = false;
}

var x = 4;
var y = ["eeny", "miny", "mo"];
var z = {
   first: true
};
f(x, y, z);
console.log(x, y, z.first); // 4, ["eeny", "miny", "mo", "foo"], false

var a = ["1", "2", {
   foo: "bar"
}];
var b = a[1]; // b is now "2";
var c = a[2]; // c now references {foo:"bar"}
a[1] = "4"; // a is now ["1", "4", {foo:"bar"}]; b still has the value
// it had at the time of assignment
a[2] = "5"; // a is now ["1", "4", "5"]; c still has the value
// it had at the time of assignment, i.e. a reference to
// the object {foo:"bar"}
console.log(b, c.foo); // "2" "bar"


//////////////////IIFE/////////////////
/**
 * t’s an Immediately-Invoked Function Expression, or IIFE for short. It executes immediately after it’s created.

It has nothing to do with any event-handler for any events (such as document.onload).
Consider the part within the first pair of parentheses: (function(){})();....it is a regular function expression.
 Then look at the last pair (function(){})();, 
this is normally added to an expression to call a function; in this case, our prior expression.

This pattern is often used when trying to avoid polluting the global namespace, 
because all the variables used inside the IIFE (like in any other normal function) are not visible outside its scope.
 */

(
   
   (function () {
/////////////whatever in this is scope can't be accessed outside of it
   })()
);


function name(params) {
   
}



//////////////////module design pattern

var MyModule = (
   function() {
   var myPrivateData = 303;
   function myPrivateFunction() {
     alert('private');
   }
   return {
     myPublicData : 42,
     myPublicFunction : function() {
       alert('public');
     }
   };
 })();

 //we can now export it and import it

 /////////////Json
 /**
  * json is javascript object notation
  * it's a way of writing data that's inspired by javascript objects
  * javascript engines are built to understand it
  * {
  * "firstname":"loai",
  * "lastname":"alaa"
  *}
  */
 



  ///es6 modules

  //file name is  lib.js, 
  //i can export what ever i want by adding export keyword beforer the thing i want to export
  
export const PI = 3.1415926;

export function sum(...args) {
  log('sum', args);
  return args.reduce((num, tot) => tot + num);
}

export function mult(...args) {
  log('mult', args);
  return args.reduce((num, tot) => tot * num);
}

//or export in one line 
export { PI, sum, mult };

///importing
import { sum } from './lib.js'; //just sum

console.log( sum(1,2,3,4) ); // 10

import * as Math  from './lib.js'; //importing everythin in lib.js

//giving aliases for each one
import { sum as addAll, mult as multiplyAll } from './lib.js';


//when using browser 
//<script type="module" src="./main.js"></script>
//module is a reusable block of code whose existane doesn't accidentlly impact other code

/*The CommonJS module specification is the standard used in Node.js
 for working with modules. Modules are very cool, because they let you encapsulate all sorts of functionality,
  and expose this functionality to other JavaScript files, as libraries
*/

/////////////////////////////////////////////////////////////////////////////////
/////////////////////create first module///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

module.exports = function getDate(){
    return "12-12-2012";
}

//in other files we require this file require('path');
//the code inside this module gets wrapped in an IIFE

const getDate = require('pathToMyModule');
//i will have function ready in the getDate variables
//getDate();

/**
 * ///////////////////////////////////////////////////////////////////////////////
 * /////////////////////how modules work under the hood///////////////////////////
 * ///////////////////////////////////////////////////////////////////////////////
 ///// first review 5.javascriptReview.js file
 
*/
/**
 * when you write modules you there's two things that you notice
 * every file\module has its own scope
 * every module has module.exports object that you can access
 * where did those come from?
 * node.js takes all your code and wrap it in an iife
 * like this one
 */


(function(exports, require, module, __filename, __dirname) {
  // Module code actually lives in here
  });
 
  
/**
 * By doing this, Node.js achieves a few things:

It keeps top-level variables (defined with var, const or let) scoped to the module rather than the global object.
It helps to provide some global-looking variables that are actually specific to the module, such as:

The module and exports objects that the implementor can use to export values from the module.
The convenience variables __filename and __dirname, containing the module's absolute filename and directory path.

module.exports is used for defining what a module exports and makes available through require().

after wrapping the function, node invokes the function with .apply(self.exports, args) where args are [self.export,require,self,filename,dirname];

after the code compiles it returns module.exports  that's why when  we require it in any other module, we have immediate access to module.exports 
that's why we have access to the require function, filename, dirname and module.exports because node passes them to me

 */

///////////////////////Important
//If i want to split my module on multiple files 
//i can create a folder and require that folder 
//inside the folder i have to have index.js file, that's what node.js will look for
//see 7.greet

/////////////////////

//module patterns in node 
//see 8.modulepatterns

////////////////////module.exports vs exports
//here's the function that's passed to warp my code

(function(exports, require, module, __filename, __dirname) {
  // Module code actually lives in here
  });
//here's when it's called 
fn(module.exports, require, module, filename, dirname); 

//the first parameter that's passed on the wrapping function is exports
//but we use module.exports when we try to export something out of the module
//here's the difference  

//so exports is the a short hand for module.exports
//so both are referencing the same object in memory
// the problem is that exports doesn't work for all the modules we saw in 8.modules

exports = function () {
  console.log("hello");
}
//if i do
console.log(exports); //[function]
console.log(module.exports); //{}
//both should have been [function] since they're pointing at the same memory space
//but it has to do with how objects work in javascript
//at first exports was referencing the same memory space as module.exports
//when we said exports = function(){} , that reference was broken and now exports is pointing at a new obejct
//if we want use exports we will need to add to it, not reassign it
//exports.greet = function(){}

//a good rule of thumb, just use module.exports






/////////////native modules
//https://nodejs.org/dist/latest-v12.x/docs/api/
/////requiring core modules of node.js

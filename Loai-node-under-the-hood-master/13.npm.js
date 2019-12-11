//npm is a package of code manager
//dependencies is a code that another code depend on it to function

//semantic versioning
//versioning is specifying what version it's 
//semantic versioning , 
//major.minor.patch
//if you just fix bugs, update the patch number, and  your code won't break any other code
//if minor update, added new feature but code will work just fine
//if major updated, big changes may break

///npm commands
/**
 * npm install //this will install all the packages in package.json
 * npm i <package>  – install local package (production dependency)
 * npm i <package> --save – install local  package (same as the above --save is no longer required, if you don't say it, it's a production dependency)
 npm i -g </package> – install global package (use it for frequently used npm modules like nodemon)
 * npm i <package> --save-dev – install a development package
 * 
npm un </package><package> – uninstall local package
npm up – npm update packages
npm t – run tests
npm ls – list installed modules
npm ll or npm la – print additional package information while listing modules

You can also install multiple packages at once like this:

$ npm i express momemt lodash mongoose body-parser webpack
 */
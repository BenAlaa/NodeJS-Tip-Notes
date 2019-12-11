//node modules and libraries

//mongodb management
const mongoose = require('mongoose');
//for validation
const Joi = require('joi');
//nodemon for live server npm i nodemon

//for creating  a server 
const http = require('http');
//for routing 
const express = require('express');
//for getting dir location and path.join method
const path = require('path');

//sequalize is used for sql databases
/*npm install --save sequelize 
npm install --save tedious //ms sql server driver
*/

/* other drivers
$ npm install --save pg pg-hstore # Postgres
$ npm install --save mysql2
$ npm install --save mariadb
$ npm install --save sqlite3
$ npm install --save tedious # Microsoft SQL Server
*/



//using loadash
// _.pick returns an object with the values i specify
//so if the user sends many keys in the object we just take what we want
//or if we have many properties and we want to send just a few we use it too
user = new User(_.pick(req.body, ['name', "email", 'phone', 'password']));
//rest is representational state transfer
//crud operation
//http://vidly.com/api/customers
//http methods, get, post, put, delete
//get api/customers
//get api/customer/1
//put api/customers/1  requrestBody {name:''}
//delete api/customer/1
//post api/customers     requestBody {name:""}  to create
const express = require('express');
const Joi = require('joi');
const middleware = require('../middlewareFunc');

// const schema = Joi.object().keys({
//     bookname: Joi.string().min(3).max(5),
//     username: Joi.string().alphanum().min(3).max(30).required(),
//     password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
//     access_token: [Joi.string(), Joi.number()],
//     birthyear: Joi.number().integer().min(1900).max(2013),
//     email: Joi.string().email({ minDomainAtoms: 2 })
// });

// Return result.
// const result = Joi.validate({ username: 'abc', birthyear: 1994 }, schema);
// // result.error === null -> valid

// // You can also pass a callback which will be called synchronously with the validation result.
// Joi.validate({ username: 'abc', birthyear: 1994 }, schema, function(err, value) {}); // err === null -> valid

let app = express(); //call the function 
app.use(express.json());

//installing a middleware function in the request pipeline
app.use(middleware.auth);
app.use(middleware.log);
//we can't set a fixed port, we have to use 
const port = process.env.PORT || 3000;
app.listen(port);
// app.listen(3000, () => {
//     console.log('listening on port 3000');
// });
let jObject = { "bookname ": "VB BLACK BOOK", "price": 500 };
app.get('/', function(req, res) {
    res.send('Hello World');
});
app.get('/api/customers', (req, res) => {
    res.send(JSON.stringify(jObject));
});

app.post('/api/customers');

/*
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
*/

// app.get('/users/:userId/books/:bookId', function (req, res) {
//     res.send(req.params)
//   })

/*
Route path: /flights/:from-:to
Request URL: http://localhost:3000/flights/LAX-SFO
req.params: { "from": "LAX", "to": "SFO" }
*/

app.get('/flights/:from-:to', function(req, res) {
    //  res.send(req.params);
    let x = req.params.from;
    let y = req.params.to;
    res.send({ x: x, y: y });
});

app.get('/api/course/:id', function(req, res) {
    let x = req.params.id;
    let y = req.query; //this has the querystring
    if (x == 1) {
        res.send({ "id": 1, "bookname ": "VB BLACK BOOK", "price": 500 })
    } else {
        res.send({ "id": 2, "bookname ": "VBOOK", "price": 300 })

    }
});


//install nodemon and start you files with it nodemon expres.js
//this allows liveserver functionality

//post 
app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).max(4).required()
    };
    let result = Joi.validate(req.body, schema);
    // console.log(Joi.validate(req.body, schema));
    if (result.error) {
        res.status(400);
        return;
    }
    const course = {
        id: 5,
        name: req.body.name
    };
    res.send(course);
    //to test this we go to postman 
    //chose body = raw 
    //type json then send json object with name as a key value
    //{"name":"sayed"}
    //for input validation, use joi library
});

app.put('/api/courses/:id', (req, res) => {
    //get the course
    //   let y = req.query;
});

app.delete('/api/courses/:id', (req, res) => {
    //look up the course not exist 404
    //delete
    //return 200
});
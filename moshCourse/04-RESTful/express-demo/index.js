const express = require("express");
const app = express();
const Joi = require("joi");
app.use(express.json()); // enable express to parse body to json
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
];
//GET /api/customers
//GET /api/customers/1
//PUT /api/customers/1
//DELETE /api/customers/1
//POST /api/customers

// call back function here called a route handler
app.get("/", (req, res) => {
  res.send("Hello world");
});

//app.listen(3000, () => console.log("Listening on port 3000"));
const port = process.env.PORT || 3000;
//app.listen(port, () => console.log(`Listening on port ${port}`));

//nodemon is a package to run the server without the need to stop it
// it stand for node monitor
// when we need running our server we will write nodemon filename.js

// when you host your application on a server you won't set the port number
// but the server will set it so you cant write 3000
// we will use 'Environment variable' which is called "PORT"
//
//to set the Environment variable we will use
//set PORT=5000

// Route Parameters
// /api/courses/id
// every get request have some params
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("The course with the given ID was not found");
  }
  res.send(course);
});

// it is possible to have multible parameter in a rout
// i can sort the data using query string  ? sortby=name
// and to get query
// res.send(req.query)

app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.params);
});

// HTTP POST Request
app.post("/api/courses", (req, res) => {
  // How to do input validation
  // because user my input invalid property
  //for security purpose never ever trust what the client send to
  //   if (!req.body.name || req.body.name.length < 3) {
  //     // statude code 400 means bad request
  //     res.status(400).send("Name is required and should be minimum 3 characters");
  //     return;
  //   }

  // there is a library called "joi" do validations for me
  // first thing we need to define the schema
  // schema define the shape of our object, what properties we have?, what is the type of these properties?,
  // do we have email?, the minimum and maximum number?..........

  const { error } = validateCourse(req.body);
  //console.log(result);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };

  courses.push(course);
  res.send(course);
});

app.listen(port, () => console.log(`Listening on port ${port}`));

// example of Joi validation

// const Joi = require('@hapi/joi');

// const schema = Joi.object().keys({
//     username: Joi.string().alphanum().min(3).max(30).required(),
//     password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
//     access_token: [Joi.string(), Joi.number()],
//     birthyear: Joi.number().integer().min(1900).max(2013),
//     email: Joi.string().email({ minDomainSegments: 2 })
// }).with('username', 'birthyear').without('password', 'access_token');

// Handling HTTP PUT
// How to update the course

app.put("/api/courses/:id", (req, res) => {
  //Look up the course
  const course = courses.find(c => c.id === parseInt(req.params.id));

  // If not existing , return 404
  if (!course) {
   return res.status(404).send("The course with the given ID was not found");
  }

  // Validate
  const { error } = validateCourse(req.body);

  // If invalid , return 400 - Bad request
  if (error) {
   return res.status(400).send(error.details[0].message);
  }
  //Update course
  course.name = req.body.name;

  //Return the updated courses
  res.send(course);
});

// lets define a function to handle validation and the schema
function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
}

// Handling HTTP DELETE Request
app.delete("/api/courses/:id", (req, res) => {
  // Look up the course
  const course = courses.find(c => c.id === parseInt(req.params.id));

  // Not existing, return 404
  if (!course) {
    return res.status(404).send("The course with the given ID was not found");
    
  }

  //DELETE
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  //Return the same course
  res.send(course);
});

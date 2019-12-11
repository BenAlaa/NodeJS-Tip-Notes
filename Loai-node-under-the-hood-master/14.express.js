//express is a node package
//express is a routing package

///important
//http method(verbs) is the type of action the request wishes to make

//middleware 
//middleware is code that sits between two layers of software
//express  is sitting between the req, and res
//middleware in express has access two three params, req, res, next
//next is the next middleware function
//if you don't want to 
//app.use(),app.get()


const express = require('express');
const app = express();

app.listen(process.env.PORT || 3000);
app.get('/api',(req,res)=>{
    res.send(
        '<h1>helloWorld</h1>'
    );
})
////grouping routes together
const myrouter = express.Router();
myrouter.get('/',(req,res)=>{

})

myrouter.get('/api/:id',(req,res)=>{

  res.send(req.params.id);

})
//using the router, and here i can either specify a prefix or not

app.use('/admin',myrouter);


//let's look at routing in express
//https://expressjs.com/en/guide/routing.html

//static files 
//static files, meaning not dynamic 

//in the html, href=style.css

app.use(express.static(__dirname +'/1.nativemodules')); //this means that all the files in folder 1.nativemodules can be accessed if requested
//we can put css files, images, ....etc and reference them in our html page 
//or we can access them in the browser directly 

//another way to do it, in the html, href=assets/style.css
app.use('/assets',express.static(__dirname +'/1.nativemodules'));

///templates and template engines
//install ejs
//by default express looks for the static files views in folder named views
//we put index in it
app.set('view engine', 'ejs')
app.get('/', function (req, res) {
    //i'm sendind the object i want
    //we didn't specify the extension because if we changed the view engine this won't affect our express routes
    res.render('index', { title: 'Hey', message: 'Hello there!' })
});

/**
 * ejs in a nut shell
 * <% javascript code %>
 * <%= variable%>
 * <%- html%>
 * <ul>
    <% drinks.forEach(function(drink) { %>
        <li><%= drink.name %> - <%= drink.drunkness %></li>
    <% }); %>
</ul>
the include call. (This requires the 'filename' option.) 
For example if you have "./views/users.ejs" and "./views/user/show.ejs" 
you would use <%- include('user/show'); %>.

//include will render the view file inside our view file

<ul>
  <% users.forEach(function(user){ %>
    <%- include('user/show', {user: user}); %>
  <% }); %>
</ul>
 */


//queryString postData
//get method puts the data in the query string (url)
//post method is in the body of the request


//accessing the get querystring
//querystring is optional
app.get('/:id',(req,res)=>{
  let id =   req.params.id;
  let queryString = req.query;
  let queryStringId = req.query.id; 
})

//parsing the body of http request , we need a middleware, it's not included in express
//it will parse the body and turn in it into object that i can access
//npm i body-parser
//require('body-parser');

////////////////////////////////////////////important/////////////////////////////////////////
//note if we used app.use(bodyparser), this will parse the body for every request 
//if you want to parse it for specific requests, you can pass the middleware bodyParser.urlencoded() to that specific route 
//////////////////////////////////////////////////////////////////////////////////////////////
//look at body-parser documentation 
//https://expressjs.com/en/resources/middleware/body-parser.html
/**
 * var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
///express has json body parser 
app.use(express.json({}))
//
app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})
*/


app.get('/:id',(req,res)=>{
  //since i'm using bodyparser i now can access these request bodies
 //whether it's json or urlencoded
  let jsonBodyName = req.body.name;
})




///////////////////////////////////////////////////////////////////////////////
/////////////////////Structring apps in express///////////////////////////
///////////////////////////////////////////////////////////////////////////////

//express generator is a tool that gives us app skeleton very quickly
//here's the commands 
/**
 * express -h

  Usage: express [options] [dir]

  Options:

    -h, --help          output usage information
        --version       output the version number
    -e, --ejs           add ejs engine support
        --hbs           add handlebars engine support
        --pug           add pug engine support
    -H, --hogan         add hogan.js engine support
        --no-view       generate without view engine
    -v, --view <engine> add view <engine> support (ejs|hbs|hjs|jade|pug|twig|vash) (defaults to jade)
    -c, --css <engine>  add stylesheet <engine> support (less|stylus|compass|sass) (defaults to plain css)
        --git           add .gitignore
    -f, --force         force on non-empty directory

    to generate ejs express module use this 
    express -e --view=ejs Name Of Your App
 */
const http = require('http');

const server = http.createServer(function(req, res) {
    console.log("running");
    console.log(req);


});
server.listen(3000);


///we can use express to get the server running 
const express = require('express');
const app = express();
//we can't set a fixed port, we have to use 
// use port 3000 unless there exists a pre-configured port
const port = process.env.PORT || 3000;
app.listen(port);
// app.listen(3000);
/**
 * Middleware functions are functions that have access to the request object (req),
 *  the response object (res), and the next middleware function in the application’s request-response cycle.
 *  The next middleware function is commonly denoted by a variable named next.
 */
//express uses middleware functions to do the routing
//app.use is this middleware and it will go through them one by one
//if you don't send something back you have to call next();
app.use((req, res, next) => {
    console.log(__dirname);

    res.sendFile(__dirname + 'ind.html', (err) => {
        console.log(err);
    })
});

//path is a node module that gets you the path to the file you're in
const path = require('path');


//parsing the requests 

app.use(express.json());
//parses the requests in json formats
app.use(bodyParser.urlencoded({ extended: false }));
//parses the requests that come from forms into key value object
app.get('/:id', (req, res) => {
    res.send(req.params.id);
    res.send("this is me");

});
//sending raw html 
app.get('/admin/message', (req, res) => {
    res.send('<p>sa</p>');

});


//sending files and data to the page

app.get('/admin/message', (req, res) => {
    //    res.send("message received");
    res.sendFile(path.join(__dirname, 'ind.html'));
})

//sending static files
//now we have a folder with public name at the directory
//any link that references a static file, express will look for it
//in this folder and send it to the user if found
//when referencing it in the html page we shouldn't write /public/filename , just filename
//like this <link rel="stylesheet" href="/css/main.css"> no public at href
app.use(express.static(path.join(__dirname, 'public')));

// the trick can also used with routes, if we have a module with administrators 
//we can put them in a router like this
const router = express.Router();

// /admin/add-product => GET
//since we will use at the app.use('/admin') we don't need to put it in the link
router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/'); //to redirect to a certain action
});
//and export the router 
module.exports = { adminRoutes: router };

app.use('/admin', adminRoutes);

//we can use a default route that returns a 404 page, any route that doesn't exist in our routes will be defaulted to this
app.use((req, res, next) => {
        res.sendStatus(404).sendFile('404.html');
    })
    ///////routes 


/*
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
*/

app.get('/users/:userId/books/:bookId', function(req, res) {
    res.send(req.params);
})

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

//////important 

app.set('title', 'My Site');
app.get('title'); // "My Site"
// Assigns setting name to value. You may store any value that you want,
//  but certain names can be used to configure the behavior of the server.
//for templating engines we use 
app.set('view engine', 'ejs');



///enabling cros

app.post('/getfile', (req, res, next) => {
    ReadFile('myModel').then(
        (result) => {
            let x = JSON.stringify(result);
            console.log(x);
            res.set({
                'Content-Type': 'text/json',

                "Access-Control-Allow-Origin": "*"
            })
            res.send(x);
        }
    ).catch((err) => {
        console.log(err);
    })
})


//if we are using methods that have promises, we can use async,await
app.post('/register', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = new User({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password
    });
    user = await user.save();

    res.send(user);
});


//using loadash
// _.pick returns an object with the values i specify
//so if the user sends many keys in the object we just take what we want
//or if we have many properties and we want to send just a few we use it too

router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("user already registered");
    user = new User(_.pick(req.body, ['name', "email", 'phone', 'password']));
    await user.save();
    //using loadash
    user = _.pick(user, ['name', 'email']);
    res.send(user);
});
module.exports = router;
// //custom-environment-variables.json
// {
//     "jwtPrivateKey": "vidly_jwtPrivateKey"
// }
// //default.json
// {
//     "jwtPrivateKey": ""
// }

////model
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        //because we are hashing the password  
        maxlength: 1024
    },
    isAdmin: Boolean
});

// - A JSON Web Token (JWT) is a JSON object encoded as a long string. We use
// them to identify users. It’s similar to a passport or driver’s license. It includes a
// few public properties about a user in its payload. These properties cannot be
// tampered because doing so requires re-generating the digital signature.
// - When the user logs in, we generate a JWT on the server and return it to the
// client. We store this token on the client and send it to the server every time we
// need to call an API endpoint that is only accessible to authenticated users.
// - To generate JSON Web Tokens in an Express app use jsonwebtoken package.
// Generating a JWT
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}
const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        //255 because it's not yes hashed
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(user, schema);
}
//using joi password complexity
//now in the routes we will use the two methods 
//the validateUser for the name and email
//the validatePassword for the password
const PasswordComplexity = require('joi-password-complexity');
//validating the user 

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),

    };

    return Joi.validate(user, schema);
}

function validatePassword(password) {


    return Joi.validate(password, new PasswordComplexity());
    /**
     * When no options are specified, the following are used:

        {
          min: 8,
          max: 26,
          lowerCase: 1,
          upperCase: 1,
          numeric: 1,
          symbol: 1,
          requirementCount: 3,
        }
     */
    //or 
    const complexityOptions = {
        min: 10,
        max: 30,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 2,
    }

    return Joi.validate('aPassword123!', new PasswordComplexity(complexityOptions));

}


/////routes
// const auth = require('../middleware/auth');
//middleware/auth


let auth = function(req, res, next) {
        const token = req.header('x-auth-token');
        if (!token) return res.status(401).send('Access denied. No token provided.');

        try {
            const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
            req.user = decoded;
            next();
        } catch (ex) {
            res.status(400).send('Invalid token.');
        }
    }
    //////
const jwt = require('jsonwebtoken');
const config = require('config');

//we use bcrypt for hasing the password
//for more info see hashing below line 185
const bcrypt = require('bcrypt');
//we use loadash to maipulate objects 
const _ = require('lodash');
const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
//auth is a middleware  that's going to run before this method
router.get('/me', auth, async(req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/', async(req, res) => {
    const { error } = validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');
    //using loadash
    // _.pick returns an object with the values i specify
    //so if the user sends many keys in the object we just take what we want
    //or if we have many properties and we want to send just a few we use it too
    //instead of using req.body.name, req.body.email ....., we use .pick from the loadash library
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;


//authentication 

const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const token = user.generateAuthToken();
    res.send(token);
});

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(req, schema);
}

module.exports = router;


//hashing 
//using a salt 
/**
 * a salt is random data that is used as an additional input to a one-way function that "hashes" data, a password . 
 * are used to safeguard passwords in storage.
 *  Historically a password was stored in plaintext on a system,
 *  but over time additional safeguards developed to protect a user's password against being read from the system. 
 * A salt is one of those methods.
 * A new salt is randomly generated for each password. 
 * In a typical setting, the salt and the password (or its version after Key stretching) are concatenated and processed with a cryptographic hash function, 
 * and the resulting output (but not the original password) is stored with the salt in a database.
 */
//generating salts
async function getSalt() {
    //the larger the number you give, the longer it'll take to generate and the stronger the salt will be

    const salt = await bcrypt.genSalt(10);
}

///////////////////////////////////////////authorization 
let authenticateUser = function(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
}
function isAdminMiddleWare (req, res, next) { 
    // 401 Unauthorized
    // 403 Forbidden 
    
    if (!req.user.isAdmin) return res.status(403).send('Access denied.');
  
    next();
  }
  router.delete('/:id', [authenticateUser, isAdminMiddleWare], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
  
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    res.send(genre);
  });

// Authentication and Authorization
// So, in this section, you learned that:
// - Authentication is the process of determining if the user is who he/she claims to
// be. It involves validating their email/password.
// - Authorization is the process of determining if the user has permission to perform
// a given operation.
// - To hash passwords, use bcrypt:
// Hashing passwords
const salt = await bcrypt.genSalt(10);
const hashed = await bcrypt.hash(‘1234’, salt);
// Validating passwords
const isValid = await bcrypt.compare(‘1234’, hashed);
// - A JSON Web Token (JWT) is a JSON object encoded as a long string. We use
// them to identify users. It’s similar to a passport or driver’s license. It includes a
// few public properties about a user in its payload. These properties cannot be
// tampered because doing so requires re-generating the digital signature.
// - When the user logs in, we generate a JWT on the server and return it to the
// client. We store this token on the client and send it to the server every time we
// need to call an API endpoint that is only accessible to authenticated users.
// - To generate JSON Web Tokens in an Express app use jsonwebtoken package.
// Generating a JWT
const jwt = require(‘jsonwebtoken’);
const token = jwt.sign({ _id: user._id }, ‘privateKey’);
// - Never store private keys and other secrets in your codebase. Store them in
// environment variables. Use the config package to read application settings
// stored in environment variables.
// - When appropriate, encapsulate logic in Mongoose models:
// Adding a method to a Mongoose model
userSchema.methods.generateAuthToken = function() {}
const token = user.generateAuthToken();
// - Implement authorization using a middleware function. Return a 401 error
// (unauthorized) if the client doesn’t send a valid token. Return 403 (forbidden) if
// the user provided a valid token but is not allowed to perform the given operation.
// - You don’t need to implement logging out on the server. Implement it on the client
// by simply removing the JWT from the client.
// - Do not store a JWT in plain text in a database. This is similar to storing users’
// passports or drivers license in a room. Anyone who has access to that room can
// steal these passports. Store JWTs on the client. If you have a strong reason for
// storing them on the server, make sure to encrypt them before storing them in a
// database.
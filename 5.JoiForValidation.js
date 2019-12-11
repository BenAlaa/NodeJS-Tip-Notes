const Joi = require('joi');
//joi schema for validating certain inputs

const schema = Joi.object().keys({
    bookname: Joi.string().min(3).max(5),
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    access_token: [Joi.string(), Joi.number()],
    birthyear: Joi.number().integer().min(1900).max(2013),
    email: Joi.string().email({ minDomainAtoms: 2 })
});

//joi schema for validating certain inputs
const joiSchemaCreateMovie = {
    name: Joi.string().min(2).max(25).required(),
    genre: Joi.string().min(2).max(15).required(),
    director: Joi.string().min(2).max(15).required()
};
const JoiShemaFindMovie = {
    name: Joi.string().min(2).max(25).required()
}

//using it 
//we have to parse req.body first using app.use(parsing method);
Joi.validate(req.body, joiSchemaCreateMovie, (err, val) => {
    if (err) {
        res.status(400).send({
            status: 'error',
            message: 'Invalid request data',
            data: req.body
        });

    } else {
        const movie = new Movie({
            //req.body will return undefined if we didn't use app.use(express.JSON()) to parse it
            name: req.body.name,
            genre: req.body.genre,
            director: req.body.director
        });

        //the instance is responsible for saving in the database using instance.save()
        movie.save().then(
            movie => res.send(movie)
        ).catch(err => res.status(500));
    }
});

//another way of using the validation methods
//using destructuring  
function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        email: Joi.string().required(),
        password: Joi.string().required().min(5).max(255)
    };

    return Joi.validate(user, schema);
}

router.post('/register', async(req, res) => {
    const { error } = validateUser(req.body);
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
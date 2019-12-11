//validation using Joi
//mongodb management using mongoose


const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');

//setting up the server at port 3000 and parsing the request into json
let app = express();
app.use(express.json()); //req.body will return undefined without it
app.listen(3000);
//setting up the routes, .get or .post is .use method but customized for .get http method
app.get('/api/movies', getAllMovies);
app.post('/api/movies', createMovie);
app.get('/api/movies/:name', getMovieByName);
app.put('/api/movies/:_id', update);

//connecting to database using mongoose, the name of the database is vidly, if not existing, it will create a new database
mongoose.connect('mongodb://localhost/vidly').then(() => {
    console.log('connected');
});
//mongoose schema for validation
const vidlySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        enum: ['comicbook', 'Action']
    },
    director: {
        type: String,
        required: true
    }

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

// Movie variable will be a class, each instance of it will create a document in the db
//'Movie' has to be singular because the mongodb will make it plural
const Movie = mongoose.model('Movie', vidlySchema);
//i can add all these methods to the schema using vidlySchema.methods.getAllMovies
//we then write our methods
getAllMovies = (req, res) => {
    Movie.find().then(
        movies => {
            res.send(movies);
        }
    ).catch(err => res.status(500).send());
};
createMovie = (req, res) => {
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
};
getMovieByName = (req, res) => {
    Joi.validate(req.params, JoiShemaFindMovie, (err, val) => {

        if (err) {
            res.status(400).send({
                status: 'error',
                message: 'Invalid request data',
                data: req.params
            });

        } else {
            Movie.find({ name: req.params.name }).then(

                movie => {
                    if (!movie) {
                        res.status(400).send({
                            status: 'error',
                            message: 'Invalid request data',
                            data: req.params
                        });
                    }
                    res.send(movie);
                }
            ).catch(err => res.status(500));

        }
    });
};
update = (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: "content can not be empty"
        });
    }

    Joi.validate(req.body, joiSchemaCreateMovie, (err, val) => {
        if (err) {
            res.status(400).send({
                status: 'error',
                message: 'Invalid request data',
                data: req.body
            });

        } else {
            Movie.findByIdAndUpdate(req.params._id, {
                    name: req.body.name || "Untitled movie", //if req.body.name == undefined, the title will be "untitled....", this is ec6
                    director: req.body.director,
                    genre: req.body.genre
                }, { new: true }) //new : true means that if the update happens you need the new version to be the one that returns not the old
                .then(movie => {
                    if (!movie) {
                        return res.status(404).send({
                            message: "movie not found with id " + req.params._id
                        });
                    }
                    res.send(movie); //the updated version because {new:true}
                }).catch(err => {
                    if (err.kind === 'ObjectId') { //checking if the id isn't a valid object id
                        return res.status(404).send({
                            message: "movie not found with id " + req.params._id
                        });
                    }
                    return res.status(500).send({
                        message: "Error updating movie with id " + req.params._id
                    });
                });

        }
    })
};
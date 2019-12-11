const mongoose = require('mongoose');
const Joi = require('joi');

mongoose.connect('mongodb://localhost/vidly').then(() => {
    //app.listen(3000);
    console.log('connected');
});

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
        required: true //can take a function
    }

});
const joiSchemaCreateMovie = {
    name: Joi.string().min(2).max(25).required(),
    genre: Joi.string().min(2).max(15).required(),
    director: Joi.string().min(2).max(15).required()
};
const JoiShemaFindMovie = {
    name: Joi.string().min(2).max(25).required()
}
const Movie = mongoose.model('Movie', vidlySchema);

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
                name: req.body.name,
                genre: req.body.genre,
                director: req.body.director
            });
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
                    name: req.body.name || "Untitled movie",
                    director: req.body.director,
                    genre: req.body.genre
                }, { new: true })
                .then(movie => {
                    if (!movie) {
                        return res.status(404).send({
                            message: "movie not found with id " + req.params._id
                        });
                    }
                    res.send(movie);
                }).catch(err => {
                    if (err.kind === 'ObjectId') {
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

module.exports = {

    getMovies: getAllMovies,
    createMovie: createMovie,
    getMovieByName: getMovieByName,
    update: update
}
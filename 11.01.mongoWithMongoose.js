const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground').then(() => {
    console.log('connected');
}).catch(err => console.log(err.message));

//the name of the database is playground, if it doesn't exist, mongo will create it
//we use mongose to create a schema

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String], //enum
    date: { type: Date, default: Date.now },
    isPublished: Boolean

});

//turning it into a model 
//to get a course class that reflects the schema we use mongoose.model
//it takes the singular name of the collection in the db, and the schema
//Course here is a class 
const Course = mongoose.model('Course', courseSchema);
//we can put it into async function to use await method for the promise
async function createCourse(params) {

    const nodeCourse = new Course({
        name: "NodeJS",
        author: "Mosh",
        tags: ['node', 'backend'],
        isPublished: true
    });

    const result = await nodeCourse.save(); //the object itself is the one that saves in the database
    console.log(result);
};

//working with dynamic input
createProduct = (req, res, next) => {
    console.log(req.body);
    //we should do validation first but since this is not the subject we will just use it
    //the view has to have a form and it has to be post

    productOps.create(req.body.name, req.body.price, req.body.seller).then(product => {
        console.log(product);
    });
    res.redirect('/');
}



//crud with mongoose

const movieSchema = mongoose.Schema({
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

const Movie = mongoose.model('Movie', movieSchema);

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

//working with related objects in moongose
//using references (normalization) 
//consistent
let author = {
    name: "loai"
};
let course = {
    author: 'id'
};
//using embedded documents  (denormalization)
//query performance
let courseEmbedded = {
    author: {
        name: "loai"
    }
};
//hyprid approach
let author3 = {
    id: 2,
    name: "loai",
    age: 12,
    bla: "blaBla"
};
let course3 = {
    author: { //we don't put the other properties and get them only when we need them
        id: 2,
        name: "loai"
    },
    name: "sdd"
};
//////////////////////////using references (normalization) ///////////////////////////
const Author = mongoose.model('Author', new mongoose.Schema({
    name: String,
    bio: String,
    website: String
}));
const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
}));

async function listCourses() {
    const courses = await Course
        .find()
        .select('name');
    console.log(courses);

}

async function listCoursesPopulated() {
    const courses = await Course
        .find().populate('author').select("name author ");
    console.log("my courses populated are" + courses);

}
//changing what's the properties that are selected in the populate method
//to exclude add - before property -_id
//we can populate many times, just chain .populate('category') for instance
async function listCoursesPopulated2() {
    const courses = await Course
        .find().populate('author', 'name bio -_id').select("name author -_id");
    console.log("my courses populated are" + courses);

}
//////////////////////////using embedded (Denormalization) ///////////////////////////


const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author2 = mongoose.model('Author', authorSchema);
//now we can access the embedded document(subdocument) throught the course class

const Course1 = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: authorSchema
}));
const Course2 = mongoose.model('Course', new mongoose.Schema({
    name: String,
    authors: [authorSchema]
}));

async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    });

    const result = await course.save();
    console.log(result);
}
async function UpdateCourse(id, newName) {
    const course = await Course.findById(id);
    course.author.name = newName;
    course.save();
    ///or you can update in the database and not in the memory and save
    const course2 = await Course.update({ _id: id }, {
        $set: {
            'author.name': newName
        }
    });

}
async function listCourses() {
    const courses = await Course.find();
    console.log(courses);
}

createCourse('Node Course', new Author({ name: 'Mosh' }));











//another example
//////////////populating a reference //////////////


const personSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    age: Number,
    stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

const storySchema = Schema({
    author: { type: Schema.Types.ObjectId, ref: 'Person' },
    title: String,
    fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

const Story = mongoose.model('Story', storySchema);
const Person = mongoose.model('Person', personSchema);

const author = new Person({
    _id: new mongoose.Types.ObjectId(),
    name: 'Ian Fleming',
    age: 50
});

author.save(function(err) {
    if (err) return handleError(err);

    const story1 = new Story({
        title: 'Casino Royale',
        author: author._id // assign the _id from the person
    });

    story1.save(function(err) {
        if (err) return handleError(err);
        // thats it!
    });
});

//now if we want the author  we use .populate for the instance
Story.
findOne({ title: 'Casino Royale' }).
populate('author').
exec(function(err, story) {
    if (err) return handleError(err);
    console.log('The author is %s', story.author.name);
    // prints "The author is Ian Fleming"
});


//setting a ref field 

Story.findOne({ title: 'Casino Royale' }, function(error, story) {
    if (error) {
        return handleError(error);
    }
    story.author = author;
    console.log(story.author.name); // prints "Ian Fleming"
});


//field selection 
Story.
findOne({ title: /casino royale/i }).
populate('author', 'name'). // only return the Persons name
exec(function(err, story) { // //since we don't have data integrity in mongodb we need to check for errors 
    if (err) return handleError(err);

    console.log('The author is %s', story.author.name);
    // prints "The author is Ian Fleming"

    console.log('The authors age is %s', story.author.age);
    // prints "The authors age is null'
});


//object id
/**
 * The 12-byte ObjectId value consists of:

a 4-byte value representing the seconds since the Unix epoch (time stamp of time of creation),
a 5-byte random value, and
a 3-byte counter, starting with a random value.
 */
//the driver of mongodb is teh one that sets the id not the Mongodb it self
//moongose is an abstraction over mongoddb driver, so when we create a new document
//moongose talks to that driver to generate a new id
//if you want to extract data from object id you can use these methods

const id = new mongoose.Types.ObjectId();
id.getTimestamp();
//checking if id is valid
mongoose.Types.ObjectId.isValid("23rdsfsd");

//////////////////faster with lean
const leanDoc = await MyModel.findOne().lean();
/**
 * By default, Mongoose queries return an instance of the Mongoose Document class. Documents are much heavier than vanilla JavaScript objects,
 *  because they have a lot of internal state for change tracking.
 *  Enabling the lean option tells Mongoose to skip instantiating a full Mongoose document and just give you the POJO.
 Under the hood, after executing a query, Mongoose converts the query results from POJOs to Mongoose documents.
  If you turn on the lean option, Mongoose skips this step.


 */
const normalDoc = await MyModel.findOne();
const leanDoc = await MyModel.findOne().lean();

normalDoc instanceof mongoose.Document; // true
normalDoc.constructor.name; // 'model'

leanDoc instanceof mongoose.Document; // false
leanDoc.constructor.name; // 'Object'
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground').then(() => {
    console.log('connected');
}).catch(err => console.log(err.message));

//the name of the database is playground, if it doesn't exist, mongo will create it
//we use mongose to create a schema

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean

});

//turning it into a model 
//to get a course class that reflects the schema we use mongoose.model
//it takes the singular name of the collection in the db, and the schema
//Course here is a class 
const Course = mongoose.model('Course', courseSchema);
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
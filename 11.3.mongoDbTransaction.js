//in this example we rent a movie and we deal with two separate documents 
//there's two ways to handle this Transactions or Two phase commit(look for it)
//transactions using fawn npm i fawn
//the problem 
router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer.');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid movie.');

    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });
    rental = await rental.save(); //saving first time

    movie.numberInStock--;
    movie.save(); //saving second time
    //this is bad because both should happen and if the first one happen and something goes wrong and the second one didn't
    //we will have invalid logic here
    //that's why we need transaction

    res.send(rental);
});

//transaction
/**
 *  A transaction is an atomic unit. 
 * The effects of all the SQL statements in a transaction can be either all committed (applied to the database) or all rolled back (undone from the database)
 */
const mongoose = require('mongoose');
const Fawn = require('fawn');
Fawn.init(mongoose);

//now we deal with the database directly
//we need to name the collection name from the database
//and case sensitive not the name of the class

new Fawn.Task().save(
    'rentals', rental
).update('movies', { _id: movie._id }, {
    $inc: {
        numberInStock: -1
    }
}).run();


router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer.');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid movie.');

    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    movie.numberInStock--;
    try {
        new Fawn.Task().save(
            'rentals', rental
        ).update('movies', { _id: movie._id }, {
            $inc: {
                numberInStock: -1
            }
        }).run();

    } catch (error) {
        res.status(500).send('something failed');
    }

    res.send(rental);
});


///more on fawn 
var task = Fawn.Task();
 
//assuming "Accounts" is the Accounts collection
task.update("Accounts", {firstName: "John", lastName: "Smith"}, {$inc: {balance: -20}})
  .update("Accounts", {firstName: "Broke", lastName: "Ass"}, {$inc: {balance: 20}})
  .run()
  .then(function(results){
    // task is complete 
 
    // result from first operation
    var firstUpdateResult = results[0];
 
    // result from second operation
    var secondUpdateResult = results[1];
  })
  .catch(function(err){
    // Everything has been rolled back.
    
    // log the error which caused the failure
    console.log(err);
  });
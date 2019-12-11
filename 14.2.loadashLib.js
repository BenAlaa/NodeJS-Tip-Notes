//using loadash

// Iterating arrays, objects, & strings
// Manipulating & testing values
// Creating composite functions


// _.pick returns an object with the values i specify
//so if the user sends many keys in the object we just take what we want
//or if we have many properties and we want to send just a few we use it too

//so instead of this 
user = new User({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password
});

// we have this 
user = new User(_.pick(req.body, ['name', "email", 'phone', 'password']));

//instead of this 
res.send({
    name: user.name,
    email: user.email
});
//using loadash

res.send(_.pick(user, ['name', 'email']));

_.chunk(['a', 'b', 'c', 'd'], 2);
// => [['a', 'b'], ['c', 'd']]

_.chunk(['a', 'b', 'c', 'd'], 3);
// => [['a', 'b', 'c'], ['d']]

_.compact([0, 1, false, 2, '', 3]);
// => [1, 2, 3]

var array = [1];
var other = _.concat(array, 2, [3], [
    [4]
]);

console.log(other);
// => [1, 2, 3, [4]]

console.log(array);
// => [1]


function getRandomInteger() {
    return Math.round(Math.random() * 100);
}

var result = _.times(5, getRandomNumber);
// result => [64, 70, 29, 10, 23]

//_.debounce will invoke a function after a certain amount of time since the last time it was invoked.
function validateEmail() {
    // Validate email here and show error message if not valid
}

var emailInput = document.getElementById("email-field");
emailInput.addEventListener("keyup", _.debounce(validateEmail, 500));

/**
 * Instead iterating through an array with a loop to find a specific object,
 *  we can simply use _.find.
 *   You can also find an object using multiple properties
 */

var users = [
    { firstName: "John", lastName: "Doe", age: 28, gender: "male" },
    { firstName: "Jane", lastName: "Doe", age: 5, gender: "female" },
    { firstName: "Jim", lastName: "Carrey", age: 54, gender: "male" },
    { firstName: "Kate", lastName: "Winslet", age: 40, gender: "female" }
];

var user = _.find(users, { lastName: "Doe", gender: "male" });
// user -> { firstName: "John", lastName: "Doe", age: 28, gender: "male" }

var underAgeUser = _.find(users, function(user) {
    return user.age < 18;
});
// underAgeUser -> { firstName: "Jane", lastName: "Doe", age: 5, gender: "female" }




var posts = [
    { id: "1abc", title: "First blog post", content: "..." },
    { id: "2abc", title: "Second blog post", content: "..." },
    // more blog posts
    { id: "34abc", title: "The blog post we want", content: "..." }
    // even more blog posts
];

posts = _.keyBy(posts, "id");

var post = posts["34abc"]
    // post -> { id: "34abc", title: "The blog post we want", content: "..." }


var users = [
    { name: "John", age: 30 },
    { name: "Jane", age: 28 },
    { name: "Bill", age: 65 },
    { name: "Emily", age: 17 },
    { name: "Jack", age: 30 }
]

var reducedUsers = _.reduce(users, function(result, user) {
    if (user.age >= 18 && user.age <= 59) {
        (result[user.age] || (result[user.age] = [])).push(user);
    }

    return result;
}, {});

// reducedUsers -> { 
//     28: [{ name: "Jane", age: 28 }], 
//     30: [{ name: "John", age: 30 }, { name: "Jack", age: 30 }] 
// }
/**
 * don’t forget to return the result at the end of the function and
 *  don’t forget to specify the default value for the result as the third argument (here {}).
 */
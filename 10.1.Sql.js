//sql with sequalize
//goal is to store data and make it easily accessible
//sql is structured query language
//sql tables{records{rows}, feilds{id,email,name}}
//sql is a relation based database(one to one, one to many, many to many)
//we have a strong data schema (what are we storing and the types and all data has to fit the schema)
//select * from users where age > 28


///using mysql2 npm install --save mysql2


//connecting to the database 
const mysql = require('mysql2');
//we should have a connection for every query, this will be tiresome
// so we make a pool of connections and we will be able to make simultaneously queries
//creating  a connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-comolete',
    password: '123456789'
});
//we then export it as a promise 
// module.exports = pool.promise(); //to allow us to work async

const db = pool.promise();


//methods 
function fetchAll() {
    //we return a promise so we can await the results wherever we need the data
    return db.execute('SELECT * FROM products');
};

//logic with fetching data
async function logData() {
    const result = await fetchAll();
    //or 
    fetchAll().then(result => {
        console.log(result);
    });
    //since this is a mysql and the reuslt will be an array with two elements
    //the first is the array of rows and the second is array of metadata
    //we can use destructuring 
    fetchAll().then(([rows, metadata]) => {
        console.log(rows);
    });
};

function AddInstance(title, price, imageUrl, description) {
    return db.execute(`INSERT INTO products( title, price,imageUrl,description) VALUES ( ?,?,?,?)`, [title, price, imageUrl, description]);
    //we use ? to protect from sql injection
}

async function save() {
    AddInstance().then(() => {
        //add your logic like redirecting
    });
}
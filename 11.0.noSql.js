//sql has no schema
//tables are collections,
//in collections we have documents (document looks like javascript objects)
//we have to duplicated data to make relations
//it's faster but we deal with duplicates data
//noSql has no schema, no dataRelations
//horizontal and vertical scalling 
//horizontal scaling we simply add more service.we can do this infinitely.
//vertical scaling simply means that we make our existing server stronger by adding more Sibiu or memory


//creating a mongoDB, it'll become one line with mongoose
const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
    MongoClient.connect(
            'mongodb+srv://maximilian:9u4biljMQc4jjqbe@cluster0-ntrwp.mongodb.net/shop?retryWrites=true'
        )
        .then(client => {
            console.log('Connected!');
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

const getDb = require('../util/database').getDb;
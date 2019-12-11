////enviroment  //look below for storing sensitive data in the environment
/**
 * We can detect the environment in which our Node application is running
(development, production, etc) using process.env.NODE_ENV and
app.get(‘env’)
The config package gives us an elegant way to store configuration settings for
our applications.
- We can use the debug package to add debugging information to an application.
Prefer this approach to console.log() statements.
- To return HTML markup to the client, use a templating engine. There are various
templating engines available out there. Pug, EJS and Mustache are the most
popular ones. 
 */
//process.env.NODE_ENV
//if we don't set it, app.get('env') will return 'development by default
//but process.env.NODE_ENV will return undefined

if (app.get('env') === 'development') {
    //we can put here all the dev dependencies 
    app.use(morgan('tiny'));
    console.log("morgan enabled");

}

//we can set our enviroment variable from terminal 
//set NODE_ENV = production

//configuration and settings and overriding them
//managing configuration 
//using npm config
//$ npm install config
// $ mkdir config
// $ vi config/default.json //make a config folder and add default.json file

//default.json file
{
    "name": "defaultname",
    // Customer module configs
    "Customer": {
        "dbConfig": {
            "host": "localhost",
            "port": 5984,
            "dbName": "customers"
        },
        "credit": {
            "initialLimit": 100,
            // Set low for development
            "initialDays": 1
        }
    }
}

// $ vi config/production.json
{
    "name": "productionName",
    "Customer": {
        "dbConfig": {
            "host": "prod-db-server"
        },
        "credit": {
            "initialDays": 30
        }
    }
}
//config/development.json
{
    "name": "developmentName",
    "Customer": {
        "dbConfig": {
            "host": "dev-db-server"
        },
        "credit": {
            "initialDays": 30
        }
    }
}

const config = require('config');
//...

//now depending on my enviroment config.get will get different values 
//if i make set NODE_ENV = production, config.get will use the one in production.json and so force

const dbConfig = config.get('Customer.dbConfig');
db.connect(dbConfig, ...);

if (config.has('optionalFeature.detail')) {
    const detail = config.get('optionalFeature.detail');
    //...
}

///////////////////////IMPORTANT//////////////////////
/**
 * we shouldn't store application secrets in config files 
 * like the database password or the mail server because this will be put in a repo
 * these secrets will be visible 
 * we deal with these secrets with environment variables 
 */
//setting an enviroment variable called MyDataBasePassword
//in the terminal set MyDataBasePassword = 1234
//we may have as many of them and 
//or we can store them in custom-environment-variables.json //name is important 
//in this file we define the mapping of configuration setting to environmental variables
//we don't need the other properties, only the mapping of configuration setting to environmental variables
//we can access it via config.get("Customer.dbConfig.password");
{
    "Customer": {
        "dbConfig": {
            "password": MyDataBasePassword
        }
    }
}
//a func  that returns a promise to write a file or read files
const fs = require('fs');

function ReadFile(filename) {
    let filepath = "./" + filename;
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, { encoding: 'ascii' }, (err, res) => {
            if (err) {
                reject(err);
            } else {
                let y = JSON.parse(res);
                // console.log(y);
                resolve(y);
            }
        });
    });
}


function WriteFile(filename, data) {
    let filepath = "./" + filename;
    let x = JSON.stringify(data);
    return new Promise((resolve, reject) => {

        fs.writeFile(filepath, x, (err) => {
            reject(err);
        });

        resolve();
    });
}
//getting the route folder at any place
const path = require('path');

module.exports = path.dirname(process.mainModule.filename);


//getting a dummy user, putting it in the  request
//app is express(); sequelize is new Sequelize();
app.use((req, res, next) => {
    User.findById(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});
//we can chain multiple promises and only call catch once

sequelize
// .sync({ force: true })
    .sync()
    .then(result => {
        return User.findById(1);
        // console.log(result);
    })
    .then(user => {
        if (!user) {
            return User.create({ name: 'Max', email: 'test@test.com' });
        }
        return user;
    })
    .then(user => {
        // console.log(user);
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });

function turnDataIntoObject(data, numOfParams) {
    let dataArray = data.replace(/\n/g, ",").split(',');
    let myKeys = [];
    let myObj = [];
    for (let index = 0; index < numOfParams; index++) {
        myKeys.push(dataArray[index]);
    }
    dataArray.splice(0, numOfParams);

    for (let index = 0; index < dataArray.length;) {
        let x = {};
        for (let i = 0; i < myKeys.length; i++) {
            x[myKeys[i]] = dataArray[index];
            index++;
        }
        myObj.push(x);
    }
    return new Promise((resolve, reject) => {
        resolve(myObj);
    });
}
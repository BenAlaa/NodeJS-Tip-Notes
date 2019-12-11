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
// }
// WriteFile("loai", { data: ['reee'] });

// ReadFile("loai").then((res) => console.log(res));

module.exports = {
    ReadFile: ReadFile,
    WriteFile: WriteFile
};
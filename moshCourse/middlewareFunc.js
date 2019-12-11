let log = function(req, res, next) {
    console.log('logging');
    next();
};

let auth = function(req, res, next) {
    console.log('authenticating');
    next();
};
module.exports = {
    log: log,
    auth: auth
};
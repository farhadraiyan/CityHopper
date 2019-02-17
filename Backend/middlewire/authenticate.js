const jwt = require('jsonwebtoken');

const api = (request, response, next) => {
    next()
}

const checkJWT = async (req, res, next) => {
    next();
};

module.exports = {
    api,
    checkJWT,
}
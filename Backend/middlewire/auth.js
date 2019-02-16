const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKey = require('./../config/config')
module.exports = checkJWT = async function(req, res, next) {
  let passedToken = req.headers.authorization.split(' ')[1]
  let decodedToken = await jwt.verify(passedToken, privateKey)

  if (!decodedToken || decodedToken == '') {
    return res.status(403).send({
      message: 'Unauthorised Request',
      error: "Invalid JWT Token"
    })
  }
  next()
}

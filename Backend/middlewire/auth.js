const jwt = require('jsonwebtoken');
const privateKey = require('./../config/config')
module.exports = checkJWT = async function(req, res, next) {
  if(typeof req.headers.authorization !== 'string'){
    res.sendStatus(400);
    return;
  }
  let passedToken = req.headers.authorization.split(' ')
  if(passedToken.length < 2){
    res.sendStatus(400)
    return;
  }

  let token = passedToken[1]
  try {
    let decodedToken = await jwt.decode(token, privateKey)

    if (!decodedToken || decodedToken == '') {
      return res.status(403).send({
        message: 'Unauthorised Request',
        error: "Invalid JWT Token"
      })
    }
    next()
  } catch (error) {
    return res.status(403).send({
      message: 'Error Authenticating',
      error: "Check JWT"
    })
  }
}

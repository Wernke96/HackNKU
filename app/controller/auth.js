const jwt = require('jsonwebtoken');
const User = require('../Models/User');
require('dotenv').config()



function setUserInfo(request) {
  return {
    _id: request._id,
    username: request.username,
    
  };
}

exports.login = function login(req, res, next) {
    let username = req.body.user;
    let password = req.body.password;
    // For the given username fetch user from DB
 
    if (username && password) {
        let token = jwt.sign({username: username},
          process.env.JWT_KEY,
          { expiresIn: '24h' // expires in 24 hours
          }
        );
        // return the JWT token for the future API calls
        res.json({
          success: true,
          message: 'Authentication successful!',
          token: token
        });
    
    } else {
      res.sendStatus(400).json({
        success: false,
        message: 'Authentication failed! Please check the request'
      });
    }

    return next();
  };
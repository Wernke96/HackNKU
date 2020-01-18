const passport = require('passport');
require('dotenv').config();
const JwtStrategy = require('passport-jwt').Strategy; 
const User = require('../app/Models/User');
const LocalStrategy = require('passport-local').Strategy;

const localOptions = {
    usernameField: 'username',
  };
  
  const localLogin = new LocalStrategy(localOptions, ((username, password, done) => {
    User.findOne({
      username,
    }, (err, user) => {
      if (err) {
        return done(err);
      }
  
      if (!user) {
        return done(null, false, { error: 'Login failed. Please try again.' });
      }
  
      return user.comparePassword(password, (passwordErr, isMatch) => {
        if (passwordErr) {
          return done(passwordErr);
        }
  
        if (!isMatch) {
          return done(null, false, { error: 'Login failed. Please try again.' });
        }
  
        return done(null, user);
      });
    });
  }));

  const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies.token;
    }
    console.log(token);
    return token;
  };
  const jwtOptions = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_KEY,
  };

  const jwtLogin = new JwtStrategy(jwtOptions, ((payload, done) => {
    User.findById(payload._id, (err, user) => {
      if (err) {
        return done(err, false);
      }
  
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    });
  }));

passport.use(jwtLogin);
passport.use(localLogin);
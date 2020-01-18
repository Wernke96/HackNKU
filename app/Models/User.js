const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new mongoose.Schema({

  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required() { return this.local === true; },
  },
  local: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
});

UserSchema.pre('save', function preSaveUser(next) {
  const user = this;
  const SALT_FACTOR = 5;

  if (!user.isModified('password')) {
    return next();
  }

  return bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) {
      return next(err);
    }

    return bcrypt.hash(user.password, salt, null, (hashErr, hash) => {
      if (hashErr) {
        return next(hashErr);
      }

      user.password = hash;
      return next();
    });
  });
});

UserSchema.methods.comparePassword = function comparePassword(passwordAttempt, cb) {
  bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    return cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);

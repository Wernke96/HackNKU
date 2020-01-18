require('dotenv').config();
const mongoose = require('mongoose');

console.log(process.env.DB_URL);
mongoose.Promise = global.Promise;
const User = require('../app/models/user');

mongoose.connect(process.env.DB_URL);
const defaultAdminData = {
  username: 'admin',
  password: 'admin',
};

const adminUpdatePromise = User.findOne({ username: defaultAdminData.username })
  .exec().then((user) => {
    if (user) {
      user.password = defaultAdminData.password;
      user.markModified('password');
      user.role = defaultAdminData.role;
      user.markModified('role');
      return user.save();
    }
    return User.create(defaultAdminData);
  }).then(() => {
    console.log('Admin user successfully reset to defaults of: username: admin, password: admin, role: admin');
    return 0;
  })
  .catch((err) => {
    console.log('Error while creating or updateing admin user:');
    console.log(err);
  });

async function initializeDB() {
  const status = await adminUpdatePromise;
  console.log('Database initialization complete, shutting down.');
  mongoose.disconnect();
  process.exit(status);
  process.exitCode = status;
}

initializeDB();

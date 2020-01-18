require('dotenv').config();
// const router = require('./app/routes');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');


app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.listen(process.env.PORT||8080);
console.log(`App listening on port ${process.env.PORT}` || 8080);
// router(app);
mongoose.connect(process.env.DB_URL , {useNewUrlParser: true},function(err,db){
    console.log("connect");
    db.close;
});
mongoose.Promise = global.Promise;
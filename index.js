require('dotenv').config();
 const router = require('./app/routes/routes');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
// Send JSON responses
app.use(bodyParser.json());
// Escapes HTML in req.body and req.query, special config is needed for req.params,
// protection against stored xss

app.use(cookieParser());
app.use(cors());
app.use(cookieParser());
app.listen(process.env.PORT||8080);
app.use(cookieParser());


console.log(`App listening on port ${process.env.PORT}` || 8080);
router(app);
mongoose.connect(process.env.DB_URL , {useNewUrlParser: true},function(err,db){
    console.log("connect");
    db.close;
});
mongoose.Promise = global.Promise;
require('./app/controller/cron');
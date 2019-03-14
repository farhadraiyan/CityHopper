var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport')
const mongoose = require('mongoose')
const cors = require('cors')
var app = express();
//the cor has to be use before the route
app.use(cors());

// require passport config and user Model
require('./models/user');
require('./config/passport');
const config = require("./config/dbconfig")
//database setup
config.connectMlabDb()
    .then(() => console.log("connected to database"))
    .catch((err) => console.error("cannot connect to database", err))

var usersRoutes = require('./routes/users');
var carRoutes = require('./routes/car');
let placeRoutes = require('./routes/place');
let tripRoutes = require("./routes/trip");
let messageRoutes = require('./routes/message')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Passport Initializer
app.use(passport.initialize());

app.use('/user', usersRoutes);
app.use('/car', carRoutes);
app.use('/place', placeRoutes);
app.use('/trip', tripRoutes)
app.use('/message', messageRoutes)

module.exports = app;

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport')
require('./server');

// require passport config and user Model
require('./models/user');
require('./config/passport');

var usersRoutes = require('./routes/users');
var carRoutes = require('./routes/car');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Passport Initializer
app.use(passport.initialize());

app.use('/user', usersRoutes);
app.use('/car', carRoutes);

module.exports = app;

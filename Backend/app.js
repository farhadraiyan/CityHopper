var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./server');


var usersRoutes = require('./routes/users');
var carRoutes = require('./routes/car');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', usersRoutes);
app.use('/car', carRoutes);

module.exports = app;

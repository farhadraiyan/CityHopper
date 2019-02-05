/* required NPM */
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// const passport = require('passport')
//const dbUrl = 'mongodb://admin:admin123@ds131814.mlab.com:31814/cityhopper';
const dbUrl = 'mongodb://localhost/cityhopper';
const app = express();
// require passport config and user Model
//require('./models/user');
//require('./config/passport');


// use cross-origin domain
app.use(cors())
// Convert body to json object
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// // Passport Initializer
// app.use(passport.initialize());

// Connect to Database
mongoose.connect(dbUrl,{
    useNewUrlParser: true
})

//On Database connection return true
mongoose.connection.on('connected',()=>{
    console.log("Connected to Database")
})
// Or Return False
mongoose.connection.on('error', (err) => {
    if(err){
        console.log(`error connected to database --> ${err}`)
    }
})


module.exports = app;

/* required NPM */
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const dbUrl = 'mongodb://cityhopper:cityhopper1@ds113845.mlab.com:13845/capstone_project_db';

// use port 3000 or any enviroment variable port that is configured by host
const port = process.env.PORT || 3000;
const app = express();

// Require user
const userRouter = require('./routes/users')

// use cross-origin domain
app.use(cors())
// Convert body to json object
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', userRouter)

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


// Passport Initiaziation 
app.use(passport.initialize());
// Creates server and lisitens to port 3000
app.listen(port, () => {
    // callback to informe
    console.log(`listning to port ${port}`)
})


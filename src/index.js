const express = require('express')
const morgan = require('morgan')
const passport = require('passport')
const path = require('path')
const session = require('express-session')

// environment variables
const dotenv = require('dotenv')
dotenv.config()

// create app
const app = express();

// db connection
const { mongoose } = require('./database');

// settings 
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(session({
    secret: 'CAMBIAR',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())


// routes
//app.use('/api/tasks', require('./routes/task.routes'));

// static Files
app.use(express.static(path.join(__dirname, 'public')));;

// starting the server
app.listen(app.get('port'), () => {
    console.log(process.env.NODE_ENV)
    console.log(`Server on port ${app.get('port')}`);
});
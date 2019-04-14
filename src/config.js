const express = require('express')
const morgan = require('morgan')
const passport = require('passport')
const path = require('path')
const flash = require('connect-flash')
const createError = require('http-errors')

module.exports = app => {
    // environment variables
    const dotenv = require('dotenv')
    dotenv.config()

    // settings 
    app.set('port', process.env.PORT || 3000)

    // middlewares
    app.use(morgan('dev'))
    app.use(express.json())
    app.use(flash())
    require('./security/passport')
    app.use(passport.initialize())

    // static Files
    app.use(express.static(path.join(__dirname, 'public')))

    // routes
    app.use(process.env.API_PATH, require('./controllers/authentication.controller'))
    app.use('*', (req, res, next) => {
        if(!req.originalUrl.includes(process.env.API_PATH))
            res.sendFile(path.join(__dirname, 'public', 'index.html'))
        else
            next()
    })

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        next(createError(404))
    })

    // error handler
    app.use((err, req, res, next) => {
        console.log(err)
        res.status(err.status || 500).json(err);
    })

    return app
}
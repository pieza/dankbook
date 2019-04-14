const express = require('express')
const config = require('./config')

// create app
const app = config(express())

// db connection
require('./database')

// starting the server
app.listen(app.get('port'), () => {
    console.log(`server listening on port ${app.get('port')}`);
})
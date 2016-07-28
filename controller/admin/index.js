var app = require('express')();

app.use('/users',require('./UserController.js'));
module.exports = app;

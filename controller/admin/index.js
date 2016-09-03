var app = require('express')();

app.use('/users',require('./UserController.js'));
app.use('/tests',require('./TestController.js'));
app.use('/labs',require('./LabController.js'));
app.use('/categories',require('./CategoryController.js'));
module.exports = app;

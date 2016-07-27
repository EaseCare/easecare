var app = require('express')();

app.use(require('./AuthenticationController.js'));
module.exports = app;

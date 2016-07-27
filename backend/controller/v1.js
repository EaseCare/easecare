/**
 * New node file
 */

var app = require("express")();

app.use('/security', require('./security'));
app.use('/admin', require('./admin'));

module.exports = app;

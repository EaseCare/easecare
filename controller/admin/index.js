var app = require('express')();

app.use('/users',require('./UserController.js'));
app.use('/tests',require('./TestController.js'));
app.use('/labs',require('./LabController.js'));
app.use('/categories',require('./CategoryController.js'));
app.use('/shoppingcart',require('./ShoppingCartController.js'));
app.use('/payment',require('./PaymentController.js'));
app.use('/orders',require('./OrderController.js'));
app.use('/offers',require('./OfferController.js'));
module.exports = app;

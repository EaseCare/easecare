/*var nodemailer = require('nodemailer');
var EmailTemplates = require('swig-email-templates');

// create template renderer
var templates = new EmailTemplates();

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'easecarelabs@gmail.com',
        pass: '9910215720i'
    }
});

// provide custom rendering function
var registerUser = transporter.templateSender({
    render: function(context, callback){
        templates.render('register.html', context, function (err, html, text) {
            if(err){
                return callback(err);
            }
            callback(null, {
                html: html,
                text: text
            });
        });
    }
});

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'easecarelabs@gmail.com', // sender address
    to: 's.karambeer@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world 🐴', // plaintext body
    html: '<b>Hello world 🐴</b>' // html body
};
module.exports.sendMail = function(cb) {
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return cb("Error sending mail",500);
        }
        console.log('Message sent: ' + info.response);
        return cb(null,200,{message:'mail send successfully'});
    });
}*/
'use strict';


var config = require('config/env/local.json').orion;
var nodemailer = require('nodemailer');
var path = require('path');
var templatesDir = path.resolve(__dirname, '..', 'mail/views/mailer');
console.log("templatesDir"+templatesDir);
var emailTemplates = require('email-templates');


var EmailAddressRequiredError = new Error('email address required');


// create a defaultTransport using gmail and authentication that are
// stored in the `config.js` file.
var defaultTransport = nodemailer.createTransport('SMTP', {
  service: 'Gmail',
  auth: {
    user: config.mailer.auth.user,
    pass: config.mailer.auth.pass
  }
});

exports.sendMail = function (templateName, locals, fn) {
  // make sure that we have an user email
  if (!locals.email) {
    return fn(EmailAddressRequiredError);
  }
  // make sure that we have a message
  if (!locals.subject) {
    return fn(EmailAddressRequiredError);
  }
  emailTemplates(templatesDir, function (err, template) {
    if (err) {
      //console.log(err);
      return fn(err);
    }
    // Send a single email
    template(templateName, locals, function (err, html, text) {
      if (err) {
        //console.log(err);
        return fn(err);
      }
      // if we are testing don't send out an email instead return
      // success and the html and txt strings for inspection
      if (process.env.NODE_ENV === 'test') {
        return fn(null, '250 2.0.0 OK 1350452502 s5sm19782310obo.10', html, text);
      }
      var transport = defaultTransport;
      transport.sendMail({
        from: config.mailer.defaultFromAddress, 
        to: locals.email,
        subject: locals.subject,
        html: html,
        // generateTextFromHTML: true,
        text: text
      }, function (err, responseStatus) {
        if (err) {
          return fn(err);
        }
        console.log("responseStatus i got here is "+JSON.stringify(responseStatus));
        return fn(null,200,{message:'mail send successfully'});
      });
    });
  });
}
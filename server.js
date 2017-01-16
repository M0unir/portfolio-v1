var gzippo = require('gzippo');
var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
// var nodemailer = require('nodemailer');
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {
    flags: 'a'
});

// setup the logger
app.use(morgan('combined', {
    stream: accessLogStream
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));




// MAIL SETTINGS
app.post('/send', function (req, res) {
    console.log(req.body);

    // SENDGRID MAILING
    var helper = require('sendgrid').mail;
    var from_email = new helper.Email(req.body.from);
    var to_email = new helper.Email("mounir.chouladi@gmail.com");
    var subject = "Hi";
    var name = req.body.name;
    var content = new helper.Content("text/plain", "Name: " + name + "\n \n Message: \n " + req.body.message);

    var mail = new helper.Mail(from_email, subject, to_email, content);
    // console.log(mail);

    var sg = require('sendgrid')("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");
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });

    sg.API(request, function (error, response) {
        console.log('STATUS ' + response.statusCode)
        console.log(response.body)
        console.log(response.headers)
    });


});





// EXPRESS ROUTING

app.use('/scripts', express.static(__dirname + '/dist/scripts/'));
app.use('/dist', express.static(__dirname + '/dist/'));
app.use('/styles', express.static(__dirname + '/dist/styles'));
// app.use('/partials', express.static(__dirname + 'dist/partials'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));

app.all('/*', function (req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('/dist/index.html', {
        root: __dirname
    });
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Express Started on Port 3000");
});

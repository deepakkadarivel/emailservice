const express = require("express");
var bodyParser = require("body-parser");
var nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((request, response, next) => {
  console.log(request.headers);
  next();
});

app.use((request, response, next) => {
  request.chance = Math.random();
  next();
});

app.get("/", (request, response) => {
  response.json({
    chance: request.chance
  });
});

app.post("/mail", (req, res) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var role = req.body.role;
  var usage = req.body.usage;
  var contactDetail = req.body.contactDetail;
  var dateOption1 = req.body.dateOption1;
  var dateOption2 = req.body.dateOption2;
  var how = "";
  
  const msg = {
      to: "deepak.kadarivel@gmail.com",
      from: "test@zinclearninglabs.com",
      subject: "Signup for a demo request.",
      text: "A new user has requested for a demo.",
      html: "<strong>First name</strong>" + firstName + "</br>" +
      "<strong>Last name: </strong>" + lastName + "</br>" +
      "<strong>Email: </strong>" + email + "</br>" +
      "<strong>Role: </strong>" + role + "</br>" +
      "<strong>Usage: </strong>" + usage + "</br>" +
      "<strong>Contact detail: </strong>" + contactDetail + "</br>" +
      "<strong>date option #1</strong>" + dateOption1 + "</br>" +
      "<strong>date option #2</strong>" + dateOption2 + "</br>" +
      "<strong>dHow do you know us: </strong>" + how + "</br>" 
    };
    sendMail(msg);
    res.end("yes");
});

function sendMail(data) {
    console.log('Starting mail server');
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'zinclabtest@gmail.com',
          pass: 'Y0uKn0wIt'
        }
      });
      
      var mailOptions = {
        from: 'zinclabtest@gmail.com',
        to: 'zinclabtest@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

app.listen(3033);

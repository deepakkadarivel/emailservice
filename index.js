var express = require("express");
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");

var app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/", function(request, response) {
  console.log(request.body); // your JSON
  sendMail(request.body);
  response.send(request.body); // echo the result back
});

function sendMail(data) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "zinclabtest@gmail.com",
      pass: "Y0uKn0wIt"
    }
  });

  var mailOptions = {
    from: "zinclabtest@gmail.com",
    to: "PARTNERSHIPS@ZINCLEARNINGLABS.COM",
    subject: "Signup demo request.",
    text: "A new user has requested for a signup demo.",
    html:
      "<p><strong>First name: </strong>" +
      data.firstName +
      "</p>" +
      "<p><strong>Last name: </strong>" +
      data.lastName +
      "</p>" +
      "<p><strong>Email: </strong>" +
      data.email +
      "</p>" +
      "<p><strong>Role: </strong>" +
      data.role +
      "</p>" +
      "<p><strong>Usage: </strong>" +
      data.usage +
      "</p>" +
      "<p><strong>Contact detail: </strong>" +
      data.contactDetail +
      "</p>" +
      "<p><strong>date option #1: </strong>" +
      data.dateOption1 +
      "</p>" +
      "<p><strong>time option #1: </strong>" +
      data.timeOption1 +
      "</p>" +
      "<p><strong>date option #2: </strong>" +
      data.dateOption2 +
      "</p>" +
      "<p><strong>time option #2: </strong>" +
      data.timeOption2 +
      "</p>" +
      "<p><strong>How do you know us: </strong>" +
      data.how +
      "</p>"
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

app.listen(3000);

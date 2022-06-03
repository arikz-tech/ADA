const url = "http://localhost:8080";
const { createHash } = require("crypto");

var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var path = require("path");
var bodyParser = require("body-parser"); //parse request parameters
var nodemailer = require("nodemailer");
const fetch = require('node-fetch');

waitForVerifyUsers = [];
resetPasswordUsers = [];

var transporter = nodemailer.createTransport({
  service: "yahoo",
  auth: {
    user: "adaserver2022@yahoo.com",
    pass: "wgvtvslebuhorpkt",
  },
});

var dbURI =
  "mongodb+srv://Ada:server1234@cluster0.6afznb2.mongodb.net/?retryWrites=true&w=majority";
var mongoose = require("mongoose");
const { on } = require("events");
var db = mongoose
  .connect(dbURI)
  .then((result) => console.log("DB connected"))
  .catch((err) => console.log(err));

app.use(express.static(__dirname)); //specifies the root directory from which to serve static assets [images, CSS files and JavaScript files]
app.use(bodyParser.urlencoded({ extended: true })); //parsing bodies from URL. extended: true specifies that req.body object will contain values of any type instead of just strings.
app.use(bodyParser.json()); //for parsing json objects

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  promocode: {
    type: String,
  },
});

const User = mongoose.model("Users", userSchema);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/homePage.html"));
});

app.get("/log-in", function (req, res) {
  res.sendFile(path.join(__dirname + "/login.html"));
});

app.get("/sign-up", function (req, res) {
  res.sendFile(path.join(__dirname + "/sign-up.html"));
});

app.get("/dashboard", function (req, res) {
  res.sendFile(path.join(__dirname + "/dashboard.html"));
});

app.get("/changePassword", function (req, res) {
  res.sendFile(path.join(__dirname + "/change-password.html"));
});

app.post("/login", async (req, res) => {
  var loginUser = req.body.loginUser;
  var email = loginUser.email;
  var password = loginUser.password;
  var captcha =req.body.captcha
  
  

  if (!req.body.captcha){
    res.send({ message:'Failed captcha verification' , user: undefined  });
    return 
  }
  

  // Secret key
  const secretKey = '6Lc0PjIgAAAAADxlGUoca60XE8-qspODpbRJrO0t';

  // Verify URL
  const query = JSON.stringify({
    secret: secretKey,
    response: req.body.captcha,
    remoteip: req.connection.remoteAddress
  });
  const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`;

  // Make a request to verifyURL
  const urlResult = await fetch(verifyURL).then(res => res.json());

  // If not successful
  if (urlResult.success !== undefined && !urlResult.success){
    res.send({ message:'Failed captcha verification' , user: undefined  });
    return
  } 

  //serching for the user in the db
  User.findOne({ email: email }).then((result) => {
    if (result === null) {
      res.send({ message: "User not found", user: undefined });
      return;
    }

    var dbPassword = result.password;
    var inputPassword = createHash("sha256").update(password).digest("hex");

    if (dbPassword === inputPassword) {
      res.send({ message: "Login succeed", user: result });
      return
    } else {
      res.send({ message: "Incorrect password", user: undefined });
    }
  });
});

app.post("/register", (req, res) => {
  newUser = req.body.user;
  password=newUser.password;
  re_password=newUser.repeatPassword;
  first_name=newUser.firstName;
  last_name=newUser.lastName;
  email=newUser.email;
  console.log(email);  
  var password_regex= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}/;
  var only_letters_regex =/^[a-zA-Z\s]+$/
  var email_regex=  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

  if(!(only_letters_regex.test(first_name))){
    res.send({msg:"First name should include only letters",is_pass:false})
    return;
  }

  if(!(only_letters_regex.test(last_name))){
    res.send({msg:"Last name should include only letters",is_pass:false})
    return;
  }

  if(!email.match(email_regex)){
    res.send({msg:"Please enter correct email",is_pass:false});
    return;
  }

  if(!password.match(password_regex)){
    res.send({msg:"Password must be at least 6 characters long and include at least 1 number",is_pass:false});
    return;
  }
  if(password!==re_password){
    res.send({msg:"Password dosent match",is_pass:false});
    return;
  }

  const user = new User({
    firstname: newUser.firstName,
    lastname: newUser.lastName,
    email: newUser.email,
    password: createHash("sha256").update(newUser.password).digest("hex"),
    promocode: newUser.promoCode,
  });
  var token = createHash("sha256").update(newUser.email).digest("hex");
  var link = url + "/emailVerification?token=" + token;

  var mailOptions = {
    from: "adaserver2022@yahoo.com",
    to: newUser.email,
    subject: "Verification new user",
    text: "In order to create your new user, click on this link " + link,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  waitForVerifyUsers.push({ key: token, value: user });
});

app.get("/emailVerification", function (req, res) {
  var token = req.query.token;
  var user = waitForVerifyUsers.find((user) => user.key === token);
  if (typeof user === "undefined") {
    res.send("Verification Error");
    return;
  }
  user.value.save();
  var removeIndex = waitForVerifyUsers
    .map((user) => {
      return user.key;
    })
    .indexOf(token);
  waitForVerifyUsers.splice(removeIndex, 1);
  res.send("Successfuly created");
});

app.post("/forgotPassword", (req, res) => {
  var email = req.body.email;
  var token = createHash("sha256").update(email).digest("hex");
  User.findOne({ email: email }).then((result) => {
    if (result === null) {
      console.log("user not found");
      res.send({ message: "User not found", user: undefined });
      return;
    }
    resetPasswordUsers.push({ key: token, value: result });
  });

  var link = url + "/changePassword?token=" + token;

  var mailOptions = {
    from: "adaserver2022@yahoo.com",
    to: email,
    subject: "Reset your password",
    text: "In order to rest you password, click on this link " + link,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  return;
});

app.post("/updatePassword", function (req, res) {
  var token = req.body.token;
  var password = req.body.password;

  var user = resetPasswordUsers.find((user) => user.key === token);
  if (typeof user === "undefined") {
    res.send("Verification Error");
    return;
  }

  User.updateOne(
    { email: user.value.email },
    { password: createHash("sha256").update(password).digest("hex") },
    { multi: true },
    (err, numberAffected) => {}
  );

  var removeIndex = resetPasswordUsers
    .map((user) => {
      return user.key;
    })
    .indexOf(token);
  resetPasswordUsers.splice(removeIndex, 1);
  res.send("Password Successfully Changed");
});

app.listen(port);
console.log("Server started! At " + url);

var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var path = require("path");
var bodyParser = require("body-parser"); //parse request parameters
const { createHash } = require("crypto");

var dbURI =
  "mongodb+srv://Ada:server1234@cluster0.6afznb2.mongodb.net/?retryWrites=true&w=majority";
var mongoose = require("mongoose");
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
    required: true,
  },
});

const User = mongoose.model("Users", userSchema);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/homePage.html"));
});

app.get("/log-in", function (req, res) {
  res.sendFile(path.join(__dirname + "/log-in.html"));
});

app.get("/sign-up", function (req, res) {
  res.sendFile(path.join(__dirname + "/sign-up.html"));
});

app.get("/dashboard", function (req, res) {
  res.sendFile(path.join(__dirname + "/dashboard.html"));
});

app.post("/login", (req, res) => {
  var loginUser = req.body.loginUser;
  var email = loginUser.email;
  var password = loginUser.password;

  User.findOne({ email: email }).then((result) => {
    if (result === null) {
      console.log("check");
      res.send({ message: "User not found", user: undefined });
      return;
    }

    var dbPassword = result.password;
    var inputPassword = createHash("sha256").update(password).digest("hex");

    if (dbPassword === inputPassword) {
      res.send({ message: "login succeed", user: result });
    } else {
      res.send({ message: "incorrect password", user: undefined });
    }
  });
});

app.post("/register", (req, res) => {
  newUser = req.body.user;
  const user = new User({
    firstname: newUser.firstName,
    lastname: newUser.lastName,
    email: newUser.email,
    password: createHash("sha256").update(newUser.password).digest("hex"),
    promocode: newUser.promoCode,
  });
  user.save();
});

app.get("/test_data_transfer", function (req, res) {
  res.send(test_data.toString());
});

app.listen(port);
console.log("Server started! At http://localhost:" + port);

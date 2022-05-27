var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var path = require("path");
var bodyParser = require("body-parser"); //parse request parameters

app.use(express.static(__dirname)); //specifies the root directory from which to serve static assets [images, CSS files and JavaScript files]
app.use(bodyParser.urlencoded({ extended: true })); //parsing bodies from URL. extended: true specifies that req.body object will contain values of any type instead of just strings.
app.use(bodyParser.json()); //for parsing json objects

var test_data = [
  ["user1", "password1"],
  ["user2", "password2"],
];

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
app.post("/register", (req, res) => {
  user = req.body.user;
  console.log("check");
  console.log(JSON.stringify(user));
  //res.send("user: " + req.body.user + " password: " + req.body.password);
});

app.get("/test_data_transfer", function (req, res) {
  res.send(test_data.toString());
});

app.listen(port);
console.log("Server started! At http://localhost:" + port);

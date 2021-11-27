const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

//specified the static file folder;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    let firstName = req.body.fName;
    let lastName = req.body.lName;
    let email = req.body.email;
    console.log(firstName, lastName, email);
});

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});
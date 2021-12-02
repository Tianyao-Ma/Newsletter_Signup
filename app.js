const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require('https');
const { response } = require("express");

const app = express();

//specified the static file folder;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    
    const data = {
        members: [
            {
                email_address: email, 
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ] 
    };

    const jsonData = JSON.stringify(data);
    const url =  "https://us20.api.mailchimp.com/3.0/lists/86e2d25a72";

    const options = {
        method: "POST", 
        auth: "tm:ac63c745993f9cdeab8a4ee45f7b4953-us20"
    }

    const request = https.request(url, options, function(response) {
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});


// API key
//ac63c745993f9cdeab8a4ee45f7b4953-us20

// list id
//86e2d25a72
const bodyParser = require("body-parser");
const express = require ("express");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname+ "/signup.html");
});

app.post("/",function(req,res){
  const firstName = req.body.Fname;
  const lastName = req.body.Lname;
  const emailAddress = req.body.email;

  const data = {
    members: [
      {
        email_address: emailAddress,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url ="https://us12.api.mailchimp.com/3.0/lists/5492e03555"

  const options = {
    method: "POST",
    auth: "Apryan:c6abdca2d4ba0c52d3b43d42785b3a3e-us12"
  }

  const request = https.request(url, options, function(response){
    if (response.statusCode===200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }



    response.on("data", function(data){
      console.log(JSON.parse(data));
    })

  })
  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req,res){
  res.redirect("/");
})

app.post("/success", function(req, res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});

//API KEY
//c6abdca2d4ba0c52d3b43d42785b3a3e-us12

//AUDIENCE ID
//5492e03555

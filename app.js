const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

// To use static pages in the live server
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/signUp.html')
});

app.post('/', function(req, res) {
  const FNAME = req.body.fname;
  const LNAME = req.body.lname;
  const CONTACT = req.body.contact;
  const Email = req.body.email;
  // console.log(FNAME, LNAME, CONTACT, Email);

  const data = {
    members: [{
      email_address: Email,
      status: 'subscribed',
      merge_fields: {
        FNAME: FNAME,
        LNAME: LNAME,
        PHONE: CONTACT
      }
    }]
  };

  const jsonData = JSON.stringify(data);
  url = "https://us10.api.mailchimp.com/3.0/lists/8484c9a0e3/"
  options = {
    auth: 'Shanky:c3407dcf676a26b073b88b6cd065ca93-us10',
    method: 'POST'
  };

  const request = https.request(url, options, function(response) {
    console.log('status code : ', response.statusCode);
    // console.log('headers : ', response.headers);
    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html")
    }else{
      res.sendFile(__dirname + "/failure.html");
    }

    response.on('data', function(data) {
      console.log(JSON.parse(data));
    })

  })
  request.write(jsonData);
  request.end();

})

app.listen(3000, function() {
  console.log("Server is running on port 3000");
})





// API Key : c3407dcf676a26b073b88b6cd065ca93-us10
// List ID / Audience ID : 8484c9a0e3

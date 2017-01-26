//Checking if git to server works
//
//
var path = require('path');

var express = require('express');
var https = require('https');
var fs = require('fs');

var options = {
  cert: fs.readFileSync('client-cert.pem'),
  key: fs.readFileSync('client-key.pem')
};

app = express()

app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname + '/geoLocation.html'));
});

var server = https.createServer(options, app);

server.listen(8001, function(){
    console.log("server running at https://IP_ADDRESS:8001/")
});


/*
How to make SSL certificate
openssl genrsa -out client-key.pem 2048
openssl req -new -key client-key.pem -out client.csr
openssl x509 -req -in client.csr -signkey client-key.pem -out client-cert.pem
*/
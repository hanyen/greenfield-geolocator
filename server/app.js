
var express = require('express');
var path = require('path');
var https = require('https');
var fs = require('fs');
var bodyParser = require('body-parser');


var options = {
  cert: fs.readFileSync(path.join(__dirname, '/../client/ssl-certificate/client-cert.pem')),
  key: fs.readFileSync(path.join(__dirname, '/../client/ssl-certificate/client-key.pem'))
};

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/bower_components', express.static(path.join(__dirname, '/../client/bower_components')));
app.use('/css', express.static(path.join(__dirname, '/../client/css')));
app.use('/scripts', express.static(path.join(__dirname, '/../client/scripts')));
app.use('/partials', express.static(path.join(__dirname + '/../client/partials')));
app.use('/images', express.static(path.join(__dirname + '/../client/images')));

app.get('/', function(req,res) {
  console.log('serving request ' + req.method + ' at ' + req.url);
  res.sendFile(path.join(__dirname + '/../client/index.html'));
});

app.post('/', function(req,res) {
  console.log('serving request ' + req.method + ' at ' + req.url);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.statusCode = 204;
  res.end();
});

app.get('/signup', function(req,res) {
  console.log('serving request ' + req.method + ' at ' + req.url);
  res.sendFile(path.join(__dirname + '/../client/index.html'));
});

var server = https.createServer(options, app);

server.listen(8001, '127.0.0.1', function(){
    console.log("server running at https://IP_ADDRESS:8001/");
});


/*
How to make SSL certificate
openssl genrsa -out client-key.pem 2048
openssl req -new -key client-key.pem -out client.csr
openssl x509 -req -in client.csr -signkey client-key.pem -out client-cert.pem
*/
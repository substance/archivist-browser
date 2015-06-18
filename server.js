var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var _ = require("underscore");
var fs = require('fs');

var browserify = require('browserify-middleware');

var path = require("path");

var app = express();

var port = process.env.PORT || 4001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

// On the fly browserify-ication of browser
app.get('/archivist_browser.js', browserify('./boot.js', {cache: false}));

app.get('/archivist_browser.css', function(req, res) {
  var cssFile = fs.readFileSync('./styles/archivist_browser.css', 'utf8');

  res.set('Content-Type', 'text/css');

  res.send(cssFile);
});


app.use(express.static(__dirname));

// Serve Archivist browser in dev mode
// --------

http.createServer(app).listen(port, function(){
  console.log("Archivist browser is running on port " + port);
  console.log("http://127.0.0.1:"+port+"/");
});
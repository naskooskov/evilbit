var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');

var creds = require('./creds');

var credentials = {};
var app = express();
app.use(express.static('./webroot/'));


function sni(name) {
  var creds = credentials[name];
  if (creds && 'context' in creds) {
    return creds.context;
  }
}

function start(httpPort, httpsPort, devLogger) {
  var options = {
    key: fs.readFileSync('keys/evilbit.io.key'),
    cert: fs.readFileSync('certs/evilbit.io.certs'),
    SNICallback: sni,
  };
  
  if (devLogger) {
    app.use(express.logger('dev'));
  } else {
    var logFile = fs.createWriteStream('./log', {flags: 'a'});
    app.use(express.logger({stream: logFile}));
  }

  credentials = creds.init();

  http.createServer(app).listen(httpPort);
  https.createServer(options, app).listen(httpsPort);
}

exports.start = start;

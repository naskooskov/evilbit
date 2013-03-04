var crypto = require('crypto');
var fs = require('fs');

function initCreds() {
  var credsMap = {};

  credsMap['selfsigned.evilbit.io'] = crypto.createCredentials({
		key: fs.readFileSync('./keys/selfsigned.key'),
		cert: fs.readFileSync('./certs/selfsigned.cert'),
  });

  return credsMap;
}

exports.init = initCreds;

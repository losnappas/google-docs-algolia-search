const { auth: gAuth } = require('@googleapis/docs');
const path = require('path');

module.exports.googleAuth = scopes =>
  new gAuth.GoogleAuth({
    keyFile: path.join(__dirname, '../google-service-account.json'),
    scopes,
  }).getClient();

var google = require('googleapis');

var clientKey = require('../config/googleClientSecret.json');

var OAuth2 = google.auth.OAuth2;

class GoogleOAuthClient {

  constructor() {
    var redirectUri = clientKey.web.redirect_uris[1];
    if (process.env.NODE_ENV !== 'production') {
      redirectUri = clientKey.web.redirect_uris[2];
    }
    this.client = new OAuth2(
      clientKey.web.client_id,
      clientKey.web.client_secret,
      redirectUri
    );
  }

  getClient() {
    return this.client;
  }

  isAuthenticated() {
    return Boolean(this.client.credentials && this.client.credentials.expiry_date);
  }
}

module.exports = new GoogleOAuthClient();
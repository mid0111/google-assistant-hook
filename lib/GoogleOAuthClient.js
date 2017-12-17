var google = require('googleapis');

var clientKey = require('../config/googleClientSecret.json');

var OAuth2 = google.auth.OAuth2;

class GoogleOAuthClient {

  constructor() {
    this.client = new OAuth2(
      clientKey.web.client_id,
      clientKey.web.client_secret,
      clientKey.web.redirect_uris[1]
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
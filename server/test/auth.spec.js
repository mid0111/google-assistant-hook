const assert = require('assert');
const sinon = require('sinon');

const Request = require('./lib/request');
const GoogleOAuthClient = require('../lib/GoogleOAuthClient');

describe('/auth/google', () => {
  const request = new Request();
  it('Google　OAuth ページにリダイレクトされること', (done) => {
    request
      .get('/auth/google')
      .expect('Location', /https:\/\/accounts.google.com/)
      .expect(302)
      .end(done);
  });
});

describe('/auth/google/callback', () => {
  const request = new Request();
  let sandbox = null;
  const mockTokens = {
    'access_token': '1234.access_token',
    'refresh_token': 'refresh_token',
    'token_type': 'Bearer',
    'expiry_date': 1515472892105
  };

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => sandbox.restore());

  it('トークンが取得できた場合トップページにリダイレクトされること', (done) => {
    var oauth2Client = GoogleOAuthClient.getClient();
    sandbox.stub(oauth2Client, 'getToken')
      .callsFake((code, callback) => callback(null, mockTokens));

    request
      .get('/auth/google/callback?code=1234567890')
      .expect('Location', '/')
      .expect(302)
      .end(done);
  });

  it('トークンの取得に失敗した場合 500 エラーとなること', (done) => {
    request
      .get('/auth/google/callback')
      .expect(500)
      .expect((res) => {
        assert.deepEqual(res.body, {
          message: 'invalid_request',
          error: {
            code: 400
          }
        });
      })
      .end(done);
  });
});

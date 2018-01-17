const assert = require('assert');
const sinon = require('sinon');

const Request = require('../lib/request');
const GoogleOAuthClient = require('../../lib/GoogleOAuthClient');

describe('/api/rebuild', () => {
  const request = new Request();
  let sandbox = null;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => sandbox.restore());

  it('プロファイル情報の取得ができること', (done) => {
    request
      .get('/api/profile')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        assert.deepStrictEqual(res.body, {
          authenticated: false
        });
      })
      .end(done);
  });

  it('ログイン済みの場合プロファイル情報の取得ができること', (done) => {
    sandbox.stub(GoogleOAuthClient, 'isAuthenticated').returns(true);

    request
      .get('/api/profile')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        assert.deepStrictEqual(res.body, {
          authenticated: true
        });
      })
      .end(done);
  });
});

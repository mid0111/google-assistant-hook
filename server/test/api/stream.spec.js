const assert = require('assert');
const googleHome = require('google-home-notifier');

const Request = require('../lib/request');

describe('/api/stream', () => {
  const request = new Request();

  const streamRootUrl = 'http://dummy.com';
  const streamPath = '/stream';

  beforeEach(() => {
    request.sandbox.stub(googleHome, 'play').callsFake((url, callback) => callback('notify'));
  });

  it('ストリームの再生ができること', (done) => {
    request.nock(streamRootUrl)
      .get(streamPath)
      .reply(200);

    request
      .post('/api/stream')
      .send({
        url: streamRootUrl + streamPath
      })
      .expect(206)
      .expect((res) => {
        assert.deepStrictEqual(res.body, {});
      })
      .end(done);
  });

  it('ストリーム URL の指定がない場合 400 エラーとなること', (done) => {
    request
      .post('/api/stream')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect((res) => {
        assert.deepStrictEqual(res.body, {
          message: 'Stream url is required.'
        });
      })
      .end(done);
  });

  it('指定された URL の存在チェックで HTTP エラーとなった場合ステータスコードが引き継がれること', (done) => {
    request.nock(streamRootUrl)
      .get(streamPath)
      .reply(404);

    request
      .post('/api/stream')
      .send({
        url: streamRootUrl + streamPath
      })
      .expect(404)
      .expect((res) => {
        assert.deepStrictEqual(res.body, {
          message: 'Not Found'
        });
      })
      .end(done);
  });

  it('指定された URL の存在チェックでエラーとなった場合 503 エラーとなること', (done) => {
    request
      .post('/api/stream')
      .send({
        url: `://dummy.com ${streamPath}`
      })
      .expect(503)
      .expect((res) => {
        assert.deepStrictEqual(res.body, {
          message: 'Invalid URI "://dummy.com%20/stream"'
        });
      })
      .end(done);
  });

});

const assert = require('assert');

const FirebaseClient = require('../../lib/FirebaseClient');
const Request = require('../lib/request');

describe('/api/shortcut', () => {
  const request = new Request();

  it('ショートカット一覧取得ができること', (done) => {
    const mockData = {
      on: [
        'tv',
        'light'
      ],
      off: [
        'audio',
        'light'
      ]
    };
    request.sandbox.stub(FirebaseClient, 'get')
      .callsFake((path, callback) => callback(null, mockData));

    request
      .get('/api/shortcut')
      .expect(200)
      .expect((res) => {
        assert.deepStrictEqual(res.body, {
          shortcuts: [{
              name: 'on',
              data: mockData.on
            },
            {
              name: 'off',
              data: mockData.off
            }
          ]
        });
      })
      .end(done);
  });

  it('ショートカット一覧取得でエラーが発生した場合 500 エラーとなること', (done) => {
    const mockError = new Error('test error');
    request.sandbox.stub(FirebaseClient, 'get')
      .callsFake((path, callback) => callback(mockError));

    request
      .get('/api/shortcut')
      .expect(500)
      .expect((res) => {
        assert.deepStrictEqual(res.body, {
          message: mockError.message
        });
      })
      .end(done);
  });

  it('ショートカット１件取得ができること', (done) => {
    const mockData = [
      'tv',
      'light'
    ];
    request.sandbox.stub(FirebaseClient, 'get')
      .callsFake((path, callback) => callback(null, mockData));

    request
      .get('/api/shortcut/on')
      .expect(200)
      .expect((res) => {
        assert.deepStrictEqual(res.body, {
          shortcut: {
            name: 'on',
            data: mockData
          }
        });
      })
      .end(done);
  });

  it('ショートカット１件取得で該当データが存在しない場合 null となること', (done) => {
    const mockData = null;
    request.sandbox.stub(FirebaseClient, 'get')
      .callsFake((path, callback) => callback(null, mockData));

    request
      .get('/api/shortcut/on')
      .expect(200)
      .expect((res) => {
        assert.deepStrictEqual(res.body, {
          shortcut: {
            name: 'on',
            data: mockData
          }
        });
      })
      .end(done);
  });

  it('ショートカット１件取得でエラーが発生した場合 500 エラーとなること', (done) => {
    const mockError = new Error('test error');
    request.sandbox.stub(FirebaseClient, 'get')
      .callsFake((path, callback) => callback(mockError));

    request
      .get('/api/shortcut/on')
      .expect(500)
      .expect((res) => {
        assert.deepStrictEqual(res.body, {
          message: mockError.message
        });
      })
      .end(done);
  });

  it('ショートカット更新ができること', (done) => {
    const requestData = [
      'tv',
      'light'
    ];
    request.sandbox.stub(FirebaseClient, 'set')
      .callsFake((path, name, data, callback) => callback(null));

    request
      .put('/api/shortcut/on')
      .send({
        data: requestData
      })
      .expect(200)
      .expect((res) => {
        assert.deepStrictEqual(res.body, {
          shortcut: {
            name: 'on',
            data: requestData
          }
        });
      })
      .end(done);
  });

  it('ショートカット更新でエラーが発生した場合 500 エラーとなること', (done) => {
    const requestData = [
      'tv',
      'light'
    ];
    const mockError = new Error('test error');
    request.sandbox.stub(FirebaseClient, 'set')
      .callsFake((path, name, data, callback) => callback(mockError));

    request
      .put('/api/shortcut/on')
      .send({
        data: requestData
      })
      .expect(500)
      .expect((res) => {
        assert.deepStrictEqual(res.body, {
          message: mockError.message
        });
      })
      .end(done);
  });
});

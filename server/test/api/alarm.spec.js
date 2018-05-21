const assert = require('assert');

const FirebaseClient = require('../../lib/FirebaseClient');
const Request = require('../lib/request');

describe('/api/alarm', () => {
  const request = new Request();

  it('Alarm 一覧取得ができること', (done) => {
    const now = new Date().getTime();
    const mockData = [{
        time: now,
        message: 'サンプルメッセージ１'
      },
      {
        time: now + 100,
        message: 'サンプルメッセージ２'
      }
    ];
    request.sandbox.stub(FirebaseClient, 'get')
      .callsFake((path, callback) => callback(null, mockData));

    request
      .get('/api/alarm')
      .expect(200)
      .expect((res) => {
        assert.deepStrictEqual(res.body, {
          alarms: [{
              time: now,
              message: 'サンプルメッセージ１'
            },
            {
              time: now + 100,
              message: 'サンプルメッセージ２'
            }
          ]
        });
      })
      .end(done);
  });

  it('Alarm 一覧取得でエラーが発生した場合 500 エラーとなること', (done) => {
    const mockError = new Error('test error');
    request.sandbox.stub(FirebaseClient, 'get')
      .callsFake((path, callback) => callback(mockError));

    request
      .get('/api/alarm')
      .expect(500)
      .expect((res) => {
        assert.deepStrictEqual(res.body, {
          message: mockError.message
        });
      })
      .end(done);
  });

  it('Alarm の追加ができること', (done) => {
    const now = new Date().getTime();
    const mockData = [{
        time: now,
        message: 'サンプルメッセージ１'
      },
      {
        time: now + 100,
        message: 'サンプルメッセージ２'
      }
    ];
    request.sandbox.stub(FirebaseClient, 'get')
      .callsFake((path, callback) => callback(null, mockData));
    request.sandbox.stub(FirebaseClient, 'set')
      .callsFake((path, column, data, callback) => callback(null));

    request
      .post('/api/alarm')
      .send({
        time: now + 1,
        message: '新規メッセージ'
      })
      .expect(201)
      .expect((res) => {
        assert.deepStrictEqual(res.body, {
          time: now + 1,
          message: '新規メッセージ'
        });
      })
      .end(done);
  });

  it('Alarm 追加でエラーが発生した場合 500 エラーとなること', (done) => {
    const now = new Date().getTime();
    const mockData = [{
        time: now,
        message: 'サンプルメッセージ１'
      },
      {
        time: now + 100,
        message: 'サンプルメッセージ２'
      }
    ];
    request.sandbox.stub(FirebaseClient, 'get')
      .callsFake((path, callback) => callback(null, mockData));

    const mockError = new Error('test error');
    request.sandbox.stub(FirebaseClient, 'set')
      .callsFake((path, column, data, callback) => callback(mockError));

    request
      .post('/api/alarm')
      .send({
        time: new Date().getTime(),
        message: '新規メッセージ'
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

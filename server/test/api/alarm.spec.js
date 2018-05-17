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
});

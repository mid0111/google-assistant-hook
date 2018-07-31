const assert = require('assert');
const uuidv4 = require('uuid/v4');

const FirebaseClient = require('../../lib/FirebaseClient');
const Request = require('../lib/request');

describe('/api/alarm', () => {
  const request = new Request();

  it('Alarm 一覧取得ができること', (done) => {
    const mockData = [{
        time: '08:12',
        message: 'サンプルメッセージ１',
        id: uuidv4()
      },
      {
        time: '08:14',
        message: 'サンプルメッセージ２',
        id: uuidv4()
      }
    ];
    request.sandbox.stub(FirebaseClient, 'get')
      .callsFake((path, callback) => callback(null, mockData));

    request
      .get('/api/alarm')
      .expect(200)
      .expect((res) => {
        assert.deepStrictEqual(res.body, {
          alarms: mockData
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

const assert = require('assert');
const uuidv4 = require('uuid/v4');

const FirebaseClient = require('../../lib/FirebaseClient');
const Request = require('../lib/request');

describe('/api/alarm POST', () => {
  const request = new Request();

  it('Alarm の追加ができること', (done) => {
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
    request.sandbox.stub(FirebaseClient, 'set')
      .callsFake((path, column, data, callback) => callback(null));

    request
      .post('/api/alarm')
      .send({
        time: '08:15',
        message: '新規メッセージ'
      })
      .expect(201)
      .expect((res) => {
        assert.equal(res.body.time, '08:15');
        assert.equal(res.body.message, '新規メッセージ');
        assert.ok(res.body.id);
      })
      .end(done);
  });

  it('Alarm 追加でエラーが発生した場合 500 エラーとなること', (done) => {
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

    const mockError = new Error('test error');
    request.sandbox.stub(FirebaseClient, 'set')
      .callsFake((path, column, data, callback) => callback(mockError));

    request
      .post('/api/alarm')
      .send({
        time: '08:15',
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

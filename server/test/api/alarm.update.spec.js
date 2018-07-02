const assert = require('assert');
const uuidv4 = require('uuid/v4');

const FirebaseClient = require('../../lib/FirebaseClient');
const Request = require('../lib/request');

describe('/api/alarm', () => {
  const request = new Request();

  it('Alarm 更新ができること', (done) => {
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
      .put(`/api/alarm/${mockData[1].id}`)
      .send({
        time: '08:15',
        message: '更新メッセージ'
      })
      .expect(204)
      .end(done);
  });

  it('Alarm が存在しない場合更新で 404 となること', (done) => {
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
      .put('/api/alarm/dummy-id')
      .send({
        time: '08:15',
        message: '更新メッセージ'
      })
      .expect(404)
      .end(done);
  });

  it('Alarm 更新でエラーが発生した場合 500 エラーとなること', (done) => {
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
      .put(`/api/alarm/${mockData[1].id}`)
      .expect(500)
      .expect((res) => {
        assert.deepStrictEqual(res.body, {
          message: mockError.message
        });
      })
      .end(done);
  });
});

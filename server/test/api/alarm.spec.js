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

  it('Alarm 削除ができること', (done) => {
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
      .delete(`/api/alarm/${mockData[1].id}`)
      .expect(204)
      .end(done);
  });

  it('Alarm が存在しない場合 404 エラーとなること', (done) => {
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
      .delete('/api/alarm/dummy-id')
      .expect(404)
      .expect((res) => {
        assert.deepStrictEqual(res.body, {
          message: 'Not Found'
        });
      })
      .end(done);
  });

  it('Alarm 削除でエラーが発生した場合 500 エラーとなること', (done) => {
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
      .delete(`/api/alarm/${mockData[1].id}`)
      .expect(500)
      .expect((res) => {
        assert.deepStrictEqual(res.body, {
          message: mockError.message
        });
      })
      .end(done);
  });

});

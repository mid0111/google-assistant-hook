const sinon = require('sinon');

const FirebaseHook = require('../../lib/FirebaseHook');

// テスト用に FirebaseHook を mock したアプリケーションを作成
sinon.stub(FirebaseHook, 'watch').returns();
const app = require('../../app');

module.exports = app;

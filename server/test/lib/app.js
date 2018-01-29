const sinon = require('sinon');

const FirebaseClient = require('../../lib/FirebaseClient');

// テスト用に FirebaseClient を mock したアプリケーションを作成
sinon.stub(FirebaseClient, 'watch').returns();
const app = require('../../app');

module.exports = app;

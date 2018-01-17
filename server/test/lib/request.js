const request = require('supertest');
const nock = require('nock');

const app = require('../../app');

class Request {
  constructor() {
    this.request = request(app);
  }

  nock(url) {
    return nock(url);
  }

  get(path) {
    return this.request.get(path);
  }
}

module.exports = Request;

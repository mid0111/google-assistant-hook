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

  get(...args) {
    return this.request.get(args);
  }

  post(...args) {
    return this.request.post(args);
  }
}

module.exports = Request;

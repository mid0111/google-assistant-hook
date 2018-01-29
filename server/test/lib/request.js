const request = require('supertest');
const nock = require('nock');
const sinon = require('sinon');

const app = require('../lib/app');

class Request {
  constructor() {
    this.sandbox = sinon.sandbox.create();
    this.request = request(app);
  }

  nock(url) {
    return nock(url);
  }

  get(...args) {
    this.result = this.request.get(args);
    return this;
  }

  post(...args) {
    this.result = this.request.post(args);
    return this;
  }

  put(...args) {
    this.result = this.request.put(args);
    return this;
  }

  send(data) {
    this.result = this.result.send(data);
    return this;
  }

  expect(a, b, c) {
    if (b && c) {
      this.result = this.result.expect(a, b, c);
    } else if (b) {
      this.result = this.result.expect(a, b);
    } else {
      this.result = this.result.expect(a);
    }
    return this;
  }

  end(callback) {
    return this.result.end((err) => {
      this.sandbox.restore();
      return callback(err);
    });
  }
}

module.exports = Request;

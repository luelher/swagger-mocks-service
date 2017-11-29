let request = require('supertest');
let nock = require('nock');
const assert = require("assert");

describe('loading root', () => {
  let server;

  beforeEach(function () {
    server = require('../index.js');
  });
  afterEach(function () {
    server.close();
  });

  it('responds to /', (done) => {
    request(server)
      .get('/')
      .expect(200)
      .expect(function(res){
        assert.equal(res.text, "Swagger Mock Service for Interoperability platform");
      })
      .end(done);
  });

});

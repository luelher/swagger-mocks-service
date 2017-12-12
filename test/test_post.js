let request = require('supertest');
let nock = require('nock');
const assert = require("assert");
const swagger_url_mocks = require ("./modules/swagger_url_mocks");
const INTEROPERABILITY_SERVER_URI = process.env.INTEROPERABILITY_SERVER_URI || 'http://devel.interoperabilidad.digital.gob.cl'

describe('mocking POST method request', () => {
  let server;
  let testComplexPath = "/public/organizations/DummyInstitution/services/dummy_service/versions/99/personas";
  let testComplexBadPath = "/public/organizations/DummyInstitution/services/dummy_service/versions/99/people";

  beforeEach(function () {
    server = require('../index.js');
  });
  afterEach(function () {
    server.close();
  });

  it('responds to /:institution/:service/:version/*', (done) => {
    
    nock(INTEROPERABILITY_SERVER_URI)
        .get(swagger_url_mocks.test_swagger_path)
        .reply(200, swagger_url_mocks.complex_service_swagger_oas_response);

    request(server)
      .post(testComplexPath)
      .set('Accept', 'application/json')
      .expect(200)
      .expect(function(res){
        assert(res.body.persona);
      })
      .end(done);
  });

  it('bad responds to /:institution/:service/:version/*', (done) => {

    nock(INTEROPERABILITY_SERVER_URI)
        .get(swagger_url_mocks.test_swagger_path)
        .reply(200, swagger_url_mocks.complex_service_swagger_oas_response);

    request(server)
      .post(testComplexBadPath)
      .set('Accept', 'application/json')
      .expect(404)
      .expect(function(res){
        assert.equal(res.body.error, "Response schema for this resource is not defined in swagger file");
      })
      .end(done);
  });


  it('bad swagger request', (done) => {

      request(server)
      .post(testComplexBadPath)
      .set('Accept', 'application/json')
      .expect(500, done);

  });


});
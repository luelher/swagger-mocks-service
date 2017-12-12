let request = require('supertest');
let nock = require('nock');
const assert = require("assert");
const swagger_url_mocks = require ("./modules/swagger_url_mocks");
const INTEROPERABILITY_SERVER_URI = process.env.INTEROPERABILITY_SERVER_URI || 'http://devel.interoperabilidad.digital.gob.cl'

describe('mocking GET method request', () => {
  let server;
  let testSimplePath = "/public/organizations/DummyInstitution/services/dummy_service/versions/99/hello";
  let testSimpleBadPath = "/public/organizations/DummyInstitution/services/dummy_service/versions/99/hola";
  let testSimplePathPrivate = "/private/organizations/DummyInstitution/services/dummy_service/versions/99/hello";

  beforeEach(function () {
    server = require('../index.js');
  });
  afterEach(function () {
    server.close();
  });

  it('responds to /:institution/:service/:version/*', (done) => {

    nock(INTEROPERABILITY_SERVER_URI)
        .get(swagger_url_mocks.test_swagger_path)
        .reply(200, swagger_url_mocks.simple_service_swagger_oas_response);

    request(server)
      .get(testSimplePath)
      .set('Accept', 'application/json')
      .expect(200)
      .expect(function(res){
        assert(res.body.respuesta);
      })
      .end(done);
  });

  it('bad responds to /:institution/:service/:version/*', (done) => {

    nock(INTEROPERABILITY_SERVER_URI)
        .get(swagger_url_mocks.test_swagger_path)
        .reply(200, swagger_url_mocks.simple_service_swagger_oas_response);

    request(server)
      .get(testSimpleBadPath)
      .set('Accept', 'application/json')
      .expect(404)
      .expect(function(res){
        assert.equal(res.body.error, "Response schema for this resource is not defined in swagger file");
      })
      .end(done);
  });


  it('bad swagger request', (done) => {

      request(server)
      .get(testSimpleBadPath)
      .set('Accept', 'application/json')
      .expect(500, done);

  });

  it('responds to private /:institution/:service/:version/*', (done) => {

    nock(INTEROPERABILITY_SERVER_URI)
        .get(swagger_url_mocks.test_swagger_path)
        .reply(200, swagger_url_mocks.simple_service_swagger_oas_response);

    request(server)
      .get(testSimplePathPrivate)
      .set('Accept', 'application/json')
      .set('Autentication', 'Bearer 502810f799de274ff7840a1549cd028a')
      .expect(200)
      .expect(function(res){
        assert(res.body.respuesta);
      })
      .end(done);
  });

  it('bad responds to private /:institution/:service/:version/*', (done) => {

    nock(INTEROPERABILITY_SERVER_URI)
        .get(swagger_url_mocks.test_swagger_path)
        .reply(200, swagger_url_mocks.simple_service_swagger_oas_response);

    request(server)
      .get(testSimplePathPrivate)
      .set('Accept', 'application/json')
      .expect(401)
      .expect(function(res){
        assert(res.body.error);
      })
      .end(done);
  });


});

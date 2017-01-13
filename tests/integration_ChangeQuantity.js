'use strict';

describe('REST API', () => {

  let server;
  require('chai').should();

  before(() => {
    //Clean everything up before doing new tests
    Object.keys(require.cache).forEach((key) => delete require.cache[key]);
    let hapi = require('hapi');
    server = new hapi.Server();
    server.connection({
      host: 'localhost',
      port: 3000
    });
    require('../routes.js')(server);
    //Prepare test preconditions
    let opt = JSON.parse(JSON.stringify(options));
    opt.url += 'huw/fairphone17658';
    return server.inject(opt);
  });

  const options = {
    method: 'POST',
    url: '/basket/',
    headers: {
      'Content-Type': 'application/json'
    },
  };

  context('when trying to change the quantity of an existent item', () => {
    it('it should reply 400 for not allowed values', () => {
      let opt = JSON.parse(JSON.stringify(options));
      opt.url += 'huw/fairphone17658/-5';
      return server.inject(opt).then((response) => {
        response.should.be.an('object').and.contain.keys('statusCode', 'payload', 'headers');
        response.statusCode.should.equal(400);
        response.payload.should.be.a('string');
        let payload = JSON.parse(response.payload);
        payload.should.be.an('object').and.contain.keys('statusCode', 'error');
        payload.error.should.be.a('string').and.equal('Bad Request');
      });
    });

    it('it should reply 400 for not allowed numbers', () => {
      let opt = JSON.parse(JSON.stringify(options));
      opt.url += 'huw/fairphone17658/a';
      return server.inject(opt).then((response) => {
        response.should.be.an('object').and.contain.keys('statusCode', 'payload', 'headers');
        response.statusCode.should.equal(400);
        response.payload.should.be.a('string');
        let payload = JSON.parse(response.payload);
        payload.should.be.an('object').and.contain.keys('statusCode', 'error');
        payload.error.should.be.a('string').and.equal('Bad Request');
      });
    });

    it('it should reply the valid object for a valid request', () => {
      let opt = JSON.parse(JSON.stringify(options));
      opt.url += 'huw/fairphone17658/5';
      return server.inject(opt).then((response) => {
        response.should.be.an('object').and.contain.keys('statusCode', 'payload');
        response.statusCode.should.equal(200
                                        );
        response.payload.should.be.a('string');
        let payload = JSON.parse(response.payload);
        payload.should.be.an('object').and.contain.keys('fairphone17658');
        payload['fairphone17658'].should.equal(5);
      });
    });

  });
});

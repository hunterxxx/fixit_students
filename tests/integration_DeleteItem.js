'use strict';

describe('REST API', () => {

  let server;
  require('chai').should();

  before((done) => {
    //Clean everything up before doing new tests
    Object.keys(require.cache).forEach((key) => delete require.cache[key]);
    let hapi = require('hapi');
    server = new hapi.Server();
    server.connection({
      host: 'localhost',
      port: 3000
    });
    require('../routes.js')(server);
    done();
  });

  const options = {
    method: 'DELETE',
    url: '/basket/',
    headers: {
      'Content-Type': 'application/json'
    },
  };

//There is no delete method?
  context('when trying to delete an item into a user basket', () => {
    it('it should reply with the current basket for successfully deleted items', () => {
      let opt = JSON.parse(JSON.stringify(options));
      opt.url += 'huw/fairphone17658';
      return server.inject(opt).then((response) => {
        response.should.be.an('object').and.contain.keys('statusCode', 'payload', 'headers');
        response.statusCode.should.equal(200);
        response.payload.should.be.a('string');
        let payload = JSON.parse(response.payload);
        payload.should.be.an('object').and.contain.keys('fairphone17658');
        payload['fairphone17658'].should.equal(1);
      });
    });

    it('it should reply with 404 for already deleted items', () => {
      let opt = JSON.parse(JSON.stringify(options));
      opt.url += 'huw/fairphone17658';
      return server.inject(opt).then((response) => {
        response.should.be.an('object').and.contain.keys('statusCode', 'payload');
        response.statusCode.should.equal(200);
        response.payload.should.be.a('string');
        let payload = JSON.parse(response.payload);
        payload.should.be.an('object').and.contain.keys('statusCode', 'error');
        payload.error.should.be.a('string').and.equal('Not Found');
      });
    });
  });
});

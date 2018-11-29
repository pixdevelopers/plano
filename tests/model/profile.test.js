const request = require('supertest');
const Client = require('../../src/models/client');
let server;
describe('/client', () => {
  beforeEach(() => {
    server = require('../../src/server');
  });
  afterEach(() => {
    server.close();
  });
  describe('Get /', () => {
    it('Should return all clients', async done => {
      const res = await request(server).get('/client');
      expect(res.status).toBe(200);
      done();
    });
  });
});

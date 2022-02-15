const request = require('supertest');

const mockVerifyData = {
  phoneNumber: +12020001111
}

it('should create a code', async () => {
  await request(strapi.server) // app server is an instance of Class: http.Server
    .post('/api/verifies')
    .expect(200) // Expect response http code 200
    .then(data => {
      expect(data.body.code).toBeDefined();
    });
});
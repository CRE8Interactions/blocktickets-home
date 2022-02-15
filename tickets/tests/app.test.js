const fs = require('fs');
const { setupStrapi } = require('./helpers/strapi');

/** this code is called once before any test is called */
beforeAll(async () => {
  await setupStrapi(); // singleton so it can be called many times
  done();
});

/** this code is called once before all the tested are finished */
afterAll(async () => {
  const dbSettings = strapi.config.get('database.connections.default.settings');
  
  //close server to release the db-file
  await strapi.destroy();

  //delete test database after all tests
  if (dbSettings && dbSettings.filename) {
    const tmpDbFile = `${__dirname}/../${dbSettings.filename}`;
    if (fs.existsSync(tmpDbFile)) {
      fs.unlinkSync(tmpDbFile);
    }
  }
  done();
});

it('strapi is defined', () => {
  expect(strapi).toBeDefined();
});

require('./verify')
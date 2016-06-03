'use strict';

const signup = require('./signup');
const verify = require('./verify');

const handler = require('feathers-errors/handler');
const notFound = require('./not-found-handler');
const logger = require('./logger');

module.exports = function() {
  // Add your custom middleware here. Remember, that
  // just like Express the order matters, so error
  // handling middleware should go last.
  const app = this;

  app.post('/signup', signup(app));

  // support GET for easy testing
  app.get('/live/:userid', verify.ultimate(app));
  app.post('/live/:userid', verify.ultimate(app));
  app.get('/live/', verify.initial(app));
  app.post('/live/', verify.initial(app));
  
  app.use(notFound());
  app.use(logger(app));
  app.use(handler());
};

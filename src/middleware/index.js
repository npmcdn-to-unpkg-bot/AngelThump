'use strict';

const signup = require('./signup');
const verify = require('./verify');
const api = require('./api');

const handler = require('feathers-errors/handler');
const notFound = require('./not-found-handler');
const logger = require('./logger');

module.exports = function() {
  // Add your custom middleware here. Remember, that
  // just like Express the order matters, so error
  // handling middleware should go last.
  const app = this;

  app.set('view engine', 'ejs');
  console.log(__dirname);
  app.set('views', 'public');

  // TODO:
  // check if the username actually exists before trying to render this view
  // http://docs.feathersjs.com/guides/using-a-view-engine.html

  app.get('/embed/:username', function(req, res, next){
    res.render('embed', {username: req.params.username});
  });

  app.get('/embed-test/:username', function(req, res, next){
    res.render('embed-test', {username: req.params.username});
  });

  app.post('/signup', signup(app));

  // support GET for easy testing
  app.get('/live', verify.initial(app));
  app.post('/live', verify.initial(app));
  app.get('/api', function(req, res, next){
    res.status(200).send('ok');
  });

  app.get('/api/:username', api(app));
  
  app.use(notFound());
  app.use(logger(app));
  app.use(handler());
};

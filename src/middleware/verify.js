'use strict';

module.exports = function(app) {
  return function(req, res, next) {
    console.log(req.originalUrl);
    res.status(200).send(req.method+' OK')
    // res.status(403).send('Forbidden')
    // res.status(404).send('Not Found')
  };
};
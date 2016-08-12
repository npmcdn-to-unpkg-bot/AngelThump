'use strict';

const hooks = require('./hooks');
const service = require('feathers-mongoose');
const mongoose = require('mongoose');
const Users = require('./users-model.js');

module.exports = function(){
  const app = this;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/feathers');

  // Initialize our service with any options it requires
  app.use('/users', service({
  Model: Users,
  lean: true
  }));

  // Get our initialize service to that we can bind hooks
  const userService = app.service('/users');


  userService.filter('streamkey', function(data, connection, hook) {
    // The id of the user that created the todo
    const modifiedUserId = hook.params.user._id;
    // The a list of ids of the connection's user friends
    const currentUserId = connection.user._id;

    if(modifiedUserId !== currentUserId) {
      return false;
    }

    return data;
  });

  // Set up our before hooks
  userService.before(hooks.before);

  // Set up our after hooks
  userService.after(hooks.after);
};
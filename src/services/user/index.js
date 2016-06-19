'use strict';

const path = require('path');
const NeDB = require('nedb');
const service = require('feathers-nedb');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const db = new NeDB({
    filename: path.join(app.get('nedb'), 'users.db'),
    autoload: true
  });

  let options = {
    Model: db,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/users', service(options));

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

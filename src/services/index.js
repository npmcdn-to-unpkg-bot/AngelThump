'use strict';
const authentication = require('./authentication');
const user = require('./user');

module.exports = function() {
  const app = this;

  // TODO: allow resetting stream keys
  // user.filter('streamkey', function(data, connection, hook) {
  //   // The id of the user that created the todo
  //   const modifiedUserId = hook.params.user._id;
  //   // The a list of ids of the connection's user friends
  //   const currentUserId = connection.user._id;

  //   if(modifiedUserId !== currentUserId) {
  //     return false;
  //   }

  //   return data;
  // });
  
  app.configure(authentication);
  app.configure(user);
};

'use strict';

module.exports = function() {
  return function(hook) {
    // Assign the new data with the username
    console.log(hook.params.query.username.toLowerCase());
    /*
    hook.params.query = Object.assign({}, hook.params.query, {
      username: hook.params.query.username.toLowerCase()
    });*/
    hook.params.query.username = hook.params.query.username.toLowerCase();


    console.log(hook.params);
  };
};

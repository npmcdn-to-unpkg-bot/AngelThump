'use strict';

module.exports = function() {
  return function(hook) {
    hook.params.query.username = hook.params.query.username.toLowerCase();
  };
};

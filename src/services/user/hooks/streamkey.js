'use strict';

// src/services/user/hooks/gravatar.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

// We need this to create the MD5 hash
const crypto = require('crypto');

// Returns a full URL to a Gravatar image for a given email address
const keyGen = email => {
  // Gravatar uses MD5 hashes from an email address to get the image
  const seed = `${Math.random().toString()}${email}`;
  const key = crypto.createHash('sha256').update(seed).digest('hex');

  return key;
};

module.exports = function() {
  return function(hook) {
    // Assign the new data with the Gravatar image
    hook.data = Object.assign({}, hook.data, {
      streamkey: keyGen(hook.data.email)
    });
  };
};
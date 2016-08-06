'use strict';

const assert = require('assert');
const insensitive = require('../../../../src/services/users/hooks/insensitive.js');

describe('users insensitive hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    insensitive()(mockHook);

    assert.ok(mockHook.insensitive);
  });
});

'use strict';

const assert = require('assert');
const username = require('../../../../src/services/authentication/hooks/username.js');

describe('authentication username hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    username()(mockHook);

    assert.ok(mockHook.username);
  });
});

'use strict';

const assert = require('assert');
const normalize = require('../../../../src/services/authentication/hooks/normalize.js');

describe('authentication normalize hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    normalize()(mockHook);

    assert.ok(mockHook.normalize);
  });
});

/* global describe, beforeEach, it, browser, expect */
'use strict';

var DoodleRegisteredPagePo = require('./doodle-registered.po');

describe('Doodle registered page', function () {
  var page;

  beforeEach(function () {
    page = new DoodleRegisteredPagePo();
    browser.get('/#/DoodleRegistered');
  });

  it('should say DoodleRegisteredCtrl', function () {
    expect(page.header.getText()).toEqual('Doodle');
  });
});

/* global describe, beforeEach, it, browser, expect */
'use strict';

var RegisterDoodlePagePo = require('./register-doodle.po');

describe('Register doodle page', function () {
  var page;

  beforeEach(function () {
    page = new RegisterDoodlePagePo();
    browser.get('/#/RegisterDoodle');
  });

  it('should say RegisterDoodleCtrl', function () {
    expect(page.header.getText()).toEqual('Doodle');
  });
});

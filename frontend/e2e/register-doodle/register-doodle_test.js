/* global describe, beforeEach, it, browser, expect */
'use strict';

var RegisterDoodlePagePo = require('./register-doodle.po');

describe('Register doodle page', function () {
  var registerDoodlePage;

  beforeEach(function () {
    registerDoodlePage = new RegisterDoodlePagePo();
    browser.get('/#/RegisterDoodle');
  });

  it('should say RegisterDoodleCtrl', function () {
    expect(registerDoodlePage.heading.getText()).toEqual('registerDoodle');
    expect(registerDoodlePage.text.getText()).toEqual('RegisterDoodleCtrl');
  });
});

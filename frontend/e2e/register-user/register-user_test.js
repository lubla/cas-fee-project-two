/* global describe, beforeEach, it, browser, expect */
'use strict';

var RegisterUserPagePo = require('./register-user.po');

describe('Register user page', function () {
  var page;

  beforeEach(function () {
    page = new RegisterUserPagePo();
    browser.get('/#/RegisterUser');
  });

  it('should say RegisterUserCtrl', function () {
    expect(page.header.getText()).toEqual('Doodle');
  });
});

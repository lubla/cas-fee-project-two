/* global describe, beforeEach, it, browser, expect */
'use strict';

var RegisterUserPagePo = require('./register-user.po');

describe('Register user page', function () {
  var registerUserPage;

  beforeEach(function () {
    registerUserPage = new RegisterUserPagePo();
    browser.get('/#/RegisterUser');
  });

  it('should say RegisterUserCtrl', function () {
    expect(registerUserPage.heading.getText()).toEqual('registerUser');
    expect(registerUserPage.text.getText()).toEqual('RegisterUserCtrl');
  });
});

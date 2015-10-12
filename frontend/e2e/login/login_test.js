/* global describe, beforeEach, it, browser, expect */
'use strict';

var LoginPagePo = require('./login.po');

describe('Login page', function () {
  var page;

  beforeEach(function () {
    page = new LoginPagePo();
    browser.get('/#/Login');
  });

  it('should say LoginCtrl', function () {
    expect(page.header.getText()).toEqual('Doodle');
  });
});

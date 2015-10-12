/* global describe, beforeEach, it, browser, expect */
'use strict';

var HomePagePo = require('./home.po');

describe('Home page', function () {
  var page;

  beforeEach(function () {
    page = new HomePagePo();
    browser.get('/#/home');
  });

  it('should say HomeCtrl', function () {
    expect(page.header.getText()).toEqual('Doodle');
  });
});

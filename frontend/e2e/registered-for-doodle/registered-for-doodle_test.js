/* global describe, beforeEach, it, browser, expect */
'use strict';

var RegisteredForDoodlePagePo = require('./registered-for-doodle.po');

describe('Registered for doodle page', function () {
  var page;

  beforeEach(function () {
    page = new RegisteredForDoodlePagePo();
    browser.get('/#/RegisteredForDoodle');
  });

  it('should say RegisteredForDoodleCtrl', function () {
    expect(page.header.getText()).toEqual('Doodle');
  });
});

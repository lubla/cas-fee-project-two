/* global describe, beforeEach, it, browser, expect */
'use strict';

var RegisteredForDoodlePagePo = require('./registered-for-doodle.po');

describe('Registered for doodle page', function () {
  var registeredForDoodlePage;

  beforeEach(function () {
    registeredForDoodlePage = new RegisteredForDoodlePagePo();
    browser.get('/#/RegisteredForDoodle');
  });

  it('should say RegisteredForDoodleCtrl', function () {
    expect(registeredForDoodlePage.heading.getText()).toEqual('registeredForDoodle');
    expect(registeredForDoodlePage.text.getText()).toEqual('RegisteredForDoodleCtrl');
  });
});

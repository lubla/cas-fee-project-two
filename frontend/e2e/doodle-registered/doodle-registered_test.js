/* global describe, beforeEach, it, browser, expect */
'use strict';

var DoodleRegisteredPagePo = require('./doodle-registered.po');

describe('Doodle registered page', function () {
  var doodleRegisteredPage;

  beforeEach(function () {
    doodleRegisteredPage = new DoodleRegisteredPagePo();
    browser.get('/#/DoodleRegistered');
  });

  it('should say DoodleRegisteredCtrl', function () {
    expect(doodleRegisteredPage.heading.getText()).toEqual('doodleRegistered');
    expect(doodleRegisteredPage.text.getText()).toEqual('DoodleRegisteredCtrl');
  });
});

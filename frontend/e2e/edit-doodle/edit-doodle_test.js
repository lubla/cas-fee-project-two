/* global describe, beforeEach, it, browser, expect */
'use strict';

var EditDoodlePagePo = require('./edit-doodle.po');

describe('Edit doodle page', function () {
  var page;

  beforeEach(function () {
    page = new EditDoodlePagePo();
    browser.get('/#/EditDoodle');
  });

  it('should say EditDoodleCtrl', function () {
    expect(page.header.getText()).toEqual('Doodle');
  });
});

/* global describe, beforeEach, it, browser, expect */
'use strict';

var EditDoodlePagePo = require('./edit-doodle.po');

describe('Edit doodle page', function () {
  var editDoodlePage;

  beforeEach(function () {
    editDoodlePage = new EditDoodlePagePo();
    browser.get('/#/EditDoodle');
  });

  it('should say EditDoodleCtrl', function () {
    expect(editDoodlePage.heading.getText()).toEqual('editDoodle');
    expect(editDoodlePage.text.getText()).toEqual('EditDoodleCtrl');
  });
});

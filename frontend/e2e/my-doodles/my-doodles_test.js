/* global describe, beforeEach, it, browser, expect */
'use strict';

var MyDoodlesPagePo = require('./my-doodles.po');

describe('My doodles page', function () {
  var page;

  beforeEach(function () {
    page = new MyDoodlesPagePo();
    browser.get('/#/MyDoodles');
  });

  it('should say MyDoodlesCtrl', function () {
    expect(page.header.getText()).toEqual('Doodle');
  });
});

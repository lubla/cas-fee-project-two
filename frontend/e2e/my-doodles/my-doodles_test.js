/* global describe, beforeEach, it, browser, expect */
'use strict';

var MyDoodlesPagePo = require('./my-doodles.po');

describe('My doodles page', function () {
  var myDoodlesPage;

  beforeEach(function () {
    myDoodlesPage = new MyDoodlesPagePo();
    browser.get('/#/MyDoodles');
  });

  it('should say MyDoodlesCtrl', function () {
    expect(myDoodlesPage.heading.getText()).toEqual('myDoodles');
    expect(myDoodlesPage.text.getText()).toEqual('MyDoodlesCtrl');
  });
});

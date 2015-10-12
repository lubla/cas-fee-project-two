/* global element, by */
'use strict';

var e2eConstants = require('../e2eCommon').constants;

function EditDoodlePage() {
  this.header = element(by.css(e2eConstants.css.header));
}

module.exports = EditDoodlePage;

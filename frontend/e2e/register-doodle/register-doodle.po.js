/* global element, by */
'use strict';

function RegisterDoodlePage() {
  this.text = element(by.tagName('p'));
  this.heading = element(by.tagName('h2'));
}

module.exports = RegisterDoodlePage;

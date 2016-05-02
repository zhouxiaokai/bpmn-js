'use strict';

var bind = require('lodash/function/bind');

var translate;

function Translate(i18n) {
  if (!translate) {
    translate = bind(i18n.translate, i18n);
  }

  return (translate);
}

Translate.$inject = [ 'i18n' ];

module.exports = Translate;
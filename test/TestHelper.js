'use strict';

var TestHelper = module.exports = require('./helper');

TestHelper.insertCSS('diagram-js.css', require('diagram-js/assets/diagram-js.css'));

TestHelper.insertCSS('bpmn-embedded.css', require('../assets/bpmn-font/css/bpmn-embedded.css'));

TestHelper.insertCSS('diagram-js-testing.css',
  '.test-container .result { height: 500px; }' + '.test-container > div'
);


import BoundsMatchers from 'diagram-js/test/matchers/BoundsMatchers';
import ConnectionMatchers from 'diagram-js/test/matchers/ConnectionMatchers';

// add suite specific matchers
global.chai.use(BoundsMatchers);
global.chai.use(ConnectionMatchers);
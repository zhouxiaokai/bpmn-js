'use strict';

module.exports = {
  __init__: [ 'wrapper' ],
  __depends__: [ 
    require('../../lib/features/modeling')
  ],
  wrapper: [ 'type', require('./Wrapper') ]
};

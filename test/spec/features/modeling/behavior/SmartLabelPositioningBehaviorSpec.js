'use strict';

require('../../../../TestHelper');

/* global bootstrapModeler, inject */

var modelingModule = require('../../../../../lib/features/modeling'),
    coreModule = require('../../../../../lib/core');

var LabelUtil = require('../../../../../lib/util/LabelUtil');


describe('behavior - SmartLabelPositioningBehavior', function() {

  var diagramXML = require('./SmartLabelPositioningBehavior.bpmn');

  beforeEach(bootstrapModeler(diagramXML, {
    modules: [
      modelingModule,
      coreModule
    ]
  }));


  describe('add label', function() {

    it('should add to sequence flow', inject(function(elementRegistry, modeling) {

      // given
      var source = elementRegistry.get('LabelBottom'),
          target = elementRegistry.get('LabelLeft');

      // when
      var connection = modeling.connect(source, target);

      console.log(connection);

      // then
      expect(connection).to.exist;
    }));

  });


});

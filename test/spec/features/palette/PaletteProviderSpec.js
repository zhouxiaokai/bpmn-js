'use strict';

require('../../../TestHelper');

/* global bootstrapModeler, inject */

import modelingModule from '../../../../lib/features/modeling';
import paletteModule from '../../../../lib/features/palette';
import coreModule from '../../../../lib/core';

import domQuery from 'min-dom/lib/query';


describe('features/palette', function() {

  var diagramXML = require('../../../fixtures/bpmn/features/replace/01_replace.bpmn');

  var testModules = [ coreModule, modelingModule, paletteModule ];

  beforeEach(bootstrapModeler(diagramXML, { modules: testModules }));


  it('should provide BPMN modeling palette', inject(function(canvas, palette) {

    // when
    var paletteElement = domQuery('.djs-palette', canvas._container);
    var entries = domQuery.all('.entry', paletteElement);

    // then
    expect(entries.length).to.equal(13);
  }));

});

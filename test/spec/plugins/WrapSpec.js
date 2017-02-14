'use strict';

require('../../TestHelper');

/* global bootstrapModeler, inject */

var wrapperModule = require('../../../plugins/wrapper'),
    modelingModule = require('../../../lib/features/modeling'),
    bpmnEditorActionsModule = require('../../../lib/features/editor-actions'),
    coreModule = require('../../../lib/core');


describe('plugins/wrap', function() {

  var testModules = [ wrapperModule, bpmnEditorActionsModule, modelingModule, coreModule ];

  describe('wrap', function() {

    var wrapXML = require('../../fixtures/bpmn/plugins/wrap-elements.bpmn');

    beforeEach(bootstrapModeler(wrapXML, { modules: testModules }));

    it('should wrap elements', inject(function(wrapper, editorActions, selection) {

      // given
      var elements, parent, container;

      editorActions.trigger('selectElements');

      elements = selection.get();

      parent = elements[0].parent;

      // when
      wrapper.wrapElements(elements, { type: 'bpmn:SubProcess', isExpanded: true });

      container = elements[0].parent;

      // then
      expect(parent).to.not.equal(container);
      expect(container.type).to.equal('bpmn:SubProcess');
    }));


    it('should undo', inject(function(wrapper, editorActions, selection, commandStack) {

      // given
      var elements, parent, container;

      editorActions.trigger('selectElements');

      elements = selection.get();

      parent = elements[0].parent;

      wrapper.wrapElements(elements, { type: 'bpmn:SubProcess', isExpanded: true });

      // when
      commandStack.undo();

      container = elements[0].parent;

      // then
      expect(container).to.equal(parent);
      expect(container.type).to.equal('bpmn:Process');
    }));


    it('should redo', inject(function(wrapper, editorActions, selection, commandStack) {

      // given
      var elements, parent, container;

      editorActions.trigger('selectElements');

      elements = selection.get();

      parent = elements[0].parent;

      wrapper.wrapElements(elements, { type: 'bpmn:SubProcess', isExpanded: true });

      container = elements[0].parent;

      // when
      commandStack.undo();
      commandStack.redo();

      // then
      expect(parent).to.not.equal(container);
      expect(container.type).to.equal('bpmn:SubProcess');
    }));

  });

  describe('unwrap', function() {

    var unwrapXML = require('../../fixtures/bpmn/plugins/unwrap-elements.bpmn');

    beforeEach(bootstrapModeler(unwrapXML, { modules: testModules }));


    it('should unwrap elements', inject(function(wrapper, editorActions, selection, elementRegistry) {

      // given
      var subProcess = elementRegistry.get('SubProcess_1'),
          incConnection = elementRegistry.get('SequenceFlow_Ext_1'),
          outConnection = elementRegistry.get('SequenceFlow_Ext_2'),
          startEvent = elementRegistry.get('StartEvent_1'),
          parent = subProcess.parent;

      // when
      wrapper.unwrapElements(subProcess);

      // then
      expect(parent.children).to.not.contain(subProcess, incConnection, outConnection);
      expect(startEvent.parent).to.equal(parent);
    }));


    it('should undo', inject(function(wrapper, editorActions, selection, elementRegistry, commandStack) {

      // given
      var subProcess = elementRegistry.get('SubProcess_1'),
          incConnection = elementRegistry.get('SequenceFlow_Ext_1'),
          outConnection = elementRegistry.get('SequenceFlow_Ext_2'),
          startEvent = elementRegistry.get('StartEvent_1'),
          parent = subProcess.parent;

      wrapper.unwrapElements(subProcess);

      // when
      commandStack.undo();

      // then
      expect(parent.children).to.contain(subProcess, incConnection, outConnection);
      expect(startEvent.parent).to.equal(subProcess);
    }));


    it('should redo', inject(function(wrapper, editorActions, selection, elementRegistry, commandStack) {

      // given
      var subProcess = elementRegistry.get('SubProcess_1'),
          incConnection = elementRegistry.get('SequenceFlow_Ext_1'),
          outConnection = elementRegistry.get('SequenceFlow_Ext_2'),
          startEvent = elementRegistry.get('StartEvent_1'),
          parent = subProcess.parent;

      wrapper.unwrapElements(subProcess);

      // when
      commandStack.undo();
      commandStack.redo();

      // then
      expect(parent.children).to.not.contain(subProcess, incConnection, outConnection);
      expect(startEvent.parent).to.equal(parent);
    }));

  });

});

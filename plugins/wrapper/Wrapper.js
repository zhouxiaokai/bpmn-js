'use strict';

var all = require('lodash/collection/all');

var ALLOWED_CONTAINERS = [
  'bpmn:SubProcess',
  'bpmn:Participant'
];

// These elements have *root* as a parent
var SPECIAL_CASES = [
  'bpmn:DataInputAssociation',
  'bpmn:DataOutputAssociation',
  'bpmn:MessageFlow'
];

function canWrap(elements, container) {
  var parent = elements[0].parent;

  var hasSameParent = all(elements, function(element) {
    if (SPECIAL_CASES.indexOf(element.type) === -1) {
      return true;
    }

    return element.parent === parent;
  });

  return hasSameParent && ALLOWED_CONTAINERS.indexOf(container.type) !== -1;
}


function Wrapper(modeling, elementFactory, commandStack) {
  this._modeling = modeling;
  this._elementFactory = elementFactory;
  this._commandStack = commandStack;

  commandStack.registerHandler('plugins.wrapper.wrap', require('./WrapHandler'));
  commandStack.registerHandler('plugins.wrapper.unwrap', require('./UnwrapHandler'));
}

Wrapper.$inject = [ 'modeling', 'elementFactory', 'commandStack' ];

module.exports = Wrapper;

Wrapper.prototype.wrapElements = function(elements, containerDefs) {
  var commandStack = this._commandStack;

  if (!elements || !elements.length || !canWrap(elements, containerDefs)) {
    return;
  }

  commandStack.execute('plugins.wrapper.wrap', {
    elements: elements,
    parent: elements[0].parent,
    containerDefs: containerDefs
  });
};

Wrapper.prototype.unwrapElements = function(container) {
  var commandStack = this._commandStack;

  var parent = container.parent;

  commandStack.execute('plugins.wrapper.unwrap', {
    container: container,
    parent: parent
  });
};

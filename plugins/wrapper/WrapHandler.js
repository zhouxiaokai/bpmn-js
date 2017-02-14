'use strict';

var getBBox = require('diagram-js/lib/util/Elements').getBBox;

var PADDING = 40;

function WrapHandler(modeling, elementFactory) {
  this._modeling = modeling;
  this._elementFactory = elementFactory;
}

WrapHandler.$inject = [ 'modeling', 'elementFactory' ];

module.exports = WrapHandler;

WrapHandler.prototype.preExecute = function(context) {
  var elementFactory = this._elementFactory,
      modeling = this._modeling;

  var elements = context.elements,
      parent = context.parent,
      containerDefs = context.containerDefs;

  var wrapperElement = elementFactory.createShape(containerDefs);

  // get the elements bounding box
  var bbox = getBBox(elements),
      position = {
        x: bbox.x + wrapperElement.width / 2,
        y: bbox.y + wrapperElement.height / 2
      },
      newBounds = {
        x: bbox.x - PADDING / 2,
        y: bbox.y - PADDING / 2,
        width: bbox.width + PADDING,
        height: bbox.height + PADDING
      };

  // create wrapper at the bbox's position
  wrapperElement = modeling.createShape(wrapperElement, position, parent);

  // resize wrapper element
  modeling.resizeShape(wrapperElement, newBounds);

  // move elements inside container
  modeling.moveElements(elements, { x: 0, y: 0 }, wrapperElement);
};

WrapHandler.prototype.execute = function() {};
WrapHandler.prototype.revert = function() {};

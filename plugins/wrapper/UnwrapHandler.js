'use strict';

var forEach = require('lodash/collection/forEach');

function UnwrapHandler(modeling) {
  this._modeling = modeling;
}

UnwrapHandler.$inject = [ 'modeling' ];

module.exports = UnwrapHandler;

UnwrapHandler.prototype.preExecute = function(context) {
  var modeling = this._modeling;

  var container = context.container,
      parent = container.parent;

  var children = [].concat(container.children),
      externalConnections = [].concat(container.incoming, container.outgoing);

  // move elements to the container's parent
  modeling.moveElements(children, { x: 0, y: 0 }, parent);

  // remove connections to and from the container
  forEach(externalConnections, function(connection) {
    modeling.removeConnection(connection);
  });

  // remove the container
  modeling.removeShape(container);
};

UnwrapHandler.prototype.execute = function() {};
UnwrapHandler.prototype.revert = function() {};

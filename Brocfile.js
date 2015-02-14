var mergeTrees = require('broccoli-merge-trees');

var sourceTrees = mergeTrees(['app', 'public', 'styles']);

module.exports = sourceTrees;

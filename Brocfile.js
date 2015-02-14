var mergeTrees = require('broccoli-merge-trees');

var tree = mergeTrees(['app', 'public']);

module.exports = tree;

var mergeTrees  = require('broccoli-merge-trees');
var compileSass = require('broccoli-sass');
var Funnel      = require('broccoli-funnel');
var findBowerTrees = require('broccoli-bower');
var sixToFive = require('broccoli-6to5-transpiler');
var es6Modules  = require('broccoli-es6modules');

var cssTree = compileSass(
  ['styles'],
  '/app.scss',
  '/assets/app.css'
);

var jsTree = new Funnel('app', {
  srcDir: '/',
  destDir: '/assets',
  include: [
    '**/*.jsx',
    '**/*.js'
  ]
});

jsTree = sixToFive(jsTree, {
  blacklist: ['es6.modules', 'useStrict']
});

jsTree = new es6Modules(jsTree, {
  description: 'ES6: App Js',
  esperantoOptions: {
    absolutePaths: true,
    strict: true
  }
});

var sourceTrees = [jsTree, cssTree, 'public'];

// Add bower dependencies
// findBowerTrees uses heuristics to pick the lib directory and/or main files,
// and returns an array of trees for each bower package found.
sourceTrees = sourceTrees.concat(findBowerTrees());

// merge array into tree
var appAndDependencies = new mergeTrees(sourceTrees, { overwrite: true });

module.exports = mergeTrees([appAndDependencies]);

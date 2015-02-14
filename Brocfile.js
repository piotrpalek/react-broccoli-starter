var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');
var compileSass = require('broccoli-sass');

var jsTree = pickFiles('app', {
  srcDir: '/',
  destDir: '/assets',
  files: [
    '**/*.js'
  ]
});

var cssTree = compileSass(
  ['styles'],
  '/app.scss',
  '/assets/app.css'
);

module.exports = mergeTrees([jsTree, cssTree, 'public']);

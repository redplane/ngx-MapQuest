const path = require('path');
const {build} = require('../common');

// Build the source directory
const actualRoot = path.join(__dirname, '../..');

// Do library build.
build(actualRoot);

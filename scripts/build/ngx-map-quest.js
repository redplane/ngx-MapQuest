const path = require('path');
const fs = require('fs');
const { build, LIBRARY_FOLDER_NAME } = require('../common');

// Build the source directory

const actualRoot = path.join(__dirname, '../..');
require('dotenv').config({ path: path.resolve(actualRoot, '.env') });

// Get the package.json file.
const szOutputPath = path.join(actualRoot, 'dist', LIBRARY_FOLDER_NAME);
const outputPackageFile = path.join(szOutputPath, 'package.json');
const jOutputPackage = require(outputPackageFile);
console.log(outputPackageFile);

// Do library build.
build(actualRoot);

// Update the package version.
if (process.env.IS_PREVIEW == 'true') {
  jOutputPackage.version = `${process.env.MAJOR_VERSION}.${process.env.MINOR_VERSION}.${process.env.PATCH_VERSION}-preview-${process.env.GITHUB_RUN_NUMBER}`;
} else {
  jOutputPackage.version = `${process.env.MAJOR_VERSION}.${process.env.MINOR_VERSION}.${process.env.GITHUB_RUN_NUMBER}`;
}

console.log();
console.log(`Built package with version: ${jOutputPackage.version}`);
fs.writeFileSync(outputPackageFile, JSON.stringify(jOutputPackage));
console.log();

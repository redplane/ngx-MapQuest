const path = require('path');
const fs = require('fs');
const { EOL } = require('os');
const childProcess = require('child_process');
const { LIBRARY_FOLDER_NAME } = require('../common');

const deploy = (outputPath) => {
  let szNpmRcContent = '';

  szNpmRcContent += `:${process.env.NPM_REGISTRY}`;
  szNpmRcContent += EOL;
  szNpmRcContent += `//registry.npmjs.org/:_authToken=${process.env.NPM_ACCESS_TOKEN}`;

  const szNpmRcFilePath = path.join(outputPath, '.npmrc');
  fs.writeFileSync(szNpmRcFilePath, szNpmRcContent);

  console.log();
  console.log('Publishing library ...');
  childProcess.execSync(`npm publish`, {
    cwd: outputPath,
    encoding: 'utf-8',
  });
};

// Build the source directory
const actualRoot = path.join(__dirname, '../..');
require('dotenv').config({ path: path.resolve(actualRoot, '.env') });

// Get the package.json file.
const szOutputPath = path.join(actualRoot, 'dist', LIBRARY_FOLDER_NAME);
deploy(szOutputPath);

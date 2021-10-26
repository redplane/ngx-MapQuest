//#region Imports
const path = require('path');
const childProcess = require('child_process');
const cpx = require('cpx');

//#endregion

//#region Properties

// Name of library folder.
exports.LIBRARY_FOLDER_NAME = 'ngx-MapQuest';

//#endregion

//#region Methods

// Execute command asynchronously.
exports.executeAsync = async function (command, options) {
  return new Promise((resolve, reject) => {
    const process = childProcess.exec(command, options, error => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });

    process.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    process.stderr.on('data', (data) => {
      console.log(data.toString());
    });

  });
}

// Copy file asynchronously.
exports.copyAsync = async function (source, destination, options) {
  return new Promise((resolve, reject) => {
    cpx.copy(source, destination, options, error => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

exports.getLibraryFolderPath = function (root) {
  return path.join(root, 'dist', exports.LIBRARY_FOLDER_NAME);
}

// Build the package
exports.build  = function(root) {
  // Build the library.
  childProcess.execSync(`npx ng-packagr -p projects/${exports.LIBRARY_FOLDER_NAME}/ng-package.json`, {cwd: root});
}



//#endregion

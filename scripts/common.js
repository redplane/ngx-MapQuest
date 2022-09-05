//#region Imports
const path = require('path');
const environment = require('dotenv');
const childProcess = require('child_process');
const cpx = require('cpx');

//#endregion

//#region Properties

// Name of library folder.
exports.LIBRARY_FOLDER_NAME = 'ngx-map-quest';

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
  childProcess.execSync(`node ./node_modules/@angular/cli/bin/ng build ${exports.LIBRARY_FOLDER_NAME} -c production`, {
    cwd: root,
    encoding: 'utf-8'
  });


}



//#endregion

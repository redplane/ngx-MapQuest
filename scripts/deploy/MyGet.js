const path = require('path');
const childProcess = require('child_process');
const cpx = require('cpx');
const {
  LIBRARY_FOLDER_NAME,
  copyAsync,
  executeAsync,
  getLibraryFolderPath,
} = require('../common');
const { build } = require('../common');

// Build the source directory
const root = path.join(__dirname, '../..');
const distFolder = getLibraryFolderPath(root);

// To deploy asynchronously.
function deploy() {
  // Build asynchronously.
  build(root);

  // Copy the npmrc to the destination folder.
  cpx.copySync(process.env.NPMRC_MYGET_NGX_MAPQUEST, distFolder, {
    update: true,
  });

  // Write message to screen.
  console.log(
    `Copied ${process.env.NPMRC_MYGET_NGX_MAPQUEST} to ${distFolder}`
  );

  // Publish the library.
  childProcess.execSync('npm publish', {
    cwd: distFolder,
  });
}

// Do deployment
deploy();

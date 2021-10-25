const fs = require("fs");
const {
  existPath,
  absolutePath,
  isDirectory,
  pathExtName,
  mdFiles,
  readFiles,
  linksFiles,
} = require("./Functions.js");

const mdlinks = (userPath, options) => {
  return new Promise((resolve, reject) => {
    if (existPath(userPath)) {
      if (isDirectory(userPath)) {
        let returnPath = absolutePath(userPath);
        let filesDirectory = fs.readdirSync(returnPath);
        let files = mdFiles(filesDirectory);
        let contentFiles = readFiles(files, returnPath, options);
        resolve(contentFiles);
      } else {
        if (pathExtName(userPath)) {
        }
      }
    } else {
      reject({
        Error: "Ruta inválida",
      });
    }
  });
};

module.exports = {
  mdlinks,
};

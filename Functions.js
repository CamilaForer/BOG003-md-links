const fs = require('fs');
const path = require('path');
const markdownLinkExtractor = require('markdown-link-extractor')

const existPath = (pathAbsolute) => fs.existsSync(pathAbsolute);
const absolutePath = (userPath) => (path.isAbsolute(userPath) ? userPath : path.resolve(userPath));
const isDirectory = (userPath) => fs.statSync(userPath).isDirectory();
const pathExtName = (file) => path.extname(file) === '.md';
const mdFiles = (files) => files.filter((file) => {
  if (pathExtName(file)) {
    return (file)
  }
});
// Leer contenido de los archivos
const readFiles = (files, absPath) => { 
  const content = [];
  files.forEach(file => {
    let absoluteRoute = path.join(absPath, file);
    let read = fs.readFileSync(absoluteRoute,{encoding:'utf-8'});
    content.push(read)
  })
  return content
};
//Extraer links de los md 
const linksFiles= (contentFiles) => {
 let links= []
 for (let index = 0; index < contentFiles.length; index++) {
  links[index]=markdownLinkExtractor(contentFiles[index],false)
  return links[index]
 }
//  console.log(links)
//  return links
};






module.exports = {
  existPath,
  absolutePath,
  isDirectory,
  pathExtName,
  mdFiles,
  readFiles,
  linksFiles,
}

const fs = require('fs');
const path = require('path');

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
 let regExp=/(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm 
 let regExpText=/\[(.*?)\]/g
 contentFiles.forEach(file => {
  let finalLinks= deleteExtra(file.match(regExp))
  let finalText=deleteExtra(file.match(regExpText))
  links.push({
    "href" : finalLinks,
    "text" : finalText,
  })
 });
 return links
};

const deleteExtra= (links) =>{
  let finalLinks=[]
  links.forEach(link =>{
  finalLinks.push(link.replace(/[\[\]\)]/g,""))
  });
  return finalLinks
};

// const build= (file, text, links)=>{
//   links.forEach((link, index) => {
    
//   });
// }



module.exports = {
  existPath,
  absolutePath,
  isDirectory,
  pathExtName,
  mdFiles,
  readFiles,
  linksFiles,
}

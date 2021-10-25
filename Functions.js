const fs = require("fs");
const path = require("path");
const axios = require("axios");


const existPath = (pathAbsolute) => fs.existsSync(pathAbsolute);
const absolutePath = (userPath) =>
  path.isAbsolute(userPath) ? userPath : path.resolve(userPath);
const isDirectory = (userPath) => fs.statSync(userPath).isDirectory();
const pathExtName = (file) => path.extname(file) === ".md";
const mdFiles = (files) =>
  files.filter((file) => {
    if (pathExtName(file)) {
      return file;
    }
  });
// Leer contenido de los archivos
const readFiles = (files, absPath, { validate }) =>
  new Promise((resolve, reject) => {
    let content;
    let link;
    content = files.map((file) => {
      let absoluteRoute = path.join(absPath, file);
      let read = fs.readFileSync(absoluteRoute, {
        encoding: "utf-8"
      });
      if (!validate) {
        link = linksFiles(read, file).then(function (result) {
          return result;
        });
      } else {
        link = linksFiles(read, file, validate).then(function (result) {
          return result;
        });
      }
      return link;
    });
    Promise.all(content).then(function (results) {
      resolve(results);
    });
  });

//Extraer links de los md
const linksFiles = (contentFiles, files,validate) =>
  new Promise((resolve, reject) => {
    //expresión regular para capturar links
    let regExp =
      /(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
    //expresión regular para capturar el texto de los links en un archivo .md
    let regExpText = /\[(.*?)\]/g;
    //la función match busca las coincidencias entre el texto y una expresión regular en este caso lo que coincida con links
    //la función deleteExtra es una función propia creada con el propósito de quital un ) final con el que la función match nos entrega los links
    let finalLinks = deleteExtra(contentFiles.match(regExp));
    //la función match busca las coincidencias entre el texto y una expresión regular en este caso lo que coincida con texto entre []
    //la función deleteExtra es una función propia creada con el propósito de quital los [] del texto que nos entrega la función match
    let finalText = deleteExtra(contentFiles.match(regExpText));
    //la función buildAnswer es una función propia creada con el propósito de generar la respuesta que se espera teneindo en cuenta los links el texto y el nombre del archivo
    let answer = buildAnswerValidate(finalText, finalLinks, files);
      resolve(answer);
  });

const deleteExtra = (links) => {
  let finalLinks = [];
  if (links) {
    //a partir de un conjunto de texto retorna solo el texto quitando [] y )
    links.forEach((link) => {
      finalLinks.push(link.replace(/[\[\]\)]/g, ""));
    });
    return finalLinks;
  } else{
    return finalLinks
  }
}

//función para construir la respuesta teniendo en cuenta el formato de objeto {href,text,file}
const buildAnswerValidate = (text, links, file) => {
  let answer = [];
  //se valida si las variables text y link tienen contenido
  if (links.length>0) {
    //a partir del conjunto de links se va creando y añadiendo a un arreglo la respuesta en el formato de {href,text,file}
    answer = links.map((link, index) => {
      return axios
        .get(link)
        .then(function (response) {
          return {
            href: link,
            text: text[index],
            file: file,
            statusCode: response.status,
            status: "Ok"
          };
        })
        .catch(function (error) {
          return {
            href: link,
            text: text[index],
            file: file,
            statusCode: error.response.status,
            status: "Fail"
          };
        });
    });
    return Promise.all(answer);
  } else{
    return ({Error: `No hay links en ${file}`})
  }
};

const buildAnswer = (text, links, file) => {
  const answer = [];
  links.forEach((link, index) => {
    answer.push({
      href: link,
      text: text[index],
      file: file,
    });
  });
};

module.exports = {
  existPath,
  absolutePath,
  isDirectory,
  pathExtName,
  mdFiles,
  readFiles,
  linksFiles,
};

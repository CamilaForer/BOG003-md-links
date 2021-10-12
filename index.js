
const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');
const { mdlinks } = require('./mdLinks.js')

console.log( mdlinks('./md/', null))

// console.log(fs.readFileSync('./md/Otro.md',{ encoding: 'utf-8', flag: 'r' }))
// Devuelve una matriz con los argumentos de la linea de comandos pasados 
// let route = process.argv
//   console.log(route);

// // Lee el contenido del archivo 
// fs.readFile('Ejemploo.md', {encoding: 'utf8'},function(error, datos){
//         if(error){
//           console.log(error);
//         } else {
//           console.log('Datos leídos');
//           console.log(datos);
//         }
//       });

// Extensión del archivo 
// let extFile= path.extname('./md/Ejemplo.md');{
//   console.log(extFile);
// }

// const mdlinks = (userPath, option = { validate: false }) => new Promise ((resolve, reject) =>{
//   const invalidPath = 'Ingrese una ruta valida';
//   const notMd ='No se encontraron archivos .md';
//   const pathAbsolute = pathResolve(userPath);
// });

//Lee una ruta, muestra los archivos dentro del directorio 
// const files=fs.readdirSync('./md');
// console.log(files);

// Muestra el path absoluto del archivo 
// const files= __dirname + "Ejemplo.md";
// console.log(files)

// Vuelve la ruta absoluta
// const file= path.resolve('abc/def','ghi/jkl')
// console.log(file)


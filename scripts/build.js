'use strict';
// Verifica que los archivos imprescindibles existan; la creación del ZIP para Azure
// se realizará posteriormente en azure-pipelines.yml durante la fase de CI.
const fs = require('node:fs');
for (const file of ['server.js', 'public/index.html', 'public/css/styles.css', 'public/js/main.js']) {
  if (!fs.existsSync(file)) throw new Error(`Archivo faltante: ${file}`);
}
console.log('Validación de archivos de aplicación completada.');

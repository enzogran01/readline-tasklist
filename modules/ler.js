const fs = require('fs');

module.exports = (caminho) => fs.readFileSync(caminho, 'utf-8');
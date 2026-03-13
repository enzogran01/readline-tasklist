const fs = require('fs').promises;

module.exports = (caminho) => fs.unlink(caminho);
const data = require('./data');

module.exports = () => {
    const hora = data.getHours();

    if(hora >= 6 && hora < 12) {
        return "Bom dia";
    }
    if (hora < 18) {
        return "Boa tarde"
    } else {
        return "Boa noite";
    }
}
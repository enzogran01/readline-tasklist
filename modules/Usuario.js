module.exports = class Usuario {
    static #contador = 1;

    constructor(nome) {
        this.id = Usuario.#contador++;
        this.nome = nome;
    }
}
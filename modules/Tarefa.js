module.exports = class Tarefa {
    static #contador = 1;

    constructor(descricao) {
        this.id = Tarefa.#contador++;
        this.concluida = false;
        this.descricao = descricao;
    }

    concluir() {
        this.concluida = true;
    }
}
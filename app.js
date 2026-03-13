// modulos do node
const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });
const fs = require('fs');

// meus modulos
const escrever = require('./modules/escrever');
const ler = require('./modules/ler');
const concluir = require('./modules/concluir');
const Tarefa = require('./modules/Tarefa');
const Usuario = require('./modules/Usuario');
const data = require('./modules/data');
const mesFormatado = require('./modules/mesFormatado');
const horaFormatada = require('./modules/horaFormatada');
const { setTimeout } = require('node:timers/promises');

let tarefas = [];

// se usuario.json estiver vazio, cadastra usuário
async function iniciar() {
    let selectedOption;

    if (fs.statSync('./usuario.json').size == 0) {
        console.log("=================");
        const answer = await rl.question("Qual o seu nome? ");
        escrever('./usuario.json', JSON.stringify(new Usuario(answer)));
    }

    exibeMenu();
}

async function criaTarefa() {
    const descricao = await rl.question("Digite uma DESCRIÇÃO para sua tarefa? ");
    const tarefa = new Tarefa(descricao);
    tarefas.push(tarefa);
    escrever('./tarefas.json', JSON.stringify(tarefas));
    console.log("Tarefa registrada :D");
    await setTimeout(2000);
    console.clear();
    exibeMenu();
}

async function exibeTarefas() {
    const tarefasJSON = await ler('./tarefas.json');
    const tarefasARR = JSON.parse(tarefasJSON);
    if (tarefasARR.length === 0) {
        erro("Não existem tarefas.");
    }
    tarefasARR.forEach(tarefa => {
        console.log(`${tarefa.id} [${tarefa.concluida ? "X" : ""}] ${tarefa.descricao}`);
    });
    console.log("==========================");
    const press = await rl.question("Pressione ENTER para resumir. ");
    exibeMenu();
}

async function completaTarefa() {
    const tarefasJSON = await ler('./tarefas.json');
    const tarefasARR = JSON.parse(tarefasJSON);
    let tarefaEscolhida;

    if (tarefasARR.length === 0) {
        erro("Não existem tarefas.");
        return;
    }
    tarefasARR.forEach(tarefa => {
        console.log(`${tarefa.id} [${tarefa.concluida ? "X" : ""}] ${tarefa.descricao}`);
    });

    const num = await rl.question("Qual o NÚMERO da tarefa que deseja concluir? ");
    if (isNaN(Number(num))) {
        erro("Caractér inválido.");
        return;
    } 
    tarefaEscolhida = tarefasARR.find(tarefa => tarefa.id === num);
    if (tarefaEscolhida) {

    }
}

async function exibeMenu() {
    const usuarioJSON = await ler('./usuario.json');
    const usuarioOBJ = JSON.parse(usuarioJSON);

    console.log("| ========================");
    console.log(`| ${horaFormatada()}, ${usuarioOBJ.nome}!`);
    console.log(`| Hoje é dia ${data.getDate()} de ${mesFormatado()} de ${data.getFullYear()}`);
    console.log(`| São ${data.getHours()}:${zeroAEsquerda(data.getMinutes())}`);
    console.log("| ========================");
    console.log("| [1] Criar tarefa");
    console.log("| [2] Visualizar tarefas");
    console.log("| [3] Completar tarefa");
    console.log("| [4] Excluir conta");
    console.log("| [5] Fechar programa");
    console.log("| ========================");

    do {
        selectedOption = await rl.question("O que deseja fazer, mestre? ");
    } while (selectedOption !== "1" && selectedOption !== "2" && selectedOption !== "3" && selectedOption !== "4" && selectedOption !== "5")
    
    switch (selectedOption) {
        case "1":
            await criaTarefa();
            break;
        case "2":
            exibeTarefas();
            break;
        case "3":
            completaTarefa();
            break;
        case "4":
            excluiConta();
            break;
        default:
            rl.close();
            break;
    }
}

function erro(msg) {
    console.log(msg);
    exibeMenu();
    return;
}

const zeroAEsquerda = n => n < 10 ? "0" + n : n;

iniciar();

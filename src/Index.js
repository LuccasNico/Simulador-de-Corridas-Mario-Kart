const { start } = require('repl');

class personagem{
    constructor(nome,velocidade,manobrabilidade,poder){
        this.nome = nome;
        this.velocidade = velocidade;
        this.manobrabilidade = manobrabilidade;
        this.poder = poder;
    }
}

let mario = new personagem("Mario", 4,3,3);
let peach = new personagem("Peach", 3,4,2);
let yoshi = new personagem("Yoshi", 2,4,3);
let bowser = new personagem("Bowser", 5,2,5);
let luigi = new personagem("Luigi", 3,4,4);
let dk = new personagem("Donkey Kong", 2,2,5);

function choseCharacter(choseChar){
    switch(choseChar.toLowerCase()){
        case 'mario': return mario;
        case 'peach': return peach;
        case 'yoshi': return yoshi;
        case 'bowser': return bowser;
        case 'luigi': return luigi;
        case 'donkey kong' : 
        case 'dk': return dk;
        default: return null;
    }
}
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
function questionAsync(prompt) {// Função para usar readline com Promises
    return new Promise((resolve) => {
        readline.question(prompt, resolve);
    });
}
async function askPlayer1() {// Função para perguntar ao Player 1 e validar a escolha
    let chosePlayer1 = await questionAsync('Escolha um personagem para o Player 1: Mario, Peach, Yoshi, Bowser, Luigi ou Donkey Kong? ');
    let player1 = choseCharacter(chosePlayer1);
    if (player1 === null) {
        console.log("Personagem inválido. Por favor, escolha um personagem válido.");
        return askPlayer1();  // Recursão para repetir
    }
    console.log(`Player 1 : ${player1.nome}`);
    return player1;  // Retorna o personagem para uso posterior
}
async function askPlayer2() {// Função para perguntar ao Player 2 e validar a escolha
    let chosePlayer2 = await questionAsync('Escolha um personagem para o Player 2: Mario, Peach, Yoshi, Bowser, Luigi ou Donkey Kong? ');
    let player2 = choseCharacter(chosePlayer2);
    if (player2 === null) {
        console.log("Personagem inválido. Por favor, escolha um personagem válido.");
        return askPlayer2();
    }
    console.log(`Player 2 : ${player2.nome}`);
    return player2;
}
async function rollD6Dice(){
    return Math.floor(Math.random() * 6) + 1;
}
async function getRandomTrack(){// Função para obter um tipo de pista aleatória
    let type = Math.random();
    let result 
    switch(true){
        case type < 0.33: result = "Reta"; break;
        case type < 0.66: result = "Curva"; break;
        default: result = "Confronto"; break;
    }
    return result;
}
async function startRace() {
    console.log("\n🚩   A corrida começou! 🚩");
    for (let race = 1; race <= 5; race++){
        console.log(`\n🏎️   Round ${race}  `);
        let track = await getRandomTrack();
        console.log(`Pista: ${track}`);
    }
}
(async function main() {
    console.log("🏁   Bem-vindo ao jogo de corrida de Mario Kart! 🏁");
    console.log("🚨   Cada jogador deve escolher um personagem para competir. 🚨\n");
    await askPlayer1();
    await askPlayer2();
    await startRace();
})();

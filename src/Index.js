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

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
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
async function askPlayer1() {
    readline.question('Escolha um personagem para o Player 1: Mario, Peach, Yoshi, Bowser, Luigi ou Donkey Kong? ', chosePlayer1 => {
        let player1 = choseCharacter(chosePlayer1);
        if (player1 === null) {
            console.log("Personagem inválido. Por favor, escolha um personagem válido.");
            return askPlayer1();
        }
        console.log(`Player 1 : ${player1.nome}`);
        readline.close();
    });
}
async function askPlayer2() {
    readline.question('Escolha um personagem para o Player 2: Mario, Peach, Yoshi, Bowser, Luigi ou Donkey Kong? ', chosePlayer2 => {
        let player2 = choseCharacter(chosePlayer2);
        if (player2 === null) {
            console.log("Personagem inválido. Por favor, escolha um personagem válido.");
            return askPlayer2();
        }
        console.log(`Player 2 : ${player2.nome}`);
        readline.close();
    });
}
async function rollD6Dice(){
    return Math.floor(Math.random() * 6) + 1;
}

(async function main() {
    console.log("🏁   Bem-vindo ao jogo de corrida de Mario Kart! 🏁");
    console.log("🏎️   Cada jogador deve escolher um personagem para competir. 🏎️\n");
    askPlayer1();
    askPlayer2();
})();

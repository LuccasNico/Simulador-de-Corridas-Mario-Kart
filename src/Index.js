const { start } = require('repl');

class Character {
    constructor(name, speed, handling, power) {
        this.name = name;
        this.speed = speed;
        this.handling = handling;
        this.power = power;
        this.score = 0;
    }
}

let mario = new Character("Mario", 4, 3, 3);
let peach = new Character("Peach", 3, 4, 2);
let yoshi = new Character("Yoshi", 2, 4, 3);
let bowser = new Character("Bowser", 5, 2, 5);
let luigi = new Character("Luigi", 3, 4, 4);
let dk = new Character("Donkey Kong", 2, 2, 5);

function chooseCharacter(chosenChar) {
    switch (chosenChar.toLowerCase()) {
        case 'mario': return mario;
        case 'peach': return peach;
        case 'yoshi': return yoshi;
        case 'bowser': return bowser;
        case 'luigi': return luigi;
        case 'donkey kong':
        case 'dk': return dk;
        default: return null;
    }
}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function questionAsync(prompt) { // Function to use readline with Promises
    return new Promise((resolve) => {
        readline.question(prompt, resolve);
    });
}

async function askPlayer1() { // Function to ask Player 1 and validate choice
    let chosenPlayer1 = await questionAsync('Choose a character for Player 1: Mario, Peach, Yoshi, Bowser, Luigi or Donkey Kong? ');
    let player1 = chooseCharacter(chosenPlayer1);
    if (player1 === null) {
        console.log("Invalid character. Please choose a valid character.");
        return askPlayer1();  // Recursion to repeat
    }
    console.log(`Player 1: ${player1.name}`);
    return player1;  // Returns the character for later use
}

async function askPlayer2() { // Function to ask Player 2 and validate choice
    let chosenPlayer2 = await questionAsync('Choose a character for Player 2: Mario, Peach, Yoshi, Bowser, Luigi or Donkey Kong? ');
    let player2 = chooseCharacter(chosenPlayer2);
    if (player2 === null) {
        console.log("Invalid character. Please choose a valid character.");
        return askPlayer2();
    }
    console.log(`Player 2: ${player2.name}`);
    return player2;
}

async function rollD6Dice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function skillCheck(character, trackType) { // Function to calculate skill check result based on track type
    if (trackType === "Straight") {
        return character.speed;
    } else if (trackType === "Curve") {
        return character.handling;
    } else if (trackType === "Confrontation") {
        return character.power;
    } else return 0;
}

async function getRandomTrack() { // Function to get a random track type
    let type = Math.random();
    let result;
    switch (true) {
        case type < 0.33: result = "Straight"; break;
        case type < 0.66: result = "Curve"; break;
        default: result = "Confrontation"; break;
    }
    return result;
}

async function startRace(player1, player2) {
    console.log("\n🚩 The race has started! 🚩");
    for (let round = 1; round <= 5; round++) {
        console.log(`\n🏎️ Round ${round} `);
        let track = await getRandomTrack();
        console.log(`Track: ${track}`);
        let rollPlayer1 = await rollD6Dice();
        let rollPlayer2 = await rollD6Dice();
        let skillCheckPlayer1 = await skillCheck(player1, track) + rollPlayer1;
        let skillCheckPlayer2 = await skillCheck(player2, track) + rollPlayer2;

        console.log(`Player 1 (${player1.name}) rolled ${rollPlayer1} + ${(await skillCheck(player1, track))} = ${skillCheckPlayer1} on the dice 🎲`);
        console.log(`Player 2 (${player2.name}) rolled ${rollPlayer2} + ${(await skillCheck(player2, track))} = ${skillCheckPlayer2} on the dice 🎲\n`);
        // Depending on the track type, the skill check result is compared and the round or confrontation winner is determined. In case of a confrontation, the loser has their score penalized, but it cannot go negative.
        if (track === "Confrontation") {
            if (skillCheckPlayer1 > skillCheckPlayer2) {
                console.log(`Player 1 (${player1.name}) won the confrontation! 🏆`);
                if (player2.score > 0) player2.score--; // Penalizes the losing player in the confrontation, but does not allow the score to go negative
            } else if (skillCheckPlayer2 > skillCheckPlayer1) {
                console.log(`Player 2 (${player2.name}) won the confrontation! 🏆`);
                if (player1.score > 0) player1.score--; // Penalizes the losing player in the confrontation, but does not allow the score to go negative
            } else {
                console.log("The confrontation ended in a tie!");
            }
        } else {
            if (skillCheckPlayer1 > skillCheckPlayer2) {
                console.log(`Player 1 (${player1.name}) won the round! 🏆`);
                player1.score++;
            } else if (skillCheckPlayer2 > skillCheckPlayer1) {
                console.log(`Player 2 (${player2.name}) won the round! 🏆`);
                player2.score++;
            } else {
                console.log("The round ended in a tie!");
            }
        }
        console.log("\n--------------------------------------------------------------------------------------\n");
        console.log(`Scoreboard: \nPlayer 1 (${player1.name}) - ${player1.score} \nPlayer 2 (${player2.name}) - ${player2.score}`);
    }
    console.log("\n🏁 The race has ended! 🏁");
    return [player1.score, player2.score];
}

(async function main() {
    console.log("🏁 Welcome to the Mario Kart racing game! 🏁");
    console.log("🚨 Each player must choose a character to compete. 🚨\n");
    let player1 = await askPlayer1();
    let player2 = await askPlayer2();
    let result = await startRace(player1, player2);
    if (result[0] > result[1]) {
        console.log(`\n🎉 Player 1 (${player1.name}) is the big winner! Congratulations! 🎉`);
    } else if (result[1] > result[0]) {
        console.log(`\n🎉 Player 2 (${player2.name}) is the big winner! Congratulations! 🎉`);
    } else {
        console.log("\n🤝 The race ended in a tie! Congratulations to both players! 🤝");
    }

})();

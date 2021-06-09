const { suggest } = require("./suggest");
const { generateRandomText } = require("./randomTextGenerator");
const fs = require("fs");
const prompt = require("prompt-sync")();

const fileName = "long.txt";
var text = fs.readFileSync(fileName, "utf8");


const words = prompt("Please write some words to get suggestions: ");
console.log("Suggestions: ");
console.log(suggest(words, text));


const number = prompt("How many words should random text contain? ");
console.log("Random text: ")
console.log(generateRandomText(parseInt(number)));
const { suggest } = require("./suggest");
const fs = require("fs");
const prompt = require("prompt-sync")();

const fileName = "long.txt";
var text = fs.readFileSync(fileName, "utf8");


const words = prompt("Please write some words to get suggestions: ");
console.log("Suggestions: ");
console.log(suggest(words, text));
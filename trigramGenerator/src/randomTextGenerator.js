const { ngramGenerator } = require("./ngramGenerator");
const fs = require("fs");
const path = require("path");
const documentText = fs.readFileSync(path.resolve(__dirname, "./long.txt"), "utf-8");
//const documentText = fs.readFileSync(fileName, "utf8");
const trigramMap = ngramGenerator(documentText, 3);
const bigramMap = ngramGenerator(documentText, 2);

function generateRandomText (num) {
  if (typeof num !== "number") throw new Error();

  let first_chunk = generateFirstChunk();
  let sentence = generateSentence(first_chunk, num);

  if (sentence[sentence - 1] != ".") sentence = expandSentenceUntilDotFound(sentence);

  return sentence.join(" ");
}

function getRandomElement (array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateFirstChunk () {
    let initialWord = getRandomElement(bigramMap.get("."));
    let chunk = [initialWord];
    chunk.push(getRandomElement(bigramMap.get(initialWord)));
    return chunk;
}

function generateSentence(first_chunk, num) {
    let sentence = first_chunk;
    while (sentence.length != num) {
      sentence.push(getRandomWord(sentence));
    }
    return sentence;
}

function getRandomWord (sentence) {
    return getRandomElement(trigramMap.get(sentence.slice(sentence.length - 2, sentence.length).join(" "))  || []);
}

function expandSentenceUntilDotFound (sentence) {
    let expandedSentence = sentence;
    while (expandedSentence[expandedSentence.length - 1] != ".") {
        expandedSentence.push(getRandomWord(expandedSentence));
    }
    return expandedSentence;
}

  
module.exports = {
    generateRandomText
};
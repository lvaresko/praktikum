const { ngramGenerator } = require("./ngramGenerator");

function suggest(words, text) {
  if (Object.values(arguments).some((n) => typeof n !== "string")) throw new Error();
  
  const slicedWords = words.split(" ");

  const ngramMap = ngramGenerator(text, slicedWords.length + 1);

  let suggestion_array = sortSuggestions(countOccurrenceOfWords(ngramMap, words));

  return suggestion_array.slice(0, 5).map((el) => Object.keys(el)[0]);
}

function sortSuggestions(object) {
  let array = [];
  Object.keys(object).forEach((key) => {
    array.push({ [key]: object[key] });
  });

  return array.sort((a, b) =>
    parseFloat(parseFloat(b[Object.keys(b)[0]] - a[Object.keys(a)[0]]))
  );
}

function countOccurrenceOfWords(object, words) {
  return object.has(words)
    ? object.get(words).reduce((acc, value) => {
        acc[value] = (acc[value] || 0) + 1;
        return acc;
      }, {})
    : {};
}


module.exports = {
  suggest,
  countOccurrenceOfWords,
  sortSuggestions
};


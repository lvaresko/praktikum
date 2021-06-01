const { ngramGenerator } = require("./ngramGenerator");

const fs = require("fs");
const fileName = "datoteka1.txt";
var text = fs.readFileSync(fileName, "utf8");

console.log(ngramGenerator(text));

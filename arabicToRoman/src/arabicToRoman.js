let arabicToRomanMap = {
  0: "",
  1: "I",
  4: "IV",
  5: "V",
  9: "IX",
  10: "X",
  40: "XL",
  50: "L",
  90: "XC",
  100: "C",
  400: "CD",
  500: "D",
  900: "CM",
  1000: "M",
};

let boundaries = Object.keys(arabicToRomanMap)
  .map((x) => parseInt(x))
  .sort((a, b) => b - a);

function arabicToRoman(arabic) {
  let base = getBase(arabic);
  if (base.arabic == arabic) return base.roman;
  return base.roman + arabicToRoman(arabic - base.arabic);
}

function getBase(arabic) {
  let biggestNumberAvailable = boundaries.find((val) => val <= arabic);
  return {
    arabic: biggestNumberAvailable,
    roman: arabicToRomanMap[biggestNumberAvailable],
  };
}

module.exports = {
  arabicToRoman,
};

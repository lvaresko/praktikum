var chai = require("chai");
var expect = chai.expect;
const { arabicToRoman } = require("../arabicToRoman");

describe("arabic to roman function tests", function () {
  it("arabicToRoman should be a function", function () {
    expect(arabicToRoman).to.be.a("function");
  });

  it("should return I for input 1", function () {
    expect(arabicToRoman(1)).to.equal("I");
  });

  it("should return II for input 2", function () {
    expect(arabicToRoman(2)).to.equal("II");
  });

  it("should return III for input 3", function () {
    expect(arabicToRoman(3)).to.equal("III");
  });

  it("should return IV for input 4", function () {
    expect(arabicToRoman(4)).to.equal("IV");
  });

  it("should return V for input 5", function () {
    expect(arabicToRoman(5)).to.equal("V");
  });

  it("should return VI for input 6", function () {
    expect(arabicToRoman(6)).to.equal("VI");
  });

  it("should return IX for input 9", function () {
    expect(arabicToRoman(9)).to.equal("IX");
  });

  it("should return X for input 10", function () {
    expect(arabicToRoman(10)).to.equal("X");
  });

  it("should return XXIV for input 24", function () {
    expect(arabicToRoman(24)).to.equal("XXIV");
  });

  it("should return L for input 50", function () {
    expect(arabicToRoman(50)).to.equal("L");
  });

  it("should return C for input 100", function () {
    expect(arabicToRoman(100)).to.equal("C");
  });

  it("should return D for input 500", function () {
    expect(arabicToRoman(500)).to.equal("D");
  });

  it("should return M for input 1000", function () {
    expect(arabicToRoman(1000)).to.equal("M");
  });
});

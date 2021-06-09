var chai = require("chai");
var expect = chai.expect;
const { generateRandomText } = require("../randomTextGenerator");

describe("random text generator tests", function () {

    it("generateRandomText should be a function", function () {
      expect(generateRandomText).to.be.a("function");
    });

    it("should throw error if argument not number", function () {
        expect(() => generateRandomText("a")).to.throw();
    });

    it("should return a string", function () {
        expect(generateRandomText(3)).to.be.a("string");
    });
});
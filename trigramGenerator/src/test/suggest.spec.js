var chai = require("chai");
var expect = chai.expect;
const {
  suggest,
  countOccurrenceOfWords,
  sortSuggestions,
} = require("../suggest");
const { ngramGenerator } = require("../ngramGenerator");

describe.skip("suggestion tests", function () {

  it("suggest should be a function", function () {
    expect(suggest).to.be.a("function");
  });

  it("should throw error if arguments are not strings", function () {
    expect(() => suggest(1, 1)).to.throw();
  });

  it("should return an array", function () {
    expect(suggest("I", "I am")).to.be.an("array");
  });

  it("should return empty array if key key doesn't exist", function () {
    expect(suggest("two", "example one")).to.be.eql([]);
  });

  it("should return correct array", function () {
    expect(suggest("yes", "yes no yes yes maybe yes yes")).to.be.eql(["yes", "no", "maybe"]);
  });

  it("should return correct array of max 5 elements sorted by a number of occurence in text", function () {
    expect(suggest("one", "one element one box one element one box one list one dot one dot one question one point")).to.eql(["element", "box", "dot", "list", "question"]);
  });
});

describe.skip("word and sorting counting tests", function () { 
  it("should count occurence of words in given text", function () {
    expect(countOccurrenceOfWords(ngramGenerator("I wish I may I wish", 2), "I")).to.eql({"wish": 2, "may": 1});
    expect(countOccurrenceOfWords(ngramGenerator("I wish I may I wish I might I wish", 2), "I")).to.eql({"wish": 3, "may": 1, "might": 1});
  });

  it("should put object values into array and sort them", function () {
    expect(sortSuggestions(countOccurrenceOfWords(ngramGenerator("I wish I may I may", 2), "I"))).to.eql([{"may": 2}, {"wish": 1}]);
  });

  it("should count occurence of words in given text and sort them by the number of occurrence", function () {
    expect(countOccurrenceOfWords(ngramGenerator("I wish I may I wish I might I may I might I might", 2), "I")).to.eql({"might": 3, "may": 2, "wish": 2});
  });
});

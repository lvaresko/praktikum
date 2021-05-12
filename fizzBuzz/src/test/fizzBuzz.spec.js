var assert = require('assert');
var chai = require("chai");
var expect = chai.expect;
var should = chai.should;
const fizzBuzz = require("../fizzBuzz");

describe('fizz buz problem', function() {
    it('fizzBuzz should be a function', function () {
        fizzBuzz(1);
    });
    it("function should throw error if argument is not a number", function(){
        expect(()=>fizzBuzz("pero")).to.throw(Error);
    });
    it("function should accept number as an argument", function(){
        fizzBuzz(1);
    });
    it("should return Fizz if number is dividible by 3", function() {
        expect(fizzBuzz(3)).to.equal("Fizz");
        expect(fizzBuzz(6)).to.equal("Fizz");
    });
    it("should return Buzz if number is dividible by 5", function() {
        expect(fizzBuzz(5)).to.equal("Buzz");
    });
    it("should return Suzz if number is divisible by 7", function() {
        expect(fizzBuzz(7)).to.equal("Suzz");
        expect(fizzBuzz(14)).to.equal("Suzz");
    });
    it("should return FizzBuzz if number is dividible by 3 & 5", function() {
        expect(fizzBuzz(30)).to.equal("FizzBuzz");
    });
    it("should return BuzzSuzz if number is dividible by 5 & 7", function() {
        expect(fizzBuzz(35)).to.equal("BuzzSuzz");
    });
    it("should return FizzSuzz if number is dividible by 3 & 7", function() {
        expect(fizzBuzz(21)).to.equal("FizzSuzz");
    });
    it("should return FizzBuzzSuzz if number is dividible by 3, 5 & 7", function() {
        expect(fizzBuzz(105)).to.equal("FizzBuzzSuzz");
    });
    it("if number is not divisible by 3, 5 or 7 should return empty string", function() {
        expect(fizzBuzz(4)).to.equal("");
    });
});
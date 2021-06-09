var chai = require("chai");
var expect = chai.expect;
const {
  ngramGenerator,
  generateChunks,
  handleWhitespace,
} = require("../ngramGenerator");

describe.skip("ngramGenerator tests", function () {
  it("ngramGenerator should be a function", function () {
    expect(ngramGenerator).to.be.a("function");
  });

  context("wrong input", function () {
    it("should throw error if no argument", function () {
      expect(() => ngramGenerator()).to.throw();
    });

    it("should throw error if first argument is not a string and second argument is not an number", function () {
      expect(() => ngramGenerator(5, 1)).to.throw();
      expect(() => ngramGenerator([], 1.5)).to.throw();
      expect(() => ngramGenerator({}, "aaa")).to.throw();
    });
  });

  it("should return an object", function () {
    expect(typeof ngramGenerator("", 0)).to.equal("object");
  });

  it("should return empty map for 2 words input if trigram is expected", function () {
    expect(ngramGenerator("I wish", 3)).to.eql(new Map());
  });

  it("should return correct trigram for 3 words input", function () {
    expect(ngramGenerator("I wish I", 3)).to.eql(new Map([["I wish", ["I"]]]));
    expect(ngramGenerator("I may I", 3)).to.eql(new Map([["I may", ["I"]]]));
  });

  it("should return correct trigram for 4 words input", function () {
    expect(ngramGenerator("I wish I may", 3)).to.eql(
      new Map([
        ["I wish", ["I"]],
        ["wish I", ["may"]],
      ])
    );
  });

  it("should return correct trigram for 5 words input", function () {
    expect(ngramGenerator("I wish I may I", 3)).to.eql(
      new Map([
        ["I wish", ["I"]],
        ["wish I", ["may"]],
        ["I may", ["I"]],
      ])
    );
  });

  it("should return correct trigram for 6 words input", function () {
    expect(ngramGenerator("I wish I may I wish", 3)).to.eql(
      new Map([
        ["I wish", ["I"]],
        ["wish I", ["may"]],
        ["I may", ["I"]],
        ["may I", ["wish"]],
      ])
    );
  });

  it("should return correct trigram for 7 words input", function () {
    expect(ngramGenerator("I wish I may I wish I", 3)).to.eql(
      new Map([
        ["I wish", ["I", "I"]],
        ["wish I", ["may"]],
        ["I may", ["I"]],
        ["may I", ["wish"]],
      ])
    );
  });

  const eightWordsInputTrigram = new Map([
    ["I wish", ["I", "I"]],
    ["wish I", ["may", "might"]],
    ["may I", ["wish"]],
    ["I may", ["I"]],
  ]);

  it("should return correct trigram for 8 words input", function () {
    expect(ngramGenerator("I wish I may I wish I might", 3)).to.eql(
      eightWordsInputTrigram
    );
  });

  it("should return correct trigram for 8 words input with whitespaces", function () {
    expect(ngramGenerator("I wish\n I may I\n\r wish   I might  ", 3)).to.eql(
      eightWordsInputTrigram
    );
  });

  it("should return empty map for one word input if dvigram is expected", function () {
    expect(ngramGenerator("I", 2)).to.eql(new Map());
  });

  it("should return correct dvigram for 2 words input", function () {
    expect(ngramGenerator("one two", 2)).to.eql(new Map([["one", ["two"]]]));
  });

  it("should return correct dvigram for 3 words input", function () {
    expect(ngramGenerator("one two three", 2)).to.eql(
      new Map([
        ["one", ["two"]],
        ["two", ["three"]],
      ])
    );
  });
});

describe.skip("text parsing", function () {
  it("should be letter capitalisation agnostic", function () {
    var capitalised = ngramGenerator("Testing capitalisation agnostic", 3);
    var uppercase = ngramGenerator("TESTING CAPITALISATION AGNOSTIC", 3);
    expect(capitalised).to.eql(uppercase);
  });

  it("letter 'I' should always be uppercase", function () {
    expect(ngramGenerator("string with I and I", 3)).to.eql(
      new Map([
        ["string with", ["I"]],
        ["with I", ["and"]],
        ["I and", ["I"]],
      ])
    );
  });

  it("handles dot(.) as a separate word", function () {
    expect(ngramGenerator("I am.", 3)).to.eql(new Map([["I am", ["."]]]));
  });

  it("handles question mark as a separate word", function () {
    expect(ngramGenerator("Am I right?", 3)).to.eql(
      new Map([
        ["am I", ["right"]],
        ["I right", ["?"]],
      ])
    );
  });

  it("handles exclamation mark as a separate word", function () {
    expect(ngramGenerator("Listen Marta!", 3)).to.eql(
      new Map([["listen marta", ["!"]]])
    );
  });

  it("handles ?! as a separate word", function () {
    expect(ngramGenerator("Can we?!", 3)).to.eql(new Map([["can we", ["?!"]]]));
  });

  it("handles comma as a separate word", function () {
    expect(ngramGenerator("Hey, marta", 3)).to.eql(
      new Map([["hey ,", ["marta"]]])
    );
  });

  it("handles elipsis(...) as a separate word", function () {
    expect(ngramGenerator("marta, ivana...", 3)).to.eql(
      new Map([
        ["marta ,", ["ivana"]],
        [", ivana", ["..."]],
      ])
    );
  });

  it("handles colon and semicolon as a separate word", function () {
    expect(ngramGenerator("marta: hello world;", 3)).to.eql(
      new Map([
        ["marta :", ["hello"]],
        [": hello", ["world"]],
        ["hello world", [";"]],
      ])
    );
  });
});

describe.skip("whitespace handler", function () {
  it("should replace multiple whitespaces with single space", function () {
    expect(handleWhitespace(" I    wish ")).to.eql("I wish");
  });

  it("should replace \t with single space", function () {
    expect(handleWhitespace("I\twish\t I")).to.eql("I wish I");
  });

  it("should replace \n with single space", function () {
    expect(handleWhitespace("\nI\nwish")).to.eql("I wish");
  });

  it("should replace \r with single space", function () {
    expect(handleWhitespace("I\r\rwish I\rmay")).to.eql("I wish I may");
  });

  it("should replace \n\r with single space", function () {
    expect(handleWhitespace("\n\rI wish   I \n\r may I wish")).to.eql(
      "I wish I may I wish"
    );
  });
});

describe.skip("generate chunks", function () {
  it("should return correct array for less than 3 words input", function () {
    expect(generateChunks(["I", "wish"])).to.eql([]);
  });

  it("should return correct array for 3 words input", function () {
    expect(generateChunks(["I", "wish", "I"])).to.eql([["I", "wish", "I"]]);
  });

  it("should return correct array for 4 words input", function () {
    expect(generateChunks(["I", "wish", "I", "may"])).to.eql([
      ["I", "wish", "I"],
      ["wish", "I", "may"],
    ]);
  });
});

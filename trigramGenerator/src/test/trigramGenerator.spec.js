var chai = require("chai");
var expect = chai.expect;
const { trigramGenerator, generateChunks } = require("../trigramGenerator");

describe('trigramGenerator TDD', function() {
    context('trigram generator', function () {

        it('trigramGenerator should be a function', function () {
            expect(trigramGenerator).to.be.a('function');
        });

        context('wrong input', function () {
            it('should throw error if no argument', function () {
                expect(() => trigramGenerator()).to.throw();
            });
        
            it('should throw error if argument is not a string', function () {
                expect(() => trigramGenerator(5)).to.throw();
                expect(() => trigramGenerator([])).to.throw();
                expect(() => trigramGenerator({})).to.throw();
            });
        });

        it('should return an object', function () {
            expect(typeof trigramGenerator('')).to.equal('object');
        });
        
        it('should return empty map for 2 words input', function () {
            expect(trigramGenerator('I wish')).to.eql(new Map());
        });

        it('should return correct trigram for 3 words input', function () {
            console.log(trigramGenerator('I wish I'));
            expect(trigramGenerator('I wish I')).to.eql(new Map([['I wish', ['I']]]));
            expect(trigramGenerator('I may I')).to.eql(new Map([['I may', ['I']]]));
        });

        it('should return correct trigram for 4 words input', function () {
            console.log(trigramGenerator('I wish I may'));
            expect(trigramGenerator('I wish I may')).to.eql(new Map([['I wish', ['I']], ['wish I', ['may']]]));
        });

        it('should return correct trigram for 5 words input', function () {
            expect(trigramGenerator('I wish I may I')).to.eql(new Map([['I wish', ['I']], ['wish I', ['may']], ['I may', ['I']]]));
        });

        it('should return correct trigram for 6 words input', function () {
            expect(trigramGenerator('I wish I may I wish')).to.eql(new Map([['I wish', ['I']], ['wish I', ['may']], ['I may', ['I']], ['may I', ['wish']]]));
        });

        it('should return correct trigram for  words input', function () {
            expect(trigramGenerator('I wish I may I wish I')).to.eql(new Map([['I wish', ['I', 'I']], ['wish I', ['may']], ['I may', ['I']], ['may I', ['wish']]]));
        });

        it('should return correct trigram for 8 words input', function () {
            //console.log(trigramGenerator('I wish I may I wish I might'));
            expect(trigramGenerator('I wish I may I wish I might')).to.eql(new Map([['I wish', ['I','I']], ['wish I', ['may','might']], ['may I', ['wish']], ['I may', ['I']]]));
        });
    });

    context.skip('generateChunks', function () {
        it('should return correct array for less than 3 words input', function () {
            expect(generateChunks(['I','wish'])).to.eql([]);
        });

        it('should return correct array for 3 words input', function () {
            console.log(generateChunks(['I','wish','I']));
            expect(generateChunks(['I','wish','I'])).to.eql([['I','wish','I']]);
        });

        it('should return correct array for 4 words input', function () {
            expect(generateChunks(['I','wish','I','may'])).to.eql([['I','wish','I'],['wish','I','may']]);
        });
    });

});




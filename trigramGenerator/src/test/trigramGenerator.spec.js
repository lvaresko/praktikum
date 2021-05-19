var chai = require("chai");
var expect = chai.expect;
const { trigramGenerator, generateChunks, whitespaceHandler } = require("../trigramGenerator");


describe.skip('trigramGenerator basic', function() {

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
        expect(trigramGenerator('I wish I')).to.eql(new Map([['I wish', ['I']]]));
        expect(trigramGenerator('I may I')).to.eql(new Map([['I may', ['I']]]));
    });

    it('should return correct trigram for 4 words input', function () {
        expect(trigramGenerator('I wish I may')).to.eql(new Map([['I wish', ['I']], ['wish I', ['may']]]));
    });

    it('should return correct trigram for 5 words input', function () {
        expect(trigramGenerator('I wish I may I')).to.eql(new Map([['I wish', ['I']], ['wish I', ['may']], ['I may', ['I']]]));
    });

    it('should return correct trigram for 6 words input', function () {
        expect(trigramGenerator('I wish I may I wish')).to.eql(new Map([['I wish', ['I']], ['wish I', ['may']], ['I may', ['I']], ['may I', ['wish']]]));
    });

    it('should return correct trigram for 7 words input', function () {
        expect(trigramGenerator('I wish I may I wish I')).to.eql(new Map([['I wish', ['I', 'I']], ['wish I', ['may']], ['I may', ['I']], ['may I', ['wish']]]));
    });

    const eightWordsInputTrigram = new Map([['I wish', ['I','I']], ['wish I', ['may','might']], ['may I', ['wish']], ['I may', ['I']]]);

    it('should return correct trigram for 8 words input', function () {
        expect(trigramGenerator('I wish I may I wish I might')).to.eql(eightWordsInputTrigram);
    });

    it('should return correct trigram for 8 words input with whitespaces', function () {
        expect(trigramGenerator('I wish\n I may I\n\r wish   I might  ')).to.eql(eightWordsInputTrigram);
    });
});


describe('whitespaceHandler', function() {

    it('should replace multiple whitespaces with single space', function () {
        expect(whitespaceHandler(' I    wish ')).to.eql('I wish');
    });

    it('should replace \t with single space', function () {
        expect(whitespaceHandler('I\twish\t I')).to.eql('I wish I');
    });

    it('should replace \n with single space', function () {
        expect(whitespaceHandler('\nI\nwish')).to.eql('I wish');
    });

    it('should replace \r with single space', function () {
        expect(whitespaceHandler('I\r\rwish I\rmay')).to.eql('I wish I may');
    });

    it('should replace \n\r with single space', function () {
        expect(whitespaceHandler('\n\rI wish   I \n\r may I wish')).to.eql('I wish I may I wish');
    });
});


describe.skip('generateChunks', function() {
        
    it('should return correct array for less than 3 words input', function () {
        expect(generateChunks(['I','wish'])).to.eql([]);
    });

    it('should return correct array for 3 words input', function () {
        expect(generateChunks(['I','wish','I'])).to.eql([['I','wish','I']]);
    });

    it('should return correct array for 4 words input', function () {
        expect(generateChunks(['I','wish','I','may'])).to.eql([['I','wish','I'],['wish','I','may']]);
    });
});




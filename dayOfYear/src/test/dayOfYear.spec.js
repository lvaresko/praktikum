var chai = require("chai");
const dayOfYear = require('../dayOfYear');
var expect = chai.expect;


describe('dayOfYear test', function() {
    it('dayOfYear should be a function', function () {
        dayOfYear(1);
    });
    it('should return 245 for 01.09.2020', function(){
        expect(dayOfYear(1,9,2020)).to.equal(245);
    });
    it('should return 1 for 01.01.2012', function(){
        expect(dayOfYear(1,1,2012)).to.equal(1);
    });
    it('should return 32 for 01.02.2012', function(){
        expect(dayOfYear(1,2,2012)).to.equal(32);
    });
    it('should return 61 for 01.03.2012', function(){
        expect(dayOfYear(1,3,2012)).to.equal(61);
    });
    it('should return 60 for 01.03.1900', function(){
        expect(dayOfYear(1,3,1900)).to.equal(60);
    });
    it('should return 213 for 01.08.1600', function(){
        expect(dayOfYear(1,8,1600)).to.equal(214);
    });
});

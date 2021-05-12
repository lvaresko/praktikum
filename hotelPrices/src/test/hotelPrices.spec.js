const chai = require("chai");
const sinon = require('sinon');
const priceListFormatter = require('../hotelPrices');
const expect = chai.expect;
chai.use(require('sinon-chai'));


describe('hotel price list test', function() { 
    it('should be a function', function () {
        expect(priceListFormatter).to.be.a('function');
    });

    context('functionality testing', function() {
        beforeEach(() => sinon.restore());

        const pricelist = [
            {from: "2020-01-01", to: "2020-02-01", price: 34.5}, 
            {from: "2020-02-02", to: "2020-03-01", price: 37.0}];

        it('formats to expected format', function() {   
            const log = sinon.spy(console, 'log');
            priceListFormatter(pricelist);
            const expectedLog = [`34.5 : 2020-01-01 do 2020-02-01`, `37.0 : 2020-02-02 do 2020-03-01`];
            expect(log).to.have.been.calledWithMatch(expectedLog[0]);
            expect(log).to.have.been.calledWithMatch(expectedLog[1]);
        });

        it('formats to expected format and puts each record into new line', function() { 
            const log = sinon.spy(console, 'log');
            priceListFormatter(pricelist);
            const expectedLog = `34.5 : 2020-01-01 do 2020-02-01 \n37.0 : 2020-02-02 do 2020-03-01`;
            expect(log).to.have.been.calledWithExactly(expectedLog);
        });

        it('groups result by price', function() {
            const log = sinon.spy(console, 'log');
            pricelist.push({from: "2020-05-16", to: "2020-06-15", price: 37.0});
            priceListFormatter(pricelist);
            const expectedLog = `37.0 : 2020-02-02 do 2020-03-01 , 2020-05-16 do 2020-06-15`;
            expect(log).to.have.been.calledWithMatch(expectedLog);
        });

        it('sorts grouped result by price', function() {
            const log = sinon.spy(console, 'log');
            pricelist.push({from: "2020-03-02", to: "2020-05-15", price: 39.0});
            priceListFormatter(pricelist);
            const expectedLog = `34.5 : 2020-01-01 do 2020-02-01 \n37.0 : 2020-02-02 do 2020-03-01 , 2020-05-16 do 2020-06-15 \n39.0 : 2020-03-02 do 2020-05-15`;
            expect(log).to.have.been.calledWithExactly(expectedLog);
        });
    })
});
module.exports = function () {
    const 
        _ = require('lodash'),
        chai = require('chai'),
        expect = chai.expect;

    const payload = {
            data: {
                type: 'products',
                attributes: {
                    name: 'Produto nome teste',
                    price: 25,
                    brand: 'Produto marca teste',
                    model: 'Produto modelo teste'
                }
            }
        };
    
    this.Given(/^a valid product/, function () {
        this.payload = payload;
        
        return payload;
    });
    
    this.Given(/^an invalid product that is missing the name$/, function () {
        const payload = {
            data: {
                type: 'products',
                attributes: {
                    name: null,
                    price: 25,
                    brand: 'Produto marca teste',
                    model: 'Produto modelo teste'
                }
            }
        };
        
        this.payload = payload;
      
        return payload;
    });
    
    this.Given(/^an invalid product that has a negative price$/, function () {
        const payload = {
            data: {
                type: 'products',
                attributes: {
                    name: 'Produto nome teste',
                    price: -1,
                    brand: 'Produto marca teste',
                    model: 'Produto modelo teste'
                }
            }
        };
      
        this.payload = payload;
      
        return payload;
    });
}
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
        return payload;
    });
    
    this.When(/^I submit it to the API2$/, function () {
        const that = this;
        
        return this.doHttpRequest('products', 'post', payload)
        .then((response) => {
            that.newProductId = response.body.data.id;
            that.successMessage = response.statusCode;
            return response;
        });
    });
    
    this.Then(/^I receive a success message2$/, function () {
        expect(this.successMessage).to.equal(201);
    });
    
    this.Then(/^the new product id$/, function () {
        expect(this.newProductId).not.to.be.undefined;
    });
}
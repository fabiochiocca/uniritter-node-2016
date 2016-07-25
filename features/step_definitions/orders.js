module.exports = function () {
    const 
        _ = require('lodash'),
        chai = require('chai'),
        expect = chai.expect;

    const payload = {
        data: {
            type: 'orders',
            attributes: {
                items: [{ product_id: '598b04ea-8c20-4240-9c2b-1d36350a8d33', quantity: 1}]
            }
        }
    };
        
    this.Given(/^an existing order with a (.*) status$/, function (status) {
        const that = this;
        
        return this.doHttpRequest('orders', 'post', payload)
        .then((response) => {
            that.existingOrder = response.body;
            return response;
        });
    });
    
    this.When(/^I search this order$/, function () {
        const 
            that = this,
            id = this.existingOrder.data.id;
        return this.doHttpRequest('orders/' + id, 'get', undefined)
        .then((response) => {
            that.responseBody = JSON.parse(response.body);
            return response;
        });
    });
    
    this.Then(/^I receive the order data$/, function () {
        expect(this.responseBody.data).not.to.be.undefined;
    });
    
    this.Then(/^its status is (.*)$/, function (status) {
        expect(this.responseBody.data.attributes.status).to.equal(status);
    });
    
    this.Given(/^a valid order$/, function () {
        this.payload = payload;
        
        return payload;
    });

    this.Then(/^wait a few seconds$/, function (callback) {
        setTimeout(callback, 3000);
    });
    
    this.Then(/^it moves to a paid status$/, function () {
        
        return this.doHttpRequest('orders/' + this.newId, 'get', undefined)
        .then((response) => {
            var body = JSON.parse(response.body);
            
            expect(body.data.attributes.status).to.equal('paid');
            return response;
        });
    });
    
   this.Given(/^an invalid order that is missing an item quantity$/, function () {

        const payload = {
            data: {
                type: 'orders',
                attributes: {
                    items: [{ product_id: '598b04ea-8c20-4240-9c2b-1d36350a8d33'}]
                }
            }
        };
      
        this.payload = payload;
      
        return payload;
   });
   
   this.Given(/^an invalid order that has an invalid format in product_id$/, function () {

        const payload = {
            data: {
                type: 'orders',
                attributes: {
                    items: [{ product_id: '598b04ea-8c20-4240-9c2b', quantity: 1}]
                }
            }
        };
      
        this.payload = payload;
      
        return payload;
   });    
}
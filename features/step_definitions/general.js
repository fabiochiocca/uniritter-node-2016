module.exports = function () {
    const expect = require('chai').expect;
    
    this.Given(/^the system is up and running$/i,  function() {
        return this.server.then(function(server) {
            // checking the 'up' server flag
            expect(server.info.started).to.be.above(0);
            return server;
        });
    });
    
    this.When(/^I do a (\w+) against the \/(.*) endpoint$/, function (verb, endpoint) {
        var that = this;
        return this.doHttpRequest(endpoint, verb, null)
        .then(function (response) {
            that.response = response;
            return response;
        });
    });
    
    this.Then(/^I receive a (\d+) status code$/, function (statusCode) {
        expect(this.response.statusCode.toString()).to.equal(statusCode);
    });
       
    this.When(/^I (\w+) it against the \/(.*) endpoint$/, function (verb, endpoint) {
        var that = this;
        return this.doHttpRequest(endpoint, verb, that.fixture.request)
        .then(function (response) {
            that.response = response;
            return response;
        });
    });
    
    this.When(/^I submit it to the API (\w+)$/, function (endpoint) {
        const that = this;
        
        return this.doHttpRequest(endpoint, 'post', this.payload)
        .then((response) => {
            that.newId = response.body.data.id;
            that.successMessage = response.statusCode;
            
            return response;
        })
        .error((response) => {
            that.errorResponse = response.statusCode;
            that.errorMessage = response.body.errors[0].message;
        });
    });    
    
    this.Then(/^a payload containing the newly created resource$/, function () {
        expect(this.response.body).to.containSubset(this.fixture.request);
    });
    
    this.Then(/^I receive a success message$/, function () {
        expect(this.successMessage).to.equal(201);
    });
    
    this.Then(/^the new (\w+) id$/, function (endpoint) {
        expect(this.newId).not.to.be.undefined;
    });
    
    this.Then(/^I receive an error response$/, function () {
        expect(this.errorResponse).to.equal(400);
    });
    
    this.Then(/^a message saying that (.*)$/, function (notification) {
        expect(this.errorMessage).to.equal(notification);
    });     
};
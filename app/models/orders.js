'use strict';

var Types = require('joi');

module.exports = function (server) {
    const 
        harvesterPlugin = server.plugins['hapi-harvester'],
        schema = {
            type: 'orders',
            attributes: {
                total: Types.number().forbidden(),
                created_on: Types.date().forbidden(),
                updated_on: Types.date().forbidden(),
                status: Types.string().forbidden(),
                items: Types.array().items(
                    Types.object().keys({
                        quantity: Types.number().integer().required(),
                        product_id: Types.string().guid().required(),
                        price: Types.number().forbidden()
                    }).required().min(1)
                                            )
        
                        }
            
                } 
        
    harvesterPlugin.routes.all(schema).forEach(function (route) {
        server.route(route)
    })
}

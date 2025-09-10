const swaggerjsdoc = require('swagger-jsdoc');
const swaggeroptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "PCOS Open Source Community API",
            version: "1.0.0",
            description: "PCOS Open Source Community API documentation",
        },
        servers: [
           
            {
                url: "http://localhost:5000",
                description: "Local server",
            }
        ],

    },

    apis: ["./src/routes/*.js"],
};
const swaggerSpec = swaggerjsdoc(swaggeroptions);
// console.log(swaggerSpec);
module.exports = swaggerSpec;
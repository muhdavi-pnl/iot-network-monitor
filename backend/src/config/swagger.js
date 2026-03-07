const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "IoT Monitoring API",
      version: "1.0.0",
      description: "API documentation for IoT Monitoring System"
    },
    servers: [
      {
        url: "http://localhost:5001/api"
      }
    ]
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
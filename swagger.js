const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'Village Lane Publishing Contacts',
    },
    host: 'localhost:8080',
    schemes: ['http'],
};

const outputFile = 'swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
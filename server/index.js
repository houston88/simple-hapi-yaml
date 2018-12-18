'use strict';
const fs = require('fs');
const Hapi = require('hapi');
const path = require('path');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return 'Hello, world!';
    }
});

server.route({
    method: 'GET',
    path: '/config',
    handler: (request, h) => {
        try {
            const appDir = path.dirname(require.main.filename);
            // see if we can read a file
            const contents = fs.readFileSync(`${appDir}/../content/test.yaml`, 'utf8');
            return `<pre>${contents}</pre>`;
        } catch (error) {
            console.log(error);
        }
    }
});

const init = async () => {

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
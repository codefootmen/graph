const restify = require('restify');
const routes = require('../http/routes');
const cors = require('./cors');

const server = restify.createServer({
    name: 'Graph Backend Server'
});

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser());

routes(server);

module.exports = server;
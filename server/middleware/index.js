const restify = require('restify');
const routes = require('../http/routes');
const cors = require('./cors');
var bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);

const server = restify.createServer({
    name: 'Graph Backend Server'
});

server.pre(cors.preflight);
server.use(cors.actual);
server.use(bodyParser.xml());

routes(server);

module.exports = server;
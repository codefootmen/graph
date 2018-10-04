const routes = (server) => {

    server.get('/', (req, res, next) => {
        res.send(200, "Ok");
        next();
    });

}

module.exports = routes
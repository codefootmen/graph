const xml2js = require("xml2js");
const fs = require('fs');
const json2xml = require("json2xml");

const routes = (server) => {

    server.get('/', (req, res, next) => {
        res.send(200, "Ok");
        next();
    });

    // server.post('/read', (req, res, next) => {
    //     fs.readFile(__dirname + '/../xml/graph.xml', function (err, data) {
    //         parser.parseString(data, function (err, result) {
    //             res.send(200, JSON.stringify(result));
    //             next();
    //         });
    //     });
    // });

    server.post('/read', (req, res, next) => {
        fs.writeFile('graph.xml', JSON.stringify(req.body), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
            res.send(200, req._body);
            next();
        });
    });



}

module.exports = routes
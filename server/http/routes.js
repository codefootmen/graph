const xml2js = require("xml2js");
const fs = require('fs');
const json2xml = require("json2xml");

const routes = (server) => {

    server.get('/', (req, res, next) => {
        res.send(200, "Ok");
        next();
    });

    server.get('/read1', (req, res, next) => {
        var parser = new xml2js.Parser();
        fs.readFile(__dirname + '/../xml/graph.xml', function (err, data) {
            parser.parseString(data, function (err, result) {
                res.send(200, JSON.stringify(result));
                next();
            });
        });
    });

    server.get('/read2', (req, res, next) => {
        fs.readFile(__dirname + '/../json/graph.json', function (err, data) {
            fs.writeFile('convert.xml', json2xml(JSON.parse(data)), function (err) {
                if (err) {
                    return console.log(err);
                }

                console.log("The file was saved!");
            });
            res.send(200, "Ok");
            next();
        });
    });



}

module.exports = routes
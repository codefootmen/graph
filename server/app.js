const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const port = 5000;
const fs = require('fs');
const xml2js = require('xml2js');
const Vertex = require('./utils/Vertex')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload());

app.get('/read', (req, res, next) => {
    var parser = new xml2js.Parser();
    fs.readFile(__dirname + '/xml/graph.xml', function (err, data) {
        parser.parseString(data, function (err, result) {
            let newj = {};
            Object.keys(result).forEach(graph => {
                Object.keys(result[graph].node).forEach(node => {
                    newj[result[graph].node[node].$.id] = [];
                });
                Object.keys(result[graph].edge).forEach(edge => {
                    newj[result[graph].edge[edge].$.source].push(
                        Vertex(result[graph].edge[edge].$.target,
                            result[graph].edge[edge].$.cost,
                            result[graph].edge[edge].$.id
                        )
                    );
                });
                res.header({ 'Content-Type': 'application/json' }).json(newj);
            });
            console.log(newj);
            next();
        });
    });
});

app.post('/read', (req, res, next) => {
    let json = req.body;
    if (Object.getOwnPropertyNames(json).length == 0) {
        res.status(500).send("Empty Object");
        next();
    }
    let xml = '<graph id="graph">';
    Object.keys(json).forEach(node => {
        xml += `<node id="${node}"/>`;
    });
    Object.keys(json).forEach(node => {
        json[node].forEach(edge => {
            xml += `<edge id="${edge.id}" source="${node}" target="${edge.name}" cost="${edge.cost}"/>`;
        });
    });
    xml += '</graph>';

    fs.writeFile(__dirname + "/xml/graph.xml", xml, function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
        res.download('./xml/graph.xml', 'graph.xml', function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('feito');
                next();
            }
        });
    });
});

app.get('/download', (req, res, next) => {
    res.download('./xml/graph.xml', 'graph.xml', function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('feito');
            next();
        }
    });
});

app.post('/upload', (req, res, next) => {
    let imageFile = req.files.file;
    imageFile.mv(__dirname + '/xml/graph.xml', function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(`File ${imageFile.name} uploaded`);
        console.log(`File ${imageFile.name} uploaded`);
        next();
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

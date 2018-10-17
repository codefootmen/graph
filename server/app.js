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
app.use(bodyParser.urlencoded({ extended: false }));
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
                            0,
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

app.post('/upload', (req, res, next) => {
    let imageFile = req.files.file;
    imageFile.mv(__dirname + '/xml/graph.xml', function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(`File ${imageFile.name} uploaded`);
        console.log(`File ${imageFile.name} uploaded`);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
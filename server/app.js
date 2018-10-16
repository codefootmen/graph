const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(fileUpload());

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
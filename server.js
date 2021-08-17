let projectData = {};
const express = require('express');
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

app.use(express.static('website'));

const port = 8000;
const server = app.listen(port, listening);
function listening() {
    console.log(`running on localhost: ${port}`);
};

// TODO-ROUTES!

app.post('/create', callBack);

function callBack(req, res) {
    projectData = req.body
}
app.get('/all', sendData);

function sendData(req, res) {
    res.send(projectData)
}


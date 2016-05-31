var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

var test = require('./app');
test.asd('asd');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
    {extended: true}
));

app.get('/', function (req, res) {
    console.log('GET');
    res.send('Hello World!');
});

app.get('/json', function (req, res) {
    console.log('GET /json');
    res.send({test: "value"});
});

app.post('/test', function (req, res) {
    console.log("POST /test");
    console.log(req.body);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

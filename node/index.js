var express = require('express');
var cors = require('cors');
var app = express();

var test = require('./app');
test.asd('asd');

app.use(cors());

app.get('/', function (req, res) {
    console.log('GET');
    res.send('Hello World!');
});

app.get('/json', function (req, res) {
    console.log('GET /json');
    res.send({test: "value"});
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

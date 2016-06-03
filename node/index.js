var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

var test = require('./app');
test.asd('asd');

var tasks = [
    {title: "a", is_done: false},
    {title: "a", is_done: false},
    {title: "a", is_done: false}
];


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
    res.send(tasks);
});

app.post('/task', function (req, res) {
    console.log("POST /test");
    var task_nam = req.body.title;
    var is_done = req.body.is_done;
    tasks.push({task: task_nam, is_done: is_done})

});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

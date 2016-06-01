var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var logger = require('morgan');

var app = express();

var lastId = 1;

var tasks = [
  {
    id: 1,
    is_done: false,
    title: "Some title",
  }
];

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/tasks', function(req, res) {
  res.json(tasks);
});

app.get('/task/:id', function(req,res) {
  var task = tasks.filter(task => task.id == req.params.id)[0];
  if(!task) {
    res.sendStatus(404);
  }
  res.json(task);
});

app.listen(4750, function () {
  console.log('Example app listening on port 4750!');
});

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var logger = require('morgan');

var app = express();

var lastId = 0;

var tasks = [];

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

app.get('/tasks/:id', function(req, res) {
  var task = tasks.filter(task => task.id == req.params.id)[0];
  if(!task) {
    res.sendStatus(404);
  }
  res.json(task);
});

app.post('/tasks', function(req, res) {
  console.log(req.body);
  if(!req.body.title) {
    res.status(400).json({ error: "title property is missing" });
  }
  var task = {
    id: ++lastId,
    is_done: req.body.is_done == undefined ? false : req.body.is_done,
    title: req.body.title
  }
  tasks.push(task);
  res.json(task);
});

app.put('/tasks/:id', function(req, res) {
  var task = tasks.filter(task => task.id == req.params.id)[0];
  if(!task) {
    res.sendStatus(404);
  } else if(!req.body.title || !req.body.is_done) {
    var error = {};
    if(!req.body.title) {
      error.title = "title property is missing";
    }
    if(!req.body.is_done) {
      error.is_done = "is_done property is missing";
    }
    res.status(400).json({ error : error });
  } else {
    var taskIndex = tasks.indexOf(task);
    task.title = req.body.title;
    task.is_done = req.body.is_done;
    tasks[taskIndex] = task;
    res.json(task);
  }
});

app.listen(4750, function () {
  console.log('Example app listening on port 4750!');
});

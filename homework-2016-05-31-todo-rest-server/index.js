var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var path = require('path');
var uuid = require('node-uuid');

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/todo.html'));
});

var model = [
    {
        id: uuid.v4(),
        body: {
            title: "Zadanie 1",
            is_done: true
        }
    },
    {
        id: uuid.v4(),
        body: {
            title: "Inne zadanie",
            is_done: false
        }
    }
];

var idiotParser = function (stringBool) {
    return stringBool === 'true';
};


app.get('/task', function (req, res) {
    console.log("GET ");
    res.send(model);
});

app.post('/task', function (req, res) {
    console.log("POST " + JSON.stringify(req.body));
    //console.log("true? " + req.body.is_done + " : " + Boolean(req.body.is_done) + " : " + idiotParser(req.body.is_done));
    var addon = {
        id: uuid.v4(),
        body: {
            title: req.body.title,
            is_done: idiotParser(req.body.is_done)
        }
    };
    model.push(addon);
    res.send(addon);
});

app.patch('/task/:id', function (req, res) {
    var id = req.params.id;
    console.log("PATCH " + id + " " + JSON.stringify(req.body));
    for (var elem of model) {
        if (elem.id === id) {
            elem.body.is_done = idiotParser(req.body.is_done);
            res.send(elem);
            return;
        }
    }
    console.log("Error no element " + id);
    res.sendStatus(404);
});

app.delete('/task/:id', function (req, res) {
    var id = req.params.id;
    console.log("DELETE " + id + " " + JSON.stringify(req.body));
    for (var i = 0; i < model.length; i++) {
        if (model[i].id === id) {
            model.splice(i, 1);
            /*console.log(JSON.stringify(model, null, 2));*/
            res.sendStatus(202);
            return;
        }
    }
    console.log("Error no element " + id);
    res.sendStatus(404);
});

app.put('/task/:id', function (req, res) {
    var id = req.params.id;
    console.log("PUT " + id + " " + JSON.stringify(req.body));
    for (var elem of model) {
        if (elem.id === id) {
            elem.body.is_done = idiotParser(req.body.is_done);
            elem.body.title = req.body.title;
            res.send(elem);
            return;
        }
    }
    console.log("Error no element " + id);
    res.sendStatus(404);
});

app.listen(3000, function () {
    console.log('Uruchomiono serwer na localhost:3000[ctrl+c]');
});

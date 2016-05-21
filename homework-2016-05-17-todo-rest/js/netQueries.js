var url = 'http://sealcode.org:8082/api/v1/resources/task';

var getAndRender = function () {
    qwest.get(url, {}, {cache: true})
        .then(function (xhr, response) {
            console.log(response);
            model = response;
            render();
        })
        .catch(function (e, xhr, response) {
            alert("GET Error:" + e);
        });
};

var postAndRender = function (task) {
    var fd = new FormData();
    fd.append('title', task);
    fd.append('is_done', false);

    //qwest.post(url, {title: task, is_done: false}, {cache: true})
    qwest.post(url, fd, {cache: true})
        .then(function (xhr, response) {
            console.log(response);
            model.push(response);
            render();
        })
        .catch(function (e, xhr, response) {
            alert("POST Error:" + e);
        });
};

var deleteSpliceAndRender = function (index) {
    var id = model[index].id;
    var newUrl = url + '/' + id;
    qwest.delete(newUrl, null, {cache: true})
        .then(function (xhr, response) {
            console.log(response);
            model.splice(index, 1);
            render();
        })
        .catch(function (e, xhr, response) {
            alert("DELETE Error:" + e);
        });
};

var patchDoneAndRender = function (index, done) {
    var id = model[index].id;
    var newUrl = url + '/' + id;
    qwest.map('PATCH', newUrl, {is_done: done}, {cache: true})
        .then(function (xhr, response) {
            console.log(response);
            model[index].body.is_done = response.body.is_done;
            render();
        })
        .catch(function (e, xhr, response) {
            alert("PATCH Error:" + e);
        });
};

var putAndRender = function (index, title, done) {
    var id = model[index].id;
    var newUrl = url + '/' + id;
    /*var fd = new FormData();
    fd.append('title', title);
    fd.append('is_done', done);*/
    qwest.put(newUrl, {title: title, is_done: false}, {cache: true})
        .then(function (xhr, response) {
            console.log(response);
            model[index] = response;
            render();
        })
        .catch(function (e, xhr, response) {
            alert("PUT Error:" + e);
        });
};
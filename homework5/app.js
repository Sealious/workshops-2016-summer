var api_url = "http://sealcode.org:8082/api/v1/resources/task";
var tasks = [];

function render_task(task_data, index) {
    var list = document.getElementById("to-do-list");
    var list_element = document.createElement("li");
    var item_title = document.createElement("div");
    var item_date = document.createElement("span");
    var item_checked = document.createElement("span");
    var item_checked_info = document.createElement("span");
    var icon = document.createElement("i");


    item_title.className = "title";
    item_title.id = task_data.id;
    item_title.contentEditable = "true";
    item_date.className = "date";
    icon.className = "fa fa-clock-o";
    item_checked.className = "checked";
    item_checked_info.className = "checked_info";
    item_title.textContent = task_data.body.title;

    var checkbox = document.createElement("input");

    item_checked_info.textContent = "Done?";

    checkbox.type = "checkbox";

    if (task_data.body.is_done == true)
        checkbox.checked = "checked";

    checkbox["data-task-id"] = index;
    checkbox.onclick = change_checkbox


    item_title["task_id"] = task_data.id;
    item_title["data-task-id"] = index;
    item_title.onclick = change_title;


    list_element.appendChild(item_title);
    list_element.appendChild(item_date);
    item_checked.appendChild(checkbox);
    item_date.appendChild(icon);

    var date = new Date(task_data.created_context.timestamp);

    item_date.innerHTML += " " + date;

    list_element.appendChild(item_checked);
    item_checked.appendChild(item_checked_info);

    list.appendChild(list_element);
    list.insertBefore(list_element, list.firstChild)
}


function change_checkbox(event) {
    index = event.target["data-task-id"];
    tasks[index].body.is_done = !tasks[index].body.is_done;

    var id = tasks[index].id;
    var newUrl = api_url + '/' + id;

    qwest.map('PATCH', newUrl, {
            is_done: tasks[index].body.is_done
        }, {
            cache: true
        })
        .then(function(xhr, response) {
            console.log(response);
            render();
        })
        .catch(function(e, xhr, response) {
            alert("PATCH Error:" + e);
        });
};

function patch(id, index) {
    var newUrl = api_url + '/' + id;
    qwest.map('PATCH', newUrl, {
            title: tasks[index].body.title
        }, {
            cache: true
        })
        .then(function(xhr, response) {
            console.log(response);

        })
        .catch(function(e, xhr, response) {
            alert("PATCH Error:" + e);
        });
}

function change_title(event) {

    event.target.setAttribute('data-orig', event.target.innerHTML);

    event.target.onblur = function() {
        if (this.innerHTML != this.getAttribute('data-orig')) {
            this.setAttribute('data-orig', this.innerHTML);
            index = event.target["data-task-id"];
            tasks[index].body.title = this.innerHTML;
            id = event.target["task_id"]
            patch(id, index)
        }
    };
};

function delete_item(i, id) {

    var newUrl = api_url + '/' + id;
    qwest.delete(newUrl, null, {
            cache: true
        })
        .then(function(xhr, response) {
            tasks.splice(i, 1);
            render();
        })
        .catch(function(e, xhr, response) {
            alert("DELETE Error:" + e);
        });

}

function render() {
    var list = document.getElementById("to-do-list");

    while (list.hasChildNodes())
        list.removeChild(list.lastChild);

    tasks.forEach(render_task);
}

render();

function addTask() {
    var date_now = new Date().toJSON().slice(0, 10);
    var title = document.getElementById('new-title').value;

    if (title == "") {
        document.getElementById('new-title').style.border = '2px solid #9B0C00';
        return;
    } else
        document.getElementById('new-title').style.border = '2px solid #ccc';


    var fd = new FormData();
    fd.append('title', title);
    fd.append('is_done', false);

    qwest.post(api_url, fd, {
            cache: true
        })
        .then(function(xhr, response) {
            tasks.push(response);
            render();
        })
        .catch(function(e, xhr, response) {
            alert("POST Error:" + e);
        });

    render();
    document.getElementById('new-title').value = "";
}


function inputKeyUp(e) {
    e.which = e.which || e.keyCode;
    if (e.which == 13)
        addTask;

}

function deleteTasks() {

    for (var i = tasks.length - 1; i >= 0; i--)
        if (tasks[i].body.is_done == true)
            delete_item(i, tasks[i].id)

}

document.getElementById("create-new-task").onclick = addTask;
document.getElementById("create-new-task").onkeyup = inputKeyUp;
document.getElementById("delete-all-done").onclick = deleteTasks;

qwest.get(api_url, {}, {
        dataType: 'json',
        cache: true
    })
    .then(function(xhr, data) {
        tasks = data;
        render();
    });
function create_task(task_data, key) {
    var list = document.querySelector("#todo-list");
    var listItem = document.createElement("li");

    var liText = document.createTextNode(task_data.title);
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = key;
    checkbox.onclick = checkboxClick;
    if (task_data.done) {
        checkbox.checked = true;
    }

    var removeButton = document.createElement("button");
    removeButton.onclick = removeTask;
    removeButton.id = key;
    removeButton.className = "removeButtons";

    var label = document.createElement("label");
    label.setAttribute("for", checkbox.id);
    label.appendChild(liText);

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(removeButton);
    list.appendChild(listItem);
}

function render() {
    var list = document.querySelector("#todo-list");
    while (list.hasChildNodes()) {
        list.removeChild(list.lastChild);
    }
    for (var i = 0; i < tasks.length; i++) {
        create_task(tasks[i], i)
    }
    // tasks.forEach(create_task);
    TaskCounter();
    DoneCounter();
}

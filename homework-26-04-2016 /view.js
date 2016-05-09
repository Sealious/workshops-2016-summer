function create_task(task_data) {
    var list = document.querySelector("#todo-list");
    var listItem = document.createElement("li");

    var liText = document.createTextNode(task_data.title);
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = task_data.id;
    if (task_data.done) {
        checkbox.checked = "checked"
    }

    var label = document.createElement("label");
    label.setAttribute("for", checkbox.id);
    label.appendChild(liText);


    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    list.appendChild(listItem);

}

function render() {
    var list = document.querySelector("#todo-list");
    while (list.hasChildNodes()) {
        list.removeChild(list.lastChild);
    }
    tasks.forEach(create_task);
}

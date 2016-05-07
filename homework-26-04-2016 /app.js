var addItem = function() {
    var list = document.querySelector("#todo-list");
    var listItem = document.createElement("li");

    var input = document.querySelector("#textInput").value;
    var liText = document.createTextNode(input);

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "task";
    checkbox.class = "checkboxs"

    var label = document.createElement("label");
    label.setAttribute("for", checkbox.id);
    label.appendChild(liText);


    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    list.appendChild(listItem);
}

var refreshCounter = function() {
    var list = document.querySelector("#todo-list");
    var counter = document.querySelector("#counter");
    counter.textContent = list.querySelectorAll("li").length;
}



var doneCounter = function() {
    var checkbox = document.querySelectorAll('input[type="checkbox"]');
    console.log(checkbox);
    for (var key in checkbox) {
        if (checkbox.hasOwnProperty(key)) {
            console.log(checkbox[key]);
            checkbox[key].addEventListener("change", function() {
                counter = document.querySelector("#boxCounter");
                counter.textContent = document.querySelectorAll('input[type="checkbox"]:checked').length;
            });
        }
    }
}
doneCounter();

var addButton = document.querySelector("#buttonInput");
addButton.addEventListener("click", function() {
    addItem();
    refreshCounter();
    doneCounter();
});

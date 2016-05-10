var model = [
    {name: "Zrozumieć vertical rhytm, line-height, margin-bottom, rem", done: false},
    {name: "Pracować nad projektem", done: false},
    {name: "Zrobić zakupy", done: false},
    {name: "Posprzątać mieszkanie", done: false},
    {name: "Zrobić pranie", done: true}
];

var render = function () {
    var list = document.querySelector("#list");
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    for (var i = 0; i < model.length; i++) {
        var theList = document.createElement('li');

        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.id = i;
        checkbox.checked = model[i].done;
        checkbox.onclick = function () {
            markDone(this.id, this.checked);
        };
        theList.appendChild(checkbox);

        var liText = document.createTextNode(model[i].name);
        theList.appendChild(liText);

        var button = document.createElement('a');
        button.innerHTML = "&#x274c;";
        button.id = i;
        button.onclick = function () {
            removeItem(this.id);
        };
        button.classList.add("remover");
        theList.appendChild(button);

        if (model[i].done) {
            theList.classList.add("stroke")
        }

        list.appendChild(theList);
    }
    refreshCounter();
};

var markDone = function (id, checked) {
    model[id].done = checked;
    render();
};

var removeItem = function (id) {
    console.log("id " + id);
    model.splice(id, 1);
    render();
};

var addItem = function () {
    var textInput = document.querySelector('input[type=text]');
    var input = textInput.value;
    if (!input) return;
    model.push({name: input, done: false});
    textInput.value = "";
    render();
};

var refreshCounter = function () {
    var list = document.querySelector("#list");
    var counter = document.querySelector('#counter');
    counter.textContent = list.querySelectorAll('li').length;
};

document.addEventListener('DOMContentLoaded', function () {
    var addButton = document.querySelector("#addButton");
    addButton.addEventListener('click', function () {
        addItem();
    });

    var textInput = document.querySelector('input[type=text]');
    textInput.addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
            addItem();
        }
    });
    render();
});

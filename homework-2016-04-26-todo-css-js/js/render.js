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
    var doneCounter = document.querySelector('#done-counter');
    var dones = 0;
    for (var item of model) {
        if (item.done) {
            dones += 1;
        }
    }
    doneCounter.textContent = dones;
};

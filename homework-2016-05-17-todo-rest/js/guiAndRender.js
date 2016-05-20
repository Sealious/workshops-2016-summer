var render = function () {
    var list = document.querySelector("#list");
    while (list.hasChildNodes()) {
        list.removeChild(list.lastChild);
    }
    for (var i = 0; i < model.length; i++) {
        var theList = document.createElement('li');

        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.id = i;
        checkbox.checked = model[i].body.is_done;
        checkbox.onclick = function () {
            patchDoneAndRender(this.id, this.checked);
        };
        theList.appendChild(checkbox);

        var label = document.createElement('label');
        label.for = i;
        label.id = 'label' + i;
        label.textContent = model[i].body.title;
        theList.appendChild(label);
/*        label.onclick = function () {
            changeToEdit(this.id);
        };*/

        var button = document.createElement('a');
        button.innerHTML = "&#x274c;";
        button.id = i;
        button.onclick = function () {
            deleteSpliceAndRender(this.id);
        };
        button.classList.add("remover");
        theList.appendChild(button);

        if (model[i].body.is_done) {
            theList.classList.add("stroke");
        }
        list.appendChild(theList);
    }
    refreshCounter();
};

var addItem = function () {
    var textInput = document.querySelector('input[type=text]');
    var input = textInput.value;
    if (!input) return;
    postAndRender(input);
    textInput.value = "";
    render();
};

var refreshCounter = function () {
    var counter = document.querySelector('#counter');
    counter.textContent = model.length;
    var doneCounter = document.querySelector('#done-counter');
    var dones = 0;
    for (var i = 0; i < model.length; i++) {
        if (model[i].body.is_done) {
            dones += 1;
        }
    }
    doneCounter.textContent = dones;
};



/*
var changeToEdit = function (id) {
    var label = document.getElementById(id);
    var val = label.textContent;
    label.value = val;
    label.innerHTML = "<input type='text'/>";
    label.id = id;
    label.onclick = null;
    label.onkeydown = function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
            var i = id.substring(id.length - 1);
            /!*putAndRender(i, label.value, model[i].body.is_done);*!/
            label = changeToLabel(id);
        }
    };
};

function changeToLabel(id) {
    var label = document.getElementById(id);
    label.innerHTML = "<input type='label'/>";
    label.for = id.substring(id.length - 1);
    label.id = id;
    label.textContent = model[label.for].body.title;
    label.onclick = function () {
        label = changeToEdit(id);
    };
}
*/
//TODO click on label changes it to input[type=text]
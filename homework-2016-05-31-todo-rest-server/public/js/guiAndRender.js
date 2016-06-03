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
        label.id = i;
        label.textContent = model[i].body.title;
        theList.appendChild(label);
        /*label.contentEditable = true;
        label.onclick = function () {
            this._storeValueForLater = this.textContent;
        };
        label.onblur = function () {
            if (this.contentEditable && this._storeValueForLater != this.textContent) {
                putAndRender(this.id, this.textContent, model[this.id].body.is_done);
            }
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
    textInput.value = "";
    postAndRender(input);
};

var refreshCounter = function () {
    var dones = 0;
    for (var i = 0; i < model.length; i++) {
        if (model[i].body.is_done) {
            dones += 1;
        }
    }
    var counter = document.querySelector('#counter');
    counter.textContent = model.length;
    var doneCounter = document.querySelector('#done-counter');
    doneCounter.textContent = dones;
};

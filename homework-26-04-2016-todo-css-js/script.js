var model = [
    "Zrozumieć vertical rhytm, line-height, margin-bottom, rem",
    "Pracować nad projektem",
    "Zrobić zakupy",
    "Posprzątać mieszkanie",
    "Zrobić pranie",
];

var render = function() {
    var list = document.querySelector("#list");
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    for (var item of model) {
        var listItem = document.createElement('li');
        var liText = document.createTextNode(item);
        listItem.appendChild(liText);
        list.appendChild(listItem);
        listItem.onclick = function(){
            removeItem(this.textContent);
        };
    }
    refreshCounter();
}

var removeItem = function(item){
    var i = model.indexOf(item);
    if(i != -1) {
    	model.splice(i, 1);
        render();
    }
}

var addItem = function(){
    var list = document.querySelector("#list");
    var listItem = document.createElement('li');
    var textInput = document.querySelector('input[type=text]');
    var input = textInput.value;
    if(!input) return;
    model.push(input);
    textInput.value = "";
    render();
}

var refreshCounter = function(){
    var list = document.querySelector("#list");
    var counter = document.querySelector('#counter');
    counter.textContent = list.querySelectorAll('li').length;
}

document.addEventListener('DOMContentLoaded', function() {
    var addButton = document.querySelector("#addButton");
    addButton.addEventListener('click', function(){
        addItem();
    });

    var textInput = document.querySelector('input[type=text]');
    textInput.addEventListener('keypress', function(e){
        var key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
            addItem();
        }
    });

    render();
});

var model = [
    {name: "Zrozumieć vertical rhytm, line-height, margin-bottom, rem", done: false},
    {name: "Pracować nad projektem", done: false},
    {name: "Zrobić zakupy", done: false},
    {name: "Posprzątać mieszkanie", done: false},
    {name: "Zrobić pranie", done: false},
];

var render = function() {
    var list = document.querySelector("#list");
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    for (var item of model) {
        var listItem = document.createElement('li');
        var liText = document.createTextNode(item.name);
        listItem.appendChild(liText);
        list.appendChild(listItem);
        listItem.onclick = function(){
            removeItem(this.textContent);
        };
    }
    refreshCounter();
}

var removeItem = function(itemName){
    var i=0;
    for(; i<model.length && model[i].name != itemName; i++) ;
    //var i = model.indexOf(item);
    if(i != model.length) {
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
    model.push({name: input, done: false});
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

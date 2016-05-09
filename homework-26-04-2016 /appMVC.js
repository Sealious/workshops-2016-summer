var c = 3;
render();
TaskCounter();
DoneCounter();

var addButton = document.querySelector("#buttonInput");
addButton.addEventListener("click", function() {
    if (document.querySelector("#textInput").value == "") {
        alert("Field cannot be empty!");
        return;
    }
    AddTask();
    TaskCounter();
    DoneCounter();
    document.querySelector("#textInput").value = "";
});

//enter
var input = document.querySelector("#textInput");
input.addEventListener("keyup", function(e) {
    if (e.keyCode == 13) {
        addButton.click();
    }
});

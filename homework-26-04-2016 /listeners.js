render();

var addButton = document.querySelector("#buttonInput");
addButton.addEventListener("click", function() {
    if (document.querySelector("#textInput").value == "") {
        alert("Field cannot be empty!");
        return;
    }
    AddTask();
    document.querySelector("#textInput").value = "";
});

//enter
var input = document.querySelector("#textInput");
input.addEventListener("keyup", function(e) {
    if (e.keyCode == 13) {
        addButton.click();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    var addButton = document.querySelector("#addButton");
    addButton.addEventListener('click', function () {
        var textInput = document.querySelector('input[type=text]');
        if(textInput.value.length == 0) {
            textInput.classList.add("emptyText");
        }
        addItem();
    });

    var textInput = document.querySelector('input[type=text]');
    textInput.addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
            addItem();
        }
        this.classList.remove("emptyText");
    });
    render();
});
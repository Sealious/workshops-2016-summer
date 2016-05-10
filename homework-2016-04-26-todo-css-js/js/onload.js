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
function AddTask() {
    var input = document.querySelector("#textInput").value;
    console.log("adding task");
    tasks.push({
        done: false,
        title: input,
        id: "task" + (c++)
    });
    render();
}

function TaskCounter() {
    console.log("adding counter");
    var list = document.querySelector("#todo-list");
    var counter = document.querySelector("#counter");
    counter.textContent = list.querySelectorAll("li").length;
}

function DoneCounter() {
    var checkbox = document.querySelectorAll('input[type="checkbox"]');
    console.log(checkbox);
    for (var key in checkbox) {
        if (checkbox.hasOwnProperty(key)) {
            console.log(checkbox[key]);
            checkbox[key].addEventListener("change", function() {
                counter = document.querySelector("#boxCounter");
                counter.textContent = document.querySelectorAll('input[type="checkbox"]:checked').length;
            });
        }
    }
}

function AddTask() {
    var input = document.querySelector("#textInput").value;
    console.log("adding task");
    tasks.push({
        done: false,
        title: input,
    });
    render();
}

function TaskCounter() {
    var list = document.querySelector("#todo-list");
    var counter = document.querySelector("#counter");
    counter.textContent = list.querySelectorAll("li").length;
}

function checkboxClick() {
    console.log(this);
    tasks[this.id].done = this.checked;
    DoneCounter();
}

function DoneCounter() {
    counter = document.querySelector("#boxCounter");
    counter.textContent = document.querySelectorAll('input[type="checkbox"]:checked').length;
}

function removeTask() {
    console.log(this, this.id);
    delete tasks[this.id];
    console.log(tasks);
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i] === undefined) {
          console.log(tasks);
            tasks.splice(i, 1);
            i--;
        }
    }
    render();

}

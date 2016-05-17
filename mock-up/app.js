var tasks = []

function renderTask(task_data, task_id)
{
	var list = document.getElementById("list");
	var list_element = document.createElement("li");
	list_element.textContent = task_data.title;
	var checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.class = "check_task";
	checkbox["data-task-id"] = task_id;
	checkbox.onclick = show_id;
	if(task_data.done) checkbox.checked = "checked";
	list_element.insertBefore(checkbox,list_element.firstChild);
	list.appendChild(list_element);
}

function show_id(){
	console.log(this["data-task-id"]);
	if(!tasks[this["data-task-id"]].done) tasks[this["data-task-id"]].done = true;
	console.log(tasks);
}

function render()
{
	var list = document.getElementById("list");
	while(list.hasChildNodes())
	{
		list.removeChild(list.lastChild);
	}
	tasks.forEach(renderTask);
}

function addTask()
{
	var input = document.getElementById("add");
	var task_text = input.value;
	if(task_text == "")
	{
		input.style.borderColor = "red";
	}
	else 
	{
		input.style.borderColor = "grey";
		tasks.push({title: task_text, done: false});
		render();
		document.getElementById("add").value = "";
	}
}

window.addEventListener("keypress", keyPressed, false);
var button = document.getElementById("new");
var button1 = document.getElementById("del");
button.addEventListener("click",addTask,false);
button1.addEventListener("click",delTask,false);


function keyPressed(e)
{
	if(e.keyCode == "13")
	{
		addTask();
	}
}

function delTask()
{
	var i;
	tasks = tasks.filter(function(n){ return !n.done});
	render();
}
render();
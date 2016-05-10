var tasks = []


function renderTask(task_data)
{
	var list = document.getElementById("list");
	var list_element = document.createElement("li");
	list_element.textContent = task_data.title;
	var checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	if(task_data.done) checkbox.checked = "checked";
	list_element.insertBefore(checkbox,list_element.firstChild);
	list.appendChild(list_element);
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
	if(task_text == null || task_text == "")
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

function keyPressed(e)
{
	if(e.keyCode == "13")
	{
		addTask();
	}
}

render();
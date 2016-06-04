document.getElementById("input-text").value=""; // wyczyść pole tekstowe

var tasks = []; // tablica tasks do przechowywania zadań
var howManyTasks=0;

var url='http://sealcode.org:8082/api/v1/resources/task';

function getTasks() 
{
	qwest.get(url,{},{cache: true})
	.then((xhr,result) => result.forEach(function(element) {tasks.push(element.body);refresh();howManyTasks++;}));
}

getTasks();

function addTaskServer(task) 
{
	qwest.post(url, {title: task.title, is_done: task.is_done}, {cache: true})
}

function dateMonthYear() // funkcja ustawiająca dzisiejszą datę
{
	var monthNames = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca",
	"lipca", "sierpnia", "września", "października", "listopada", "grudnia"];
	
	var data_element = document.getElementById("data-span");
	var d = new Date();
	var day = d.getDate(); 
	var month = d.getMonth();
	var year = d.getFullYear();
	data_element.innerHTML = day+" "+monthNames[month]+" "+year+"r.";
}

dateMonthYear();

function lackOfTask() // czy są na liście zadania?
{
	var element=document.getElementById("info"); // pobierz z HTML element info
	if (tasks.length==0) // czy tablica jest pusta?
	{
		element.innerHTML = "Nie zaplanowałeś żadnych zadań :)"; // ustaw komunikat o braku zadań, jeśli tablica tasks jest pusta
	}
	else // w przeciwnym wypadku...
	{
		element.innerHTML = ""; // już są jakieś zadania, więc wyczyść div o id="info"
	}
}

function checkboxClick() // co się dzieje z checkboxem?
{
	tasks[this.id].is_done = this.checked;
}

function refresh_task(task_data, i) // odświeżaj stan danego zadania
{
	var list = document.getElementById("list"); // pobierz listę zadań
	var list_element = document.createElement("li"); // dodaj nowe pole do listy zadań
	var checkbox = document.createElement("input"); // dodaj input
	var button = document.createElement("button"); // tworzenie przycisku do usuwania
	button.textContent="Usuń";
	list_element.appendChild(button);
	checkbox.id = i; // ustaw id input checkbox
	checkbox.type="checkbox"; // ustal typ inputa na checkbox
	button.id=i;
	var text_task = document.createElement("span"); // utwórz pole tekstowe na treść zadania
	text_task.id=checkbox.id; // stwórz id elementu span taki jak id input checkbox
	text_task.textContent = task_data.title; // ustaw treść zadania
	checkbox.onclick = checkboxClick;
	button.onclick = deleteTask; // usuwanie zadania
	if(task_data.is_done)
	{
		checkbox.checked = "checked";
	}
	list_element.appendChild(checkbox); // do elementu "li" dołóż checkbox
	list_element.appendChild(text_task); // po checkboxie w elemencie "li" wstaw zadanie
	list.appendChild(list_element); // wstaw element "li" do listy
}

function deleteTask() // usuwanie zadania
{
	tasks.splice(this.id,1); // usuwanie zadania z tablicy
	refresh();
}

function refresh() // odświeżaj stan strony
{
	dateMonthYear();
	lackOfTask(); // sprawdź czy są zadania na stronie
	var list = document.getElementById("list"); // pobierz listę zadań
	while (list.hasChildNodes()) 
	{
		list.removeChild(list.lastChild);
	}
	for (var i = 0; i < tasks.length; i++) // odśwież stan każdego zadania
	{
		refresh_task(tasks[i], i);
	}
}

function addTask() // dodaj zadanie
{
	var newtask=document.getElementById("input-text"); // pobierz wartość z pola tekstowego
	var text = newtask.value.trim(" "); // usuwanie spacji 
	if (text.length==0) // sprawdź, czy pole tekstowe jest puste
	{
		alert("Nie można dodawać pustego zadania!"); // jeśli pole tekstowe jest puste, wyświetl ostrzeżenie
	}
	else // w przeciwnym wypadku, dodaj zadanie
	{
		var new_task={title: newtask.value, is_done: false};
		tasks.push(new_task); // wstaw do tablicy tasks nowy obiekt z zadaniem
		refresh(); // odświeżaj stan strony
		newtask.value=""; // wyczyść pole tekstowe
	}
}

function keyDown(event) // akcja dla naciśniętego klawisza
{
	event.which = event.which || event.keyCode;
	if (event.which==13) // czy naciśnięto klawisz enter?
	{
		addTask(); // uruchom dodawanie zadania, jeśli wciśnięto klawisz enter
	}
}

var button_save=document.getElementById("input-button-save");

var el=document.getElementById("input-button").onclick = addTask; // dodaj zadanie, jeśli kliknięto przycisk

// homework - dodawanie zadań na serwer i pobieranie z serwera i wyświetlanie!!!

button_save.onclick=function() 
{
	//var oldTasks=tasks.slice(0,howManyTasks);
	//do zrobienia jeszcze: edytowanie taska na serwerze
	//do zrobienia jeszcze: usuwanie taska z serwera
	var newTasks=tasks.slice(howManyTasks,tasks.length);
	if (howManyTasks!=tasks.length) // czy dodano nowe zadanie?
	{
		newTasks.forEach(function(element) {addTaskServer(element)});
	}
}

document.onkeydown=keyDown; // dodaj zadanie, jeśli wciśnięto enter
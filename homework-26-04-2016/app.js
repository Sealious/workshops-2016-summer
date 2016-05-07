document.getElementById("input-text").value=""; // wyczyść pole tekstowe

var tasks = []; // tablica tasks do przechowywania zadań

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

function refresh_task(task_data) // odświeżaj stan danego zadania
{
	var list = document.getElementById("list"); // pobierz listę zadań
	var list_element = document.createElement("li"); // dodaj nowe pole do listy zadań
	var checkbox = document.createElement("input"); // dodaj input
	checkbox.type="checkbox"; // ustal typ inputa na checkbox
	var text_task = document.createElement("span"); // utwórz pole tekstowe na treść zadania
	text_task.textContent = task_data.title; // ustaw treść zadania
	if(task_data.done)
	{
		checkbox.checked = "checked";
	}
	list_element.appendChild(checkbox); // do elementu "li" dołóż checkbox
	list_element.appendChild(text_task); // po checkboxie w elemencie "li" wstaw zadanie
	list.appendChild(list_element); // wstaw element "li" do listy
}

function refresh() // odświeżaj stan strony
{
	lackOfTask(); // sprawdź czy są zadania na stronie
	var list = document.getElementById("list"); // pobierz listę zadań
	while (list.hasChildNodes()) 
	{
		list.removeChild(list.lastChild);
	}
	tasks.forEach(refresh_task); // odśwież stan każdego zadania
}

refresh(); // odśwież stan strony po załadowaniu

function addTask() // dodaj zadanie
{
	var newtask=document.getElementById("input-text"); // pobierz wartość z pola tekstowego
	if (newtask.value=="") // sprawdź, czy pole tekstowe jest puste
	{
		alert("Nie można dodawać pustego zadania!"); // jeśli pole tekstowe jest puste, wyświetl ostrzeżenie
	}
	else // w przeciwnym wypadku, dodaj zadanie
	{
		tasks.push({title: newtask.value, done: false}); // wstaw do tablicy tasks nowy obiekt z zadaniem
		refresh(); // odświeżaj stan strony
		newtask.value=""; // wyczyść pole tekstowe
	}
}

function keyDown(event) // akcja dla naciśniętego klawisza
{
	e.which = e.which || e.keyCode;
	if (event.which==13) // czy naciśnięto klawisz enter?
	{
		addTask(); // uruchom dodawanie zadania, jeśli wciśnięto klawisz enter
	}
}

var el=document.getElementById("input-button").onclick = addTask; // dodaj zadanie, jeśli kliknięto przycisk

document.onkeydown=keyDown; // dodaj zadanie, jeśli wciśnięto enter
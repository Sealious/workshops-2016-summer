var APP = {};

APP.dep = {
	submit: document.querySelector("#submit-button"),
	text: document.querySelector("#textarea"),
	list: document.querySelector("#id-list"),
	important: document.querySelector("#check")
}

APP.modules = (function modules() {

	var clickEvent = function clickEvent(element, fun) {
		console.log("fire clickEvent");
		element.addEventListener("click", fun);
	};

	//   DO DOPRACOWANIA - W GRUNCIE RZECZY BEZ SENSU BO TEXTAREA
	//   DAJE MOŻLIWOŚĆ DODAWANIA KILKU LINI TEKSTU
	var enterDownEvent = function enterDownEvent(element) {
		console.log("fire enterDownEvent");
		element.addEventListener("keypress", function (event) {
			event.preventDefault();
			if(event.keyCode === 13) {
				element.click();
			}
		});
	}

	var addItemToList = function addItemToList(list, text, important) {
		if (text) {
			console.log("in add item");
			var li = document.createElement('li');
			var liText = document.createTextNode(text);
			//   CZEMU TUTAJ NIE DZIAŁA ALE PO WYWOŁANIU JUŻ TAK...
			// text =  '';
			li.setAttribute('class', 'list-task' + (important ? ' list-task-important' : ''));
			li.appendChild(liText);
			list.appendChild(li);
			console.log(text);

		} else {
			console.log("no text");
		}	
	};

	return {
		clickEvent: clickEvent,
		addItemToList: addItemToList,
		enterDownEvent: enterDownEvent
	}
}());

APP.modules.clickEvent( APP.dep.submit, function () {
						APP.modules.addItemToList( APP.dep.list,
												   APP.dep.text.value, 
												   APP.dep.important.checked);
						APP.dep.text.value = '';
						});

APP.modules.enterDownEvent(APP.dep.submit);


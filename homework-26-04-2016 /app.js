var addItem = function(){
  var list = document.querySelector("#todo-list");
  var listItem = document.createElement("li");

  var input = document.querySelector("#textInput").value;
  var liText = document.createTextNode(input);

  listItem.appendChild(liText);
  list.appendChild(listItem);
}

var checkboxCounter = function(){
  counter = document.querySelector("#boxCounter");
  counter.textContent =  document.querySelectorAll('input[type="checkbox"]:checked').length;
}
var refreshCounter = function(){
  var list = document.querySelector("#todo-list");
  var counter = document.querySelector("#counter");
  counter.textContent = list.querySelectorAll("li").length;
}

document.getElementById("buttonInput").addEventListener("click". alert("mhm"));

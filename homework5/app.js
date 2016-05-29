var api_url = "http://sealcode.org:8082/api/v1/resources/task";
var tasks = [];

function render_task(task_data, index){
  var list = document.getElementById("to-do-list");
  var list_element = document.createElement("li");
  var item_title = document.createElement("div");
  var item_date = document.createElement("span");
  var item_checked = document.createElement("span");
  var item_checked_info = document.createElement("span");
  var icon = document.createElement("i");


  item_title.className = "title";
  item_date.className = "date";
  icon.className = "fa fa-clock-o";
  item_checked.className = "checked";
  item_checked_info.className = "checked_info";
  item_title.textContent = task_data.body.title;

  var checkbox = document.createElement("input");

  item_checked_info.textContent = "Done?";

  checkbox.type="checkbox";

  if(task_data.body.is_done == true)
     checkbox.checked = "checked";

  checkbox["data-task-id"] = index; 
  checkbox.onclick = checkbox_clicked;

  list_element.appendChild(item_title);
  list_element.appendChild(item_date);
  item_checked.appendChild(checkbox);
  item_date.appendChild(icon);

  var date = new Date(task_data.created_context.timestamp * 1000);

  item_date.innerHTML += " " + date;


  list_element.appendChild(item_checked);
  item_checked.appendChild(item_checked_info);
   
  list.appendChild(list_element);
  list.insertBefore(list_element, list.firstChild)
}

function checkbox_clicked(event){
  index = event.target["data-task-id"];
  tasks[index].done = event.target.checked;


  var id = tasks[index].id;
    var newUrl = api_url + '/' + id;
    qwest.delete(newUrl, null, {cache: true})
        .then(function (xhr, response) {
            console.log(response);
            tasks.splice(index, 1);
            render();
        })
        .catch(function (e, xhr, response) {
            alert("DELETE Error:" + e);
        });

}

function render(){
  var list = document.getElementById("to-do-list");

  while (list.hasChildNodes())
      list.removeChild(list.lastChild);

  tasks.forEach(render_task);
}

render();

function addTask(){
  var date_now = new Date().toJSON().slice(0,10);
  var title = document.getElementById('new-title').value;

  if(title == "")
  {
    document.getElementById('new-title').style.border = '2px solid #9B0C00'; 
    return ;
  }
  else
     document.getElementById('new-title').style.border = '2px solid #ccc'; 


  var fd = new FormData();
  fd.append('title', title);
  fd.append('is_done', false);

  qwest.post(api_url, fd, {cache: true})
   .then(function (xhr, response) {
            console.log(response);
            tasks.push(response);
            render();
        })
        .catch(function (e, xhr, response) {
            alert("POST Error:" + e);
        });

  render();
  document.getElementById('new-title').value = "";
}


function inputKeyUp(e) {
    e.which = e.which || e.keyCode;
    if(e.which == 13)
      addTask;

}

document.getElementById("create-new-task").onclick = addTask
document.getElementById("create-new-task").onkeyup = inputKeyUp;



qwest.get(api_url, {}, {dataType:'json',cache: true})
.then(function(xhr, data)
{
  tasks = data;
  render();
});


//usuwanie splice arrayindexOf
//array = [0].concact(array) dodawanie
//programowanie funkcyjne
//usuwanie z tablicy 
/*

patch zmiena jedno pole - edytuj
put - zastap
post - wstaw
musza zwrocic caly zasób 
get - pobierz
delete - tylko na zasobie - ma zwrocic 202

 */
var tasks = [
/*  {
    content: 'Odrobić zadanie domowe',
    completed: false
  },
  {
    content: 'Napisać maila',
    completed: false
  },
  {
    content: 'Spakować się',
    completed: false
  },
  {
    content: 'Kupić klapki',
    completed: false
  },
  {
    content: 'Zjeść obiad',
    completed: true
  } */
];

function addTask(event) {
  event.preventDefault();
  var input = document.getElementById('todo-content');
  var content = input.value.trim();
  if(content){
    var task = {content: content, completed: false};
    tasks.push(task);
    showTask(task);
    onTaskChecked();
  }
  input.value = '';
}

function showTask(task) {
  var list = document.querySelector('ul');
  var newTask = document.createElement('li');
  var taskLabel = document.createElement('span');

  var checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  if(task.completed) {
    checkbox.checked = 'checked';
  }
  checkbox.onclick = function() {
    check(task, !task.completed);
    refreshCounter();
  }
  newTask.appendChild(checkbox);

  taskLabel.textContent = task.content;
  newTask.appendChild(taskLabel);
  list.appendChild(newTask);
  if(tasks.length) {
    hideEmptyListMessage();
  }
  refreshCounter();
}

function showTasks() {
  if(tasks.length) {
    tasks.forEach(showTask);
  } else {
    showEmptyListMessage();
  }
}

function showEmptyListMessage(show) {
  var message = document.getElementById('alert');
  if(!message) {
    message = document.createElement('h3');
    message.style.textAlign = 'center';
    message.textContent = 'Nie masz żadnych zadań do wykonania, dobra robota!';
    message.id = 'alert';
    document.querySelector('body').appendChild(message);
  }
  message.style.display = 'block';
  var counter = document.getElementById('counter');
  counter.style.display = 'none';
}

function hideEmptyListMessage() {
  var message = document.getElementById('alert');
  if(message && message.style.display !== 'none') {
    message.style.display = 'none';
  }
  var counter = document.getElementById('counter');
  counter.style.display = 'block';
}

function removeCompleted() {
  if(tasks.length) {
    tasks = tasks.filter(task => !task.completed);
    clearList();
    showTasks();
  }
}

function clearList() {
  var list = document.querySelector('ul');
  while (list.hasChildNodes()) {
      list.removeChild(list.lastChild);
  }
}

function countCompletedTasks() {
  return tasks.filter(task => task.completed).length;
}

function refreshCounter() {
  var counter = document.getElementById('counter');
  counter.textContent = 'Wykonano ' + countCompletedTasks() + '/' + tasks.length + ' zadań';
}

function checkAll(completed) {
  tasks.forEach(function(task) {
    check(task, completed);
  });
}

function check(task, completed) {
  task.completed = completed;
  onTaskChecked();
}

function areAllTasksSelected() {
  if(!tasks.filter(task => !task.completed).length && tasks.length) {
    return true;
  }
  return false;
}

function onTaskChecked() {
  var selectAll = document.getElementById('select-all');
  var allSelected = areAllTasksSelected();
  selectAll.value = (allSelected ? 'Odznacz' : 'Zaznacz') + ' wszystkie';
  selectAll.onclick = function() {
    checkAll(!allSelected);
    clearList();
    showTasks();
  }
}

showTasks();
onTaskChecked();

document.getElementById('todo-form').onsubmit = addTask;
document.getElementById('remove-completed').onclick = function() {
  removeCompleted();
  onTaskChecked();
};

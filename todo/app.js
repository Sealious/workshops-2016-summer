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

function addTask() {
  var input = document.getElementById('todo-content');
  var task = {content: input.value, completed: false};
  input.value = '';
  tasks.push(task);
  showTask(task);
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
  newTask.appendChild(checkbox);

  taskLabel.textContent = task.content;
  newTask.appendChild(taskLabel);
  newTask.onclick = function() {
    task.completed = !task.completed;
  }
  list.appendChild(newTask);
  if(tasks.length) {
    document.getElementById('alert').style.display = 'none';
  }
}

function showTasks() {
  if(tasks.length) {
    tasks.forEach(showTask);
  } else {
    showEmptyListMessage();
  }
}

function showEmptyListMessage() {
  var message = document.getElementById('alert');
  if(!message) {
    message = document.createElement('h3');
    message.style.textAlign = 'center';
    message.textContent = 'Nie masz żadnych zadań do wykonania, dobra robota!';
    message.id = 'alert';
    document.querySelector('body').appendChild(message);
  }
  message.style.display = 'block';
}

function removeCompleted() {
  tasks = tasks.filter(task => !task.completed);
  clearList();
  showTasks();
}

function clearList() {
  var list = document.querySelector('ul');
  while (list.hasChildNodes()) {
      list.removeChild(list.lastChild);
  }
}

showTasks();

document.getElementById('todo-form').onsubmit = addTask;
document.getElementById('remove-completed').onclick = removeCompleted;

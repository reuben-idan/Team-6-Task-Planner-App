const taskForm = document.getElementById('taskForm');
const toDoTasks = document.getElementById('toDoTasks');
const inProgressTasks = document.getElementById('inProgressTasks');
const doneTasks = document.getElementById('doneTasks');
const saveBtn = document.getElementById('saveBtn');
const updateBtn = document.getElementById('updateBtn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let selectedTask = null;

// Load tasks from local storage
tasks.forEach((task) => {
  createTaskCard(task.name, task.description, task.assignedTo, task.dueDate, task.status);
});

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const assignedTo = document.getElementById('assignedTo').value;
  const dueDate = document.getElementById('dueDate').value;
  const status = document.getElementById('status').value;

  // Check if any required input field is missing
  if (!name || !description || !assignedTo || !dueDate || !status) {
    alert('Please fill in all the required input fields.');
    return;
  }

  if (selectedTask === null) {
    // New task
    const newTask = { name, description, assignedTo, dueDate, status };
    createTaskCard(name, description, assignedTo, dueDate, status);
    tasks.push(newTask);
    saveToLocalStorage();
    saveBtn.style.display = 'block';
    updateBtn.style.display = 'none';
  } else {
    // Update existing task
    const index = tasks.findIndex((task) => task === selectedTask);
    tasks[index] = { name, description, assignedTo, dueDate, status };
    updateTask(selectedTask, name, description, assignedTo, dueDate, status);
    saveToLocalStorage();
    selectedTask = null;
    saveBtn.style.display = 'block';
    updateBtn.style.display = 'none';
  }

  taskForm.reset();
});

function createTaskCard(name, description, assignedTo, dueDate, status) {
  const card = document.createElement('div');
  card.className = 'card mb-3';

  const cardHeaderColor = getCardHeaderColor(status);
  card.innerHTML = `
    <div class="card-header ${cardHeaderColor} text-white">
      <h5 class="card-title mb-0">${name}</h5>
      <button class="btn btn-danger btn-sm float-right delete-btn">Delete</button>
      <button class="btn btn-primary btn-sm float-right edit-btn mr-2">Edit</button>
    </div>
    <div class="card-body">
      <p class="card-text">${description}</p>
      <p>Assigned to: ${assignedTo}</p>
      <p>Due Date: ${dueDate}</p>
      <p>Status: ${status}</p>
    </div>
  `;

  const deleteBtn = card.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => {
    deleteTask(card);
  });

  const editBtn = card.querySelector('.edit-btn');
  editBtn.addEventListener('click', () => {
    populateTaskForm(name, description, assignedTo, dueDate, status);
    selectedTask = card;
    saveBtn.style.display = 'none';
    updateBtn.style.display = 'block';
  });

  appendToColumn(card, status);
}

function populateTaskForm(name, description, assignedTo, dueDate, status) {
  document.getElementById('name').value = name;
  document.getElementById('description').value = description;
  document.getElementById('assignedTo').value = assignedTo;
  document.getElementById('dueDate').value = dueDate;
  document.getElementById('status').value = status;
}

function updateTask(taskCard, name, description, assignedTo, dueDate, status) {
  const cardHeaderColor = getCardHeaderColor(status);
  taskCard.innerHTML = `
    <div class="card-header ${cardHeaderColor} text-white">
      <h5 class="card-title mb-0">${name}</h5>
      <button class="btn btn-danger btn-sm float-right delete-btn">Delete</button>
      <button class="btn btn-primary btn-sm float-right edit-btn mr-2">Edit</button>
    </div>
    <div class="card-body">
      <p class="card-text">${description}</p>
      <p>Assigned to: ${assignedTo}</p>
      <p>Due Date: ${dueDate}</p>
      <p>Status: ${status}</p>
    </div>
  `;

  const deleteBtn = taskCard.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => {
    deleteTask(taskCard);
  });

  const editBtn = taskCard.querySelector('.edit-btn');
  editBtn.addEventListener('click', () => {
    populateTaskForm(name, description, assignedTo, dueDate, status);
    selectedTask = taskCard;
    saveBtn.style.display = 'none';
    updateBtn.style.display = 'block';
  });

  updateTaskInLocalStorage(taskCard, name, description, assignedTo, dueDate, status);
  appendToColumn(taskCard, status);
}

function deleteTask(taskCard) {
  const index = tasks.findIndex((task) => task.name === taskCard.querySelector('h5').textContent);
  tasks.splice(index, 1);
  saveToLocalStorage();
  taskCard.remove();
}

function appendToColumn(taskCard, status) {
  switch (status) {
    case 'To Do':
      toDoTasks.appendChild(taskCard);
      break;
    case 'In Progress':
      inProgressTasks.appendChild(taskCard);
      break;
    case 'Done':
      doneTasks.appendChild(taskCard);
      break;
  }
}

function getCardHeaderColor(status) {
  switch (status) {
    case 'To Do':
      return 'bg-secondary';
    case 'In Progress':
      return 'bg-warning';
    case 'Done':
      return 'bg-success';
  }
}

function saveToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskInLocalStorage(taskCard, name, description, assignedTo, dueDate, status) {
  const index = tasks.findIndex((task) => task.name === taskCard.querySelector('h5').textContent);
  tasks[index] = { name, description, assignedTo, dueDate, status };
  saveToLocalStorage();
}

// Function to prevent user from selecting a past date
window.onload = function () {
  var today = new Date().toISOString().split("T")[0];
  document.getElementById("dueDate").setAttribute("min", today);
};

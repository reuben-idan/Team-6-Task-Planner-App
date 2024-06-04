// Create a new instance of the TaskManager class
const taskManager = new TaskManager();

// Function to save tasks to local storage
const saveTasksToLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(taskManager.getAllTasks()));
};

// Function to retrieve tasks from local storage
const retrieveTasksFromLocalStorage = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  if (tasks) {
    tasks.forEach((task) => {
      taskManager.addTask(
        task.name,
        task.description,
        task.assignedTo,
        task.dueDate,
        task.status
      );
    });
  }
};

// Function to handle form submission
const handleFormSubmit = (event) => {
  event.preventDefault();

  // Save tasks to local storage after form submission
  saveTasksToLocalStorage();

  // Get form input values
  const name = document.getElementById('nameInput').value;
  const description = document.getElementById('descriptionInput').value;
  const assignedTo = document.getElementById('assignedToInput').value;
  const dueDate = document.getElementById('dueDateInput').value;
  const status = document.getElementById('statusInput').value;

  // Add task to the task manager
  taskManager.addTask(name, description, assignedTo, dueDate, status);

  // Clear form inputs
  document.getElementById('nameInput').value = '';
  document.getElementById('descriptionInput').value = '';
  document.getElementById('assignedToInput').value = '';
  document.getElementById('dueDateInput').value = '';
  document.getElementById('statusInput').value = 'todo';

  // Render the updated task list
  renderTaskList();
};

// Function to handle task deletion
const handleTaskDelete = (taskId) => {
  taskManager.deleteTask(taskId);
  renderTaskList();
};

// Function to render the task list
const renderTaskList = () => {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  taskManager.getAllTasks().forEach((task) => {
    const taskCard = `
      <li class="list-group-item">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${task.name}</h5>
            <p class="card-text">${task.description}</p>
            <p class="card-text">Assigned To: ${task.assignedTo}</p>
            <p class="card-text">Due Date: ${task.dueDate}</p>
            <p class="card-text">Status: ${task.status}</p>
            <button class="btn btn-danger" onclick="handleTaskDelete('${task.id}')">Delete</button>
          </div>
        </div>
      </li>
    `;

    taskList.innerHTML += taskCard;
  });
};

// Add event listener to the form submit button
document.getElementById('taskForm').addEventListener('submit', handleFormSubmit);

// Render the initial task list
retrieveTasksFromLocalStorage(); // Retrieve tasks from local storage
renderTaskList();

const taskForm = document.getElementById("taskForm");
const toDoTasks = document.getElementById("toDoTasks");
const inProgressTasks = document.getElementById("inProgressTasks");
const doneTasks = document.getElementById("doneTasks");
const saveBtn = document.getElementById("saveBtn");
const updateBtn = document.getElementById("updateBtn");
const cancelBtn = document.getElementById("cancelBtn");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let selectedTask = null;

tasks.forEach((task) => {
  createTaskCard(
    task.name,
    task.description,
    task.assignedTo,
    task.dueDate,
    task.status
  );
});

// EvenListener to submit form
taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const assignedTo = document.getElementById("assignedTo").value;
  const dueDate = document.getElementById("dueDate").value;
  const status = document.getElementById("status").value;

  // Check if any required input field is missing
  if (!name || !description || !assignedTo || !dueDate || !status) {
    alert("Please fill in all the required input fields.");
    return;
  }

  if (selectedTask === null) {
    // New task
    const newTask = { name, description, assignedTo, dueDate, status };
    createTaskCard(name, description, assignedTo, dueDate, status);
    tasks.push(newTask);
    saveToLocalStorage();
    saveBtn.style.display = "block";
    updateBtn.style.display = "none";
    cancelBtn.style.display = "none";
  } else {
    // Update existing task
    const index = tasks.findIndex((task) => task === selectedTask);
    tasks[index] = { name, description, assignedTo, dueDate, status };
    updateTask(selectedTask, name, description, assignedTo, dueDate, status);
    saveToLocalStorage();
    selectedTask = null;
    saveBtn.style.display = "block";
    updateBtn.style.display = "none";
    cancelBtn.style.display = "none";
  }

  taskForm.reset();
});

// EventListener for the Cancel Button
cancelBtn.addEventListener("click", () => {
  taskForm.reset();
  saveBtn.style.display = "block";
  updateBtn.style.display = "none";
  cancelBtn.style.display = "none";
})

// EventListener for search button
searchBtn.addEventListener("click", () => {
  const searchTerm = searchInput.value.toLowerCase();
  filterTasks(searchTerm);
});

// EventListener to check if the search field is empty or not
searchInput.addEventListener("input", (event) => {
  if (event.target.value === "") {
    // Clear icon is clicked, show all tasks
    toDoTasks.innerHTML = '';
    inProgressTasks.innerHTML = '';
    doneTasks.innerHTML = '';
    tasks.forEach((task) => {
      if (!document.querySelector(`[data-task-name="${task.name}"]`)) {
        createTaskCard(task.name, task.description, task.assignedTo, task.dueDate, task.status);
      }
    });
  } else {
    // Filter tasks based on search input
    filterTasks(event.target.value.toLowerCase());
  }
});

// Function to filter tasks based on search term
function filterTasks(searchTerm) {
  // Clear existing task cards
  toDoTasks.innerHTML = '';
  inProgressTasks.innerHTML = '';
  doneTasks.innerHTML = '';

  // Filter tasks based on search term
  const filteredTasks = tasks.filter(task => {
    const name = task.name.toLowerCase();
    const description = task.description.toLowerCase();
    const assignedTo = task.assignedTo.toLowerCase();
    return name.includes(searchTerm) || description.includes(searchTerm) || assignedTo.includes(searchTerm);
  });

  // Create task cards for filtered tasks
  filteredTasks.forEach((task) => {
    createTaskCard(
      task.name,
      task.description,
      task.assignedTo,
      task.dueDate,
      task.status
    );
  });
}

// Function to create the task
function createTaskCard(name, description, assignedTo, dueDate, status) {
  const card = document.createElement("div");
  card.className = "card mb-3";

  const cardHeaderColor = getCardHeaderColor(status);
  card.innerHTML = `
    <div class="card-header ${cardHeaderColor} text-white">
      <h5 class="card-title mb-0">${name}</h5>
      <br>
      <div class="text-end">
      <a href="#form-top"><button class="btn btn-primary btn-sm float-right edit-btn me-3">Edit</button></a>
      <button class="btn btn-danger btn-sm float-right delete-btn" data-bs-toggle="modal" data-bs-target="#modalDeleteTask">Delete</button>
      </div>
    </div>
    <div class="card-body">
      <p class="card-text fst-italic">${description}</p>
      <hr/>
      <p><span class="fw-bold">Assigned to:</span> ${assignedTo}</p>
      <p><span class="fw-bold">Due Date:</span> ${dueDate}</p>
      <p><span class="fw-bold">Status:</span> ${status}</p>
    </div>
  `;

  // Get the delete button element on the selected task
  const deleteBtn = card.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {

  // Get the modal view in a div element
  const modal = document.getElementById("modalDeleteTask");

  // Get the confirm delete button
  const confirmDeleteBtn = modal.querySelector("#confirm-delete");

  // Add an event listener to the confirm delete button
  confirmDeleteBtn.addEventListener("click", () => {
    // Delete the task
    deleteTask(card);
    // Remove the modal
    modal.remove();
  });

  // Add an event listener to the cancel button
  modal.querySelector(".close").addEventListener("click", () => {
    // Remove the modal
    modal.remove();
  });

    deleteTask(card);
  });

  // Editing a task
  const editBtn = card.querySelector(".edit-btn");
  editBtn.addEventListener("click", () => {
    populateTaskForm(name, description, assignedTo, dueDate, status);
    selectedTask = card;
    saveBtn.style.display = "none";
    updateBtn.style.display = "flex";
    cancelBtn.style.display = "flex";
  });

  appendToColumn(card, status);
}

// Function to populating the task
function populateTaskForm(name, description, assignedTo, dueDate, status) {
  document.getElementById("name").value = name;
  document.getElementById("description").value = description;
  document.getElementById("assignedTo").value = assignedTo;
  document.getElementById("dueDate").value = dueDate;
  document.getElementById("status").value = status;
}

// Function to update the task
function updateTask(taskCard, name, description, assignedTo, dueDate, status) {
  const cardHeaderColor = getCardHeaderColor(status);
  taskCard.innerHTML = `
    <div class="card-header ${cardHeaderColor} text-white">
      <h5 class="card-title mb-0">${name}</h5>
      <br>
      <div class="text-end">
      <a href="#form-top"><button class="btn btn-primary btn-sm float-right edit-btn me-3">Edit</button></a>
      <button class="btn btn-danger btn-sm float-right delete-btn">Delete</button>
      </div>
    </div>
    <div class="card-body">
      <p class="card-text fst-italic">${description}</p>
      <hr/>
      <p><span class="fw-bold">Assigned to:</span> ${assignedTo}</p>
      <p><span class="fw-bold">Due Date:</span> ${dueDate}</p>
      <p><span class="fw-bold">Status:</span> ${status}</p>
    </div>
  `;

  // Update tasks into the LocalStorage
  updateTaskInLocalStorage(
    taskCard,
    name,
    description,
    assignedTo,
    dueDate,
    status
  );
  appendToColumn(taskCard, status);
}

// Function to delete tasks
function deleteTask(taskCard) {
  const index = tasks.findIndex(
    (task) => task.name === taskCard.querySelector("h5").textContent
  );
  tasks.splice(index, 1);
  saveToLocalStorage();
  taskCard.remove();
}

// Function to append task to the column
function appendToColumn(taskCard, status) {
  switch (status) {
    case "To Do":
      toDoTasks.appendChild(taskCard);
      break;
    case "In Progress":
      inProgressTasks.appendChild(taskCard);
      break;
    case "Done":
      doneTasks.appendChild(taskCard);
      break;
  }
}

// Function to get the head color
function getCardHeaderColor(status) {
  switch (status) {
    case "To Do":
      return "bg-secondary";
    case "In Progress":
      return "bg-warning";
    case "Done":
      return "bg-success";
  }
}

// Saving to the LocalStorage
function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Updating task in LocalStorage
function updateTaskInLocalStorage(
  taskCard,
  name,
  description,
  assignedTo,
  dueDate,
  status
) {
  const index = tasks.findIndex(
    (task) => task.name === taskCard.querySelector("h5").textContent
  );
  tasks[index] = { name, description, assignedTo, dueDate, status };
  saveToLocalStorage();
}

// Function to prevent user from selecting a past date
window.onload = function () {
  var today = new Date().toISOString().split("T")[0];
  document.getElementById("dueDate").setAttribute("min", today);
};

// Get the current year to display in the Footer
document.querySelector("#year").textContent = new Date().getFullYear();

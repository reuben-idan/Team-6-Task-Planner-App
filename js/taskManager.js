class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }

  addTask(name, description, assignedTo, dueDate, status) {
    this.currentId++;
    this.tasks.push({
      id: this.currentId,
      name: name,
      description: description,
      assignedTo: assignedTo,
      dueDate: dueDate,
      status: status || "TODO",
    });
  }

  deleteTask(taskId) {
    const newTasks = [];
    for (const task of this.tasks) {
      if (task.id !== taskId) {
        newTasks.push(task);
      }
    }
    this.tasks = newTasks;
  }

  createTaskHtml(task) {
    return `
          <li class="task" data-task-id="${task.id}">
            <!-- ... other HTML for task elements ... -->
            <button class="delete-button">Delete</button>
          </li>
        `;
  }

  save() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  render() {
    const tasksList = document.querySelector("#tasks-list");
    tasksList.innerHTML = ""; // Clear existing tasks

    for (const task of this.tasks) {
      const taskHtml = this.createTaskHtml(task);
      tasksList.innerHTML += taskHtml;
    }
  }

  load() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
      // Update currentId if necessary and ensuring that it's the highest id
      this.currentId = Math.max(
        ...this.tasks.map((task) => task.id),
        this.currentId
      );
    }
  }
}

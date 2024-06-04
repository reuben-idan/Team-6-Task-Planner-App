class TaskManager {
    constructor() {
        this.tasks = this.retrieveTasksFromLocalStorage() || [];
    }
  
    saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      }
    
      retrieveTasksFromLocalStorage() {
        return JSON.parse(localStorage.getItem('tasks'));
      }

    addTask(name, description, assignedTo, dueDate, status) {
      const task = {
        id: this.generateTaskId(),
        name: name,
        description: description,
        assignedTo: assignedTo,
        dueDate: dueDate,
        status: status,
      };
  
      this.tasks.push(task);
      // Save tasks to local storage after adding a new task
      this.saveTasksToLocalStorage();
    }
  
    generateTaskId() {
      let id = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
      for (let i = 0; i < 6; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length));
      }
  
      return id;
    }
  
    deleteTask(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
      this.saveTasksToLocalStorage(); // Save tasks to local storage after deleting a task
    }
  
    getTaskById(taskId) {
      return this.tasks.find(task => task.id === taskId);
    }
  
    updateTask(taskId, updatedTask) {
      const taskIndex = this.tasks.findIndex(task => task.id === taskId);
  
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = updatedTask;
      }
      this.saveTasksToLocalStorage(); // Save tasks to local storage after updating a task
    }
  
    getAllTasks() {
      return this.tasks;
    }
  }
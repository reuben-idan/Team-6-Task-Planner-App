const taskForm = document.getElementById('taskForm');
    const toDoTasks = document.getElementById('toDoTasks');
    const inProgressTasks = document.getElementById('inProgressTasks');
    const doneTasks = document.getElementById('doneTasks');

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

      const card = document.createElement('div');
      card.className = 'card mb-3';

      let cardHeaderColor;
      switch (status) {
        case 'To Do':
          cardHeaderColor = 'bg-secondary';
          toDoTasks.appendChild(card);
          break;
        case 'In Progress':
          cardHeaderColor = 'bg-warning';
          inProgressTasks.appendChild(card);
          break;
        case 'Done':
          cardHeaderColor = 'bg-success';
          doneTasks.appendChild(card);
          break;
      }

      card.innerHTML = `
        <div class="card-header ${cardHeaderColor} text-white">
          <h5 class="card-title mb-0">${name}</h5>
          <button class="btn btn-danger btn-sm float-right delete-btn">Delete</button>
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
        card.remove();
      });

      taskForm.reset();
    });

    // Function to prevent user from selecting a past date
window.onload = function () {
  var today = new Date().toISOString().split("T")[0];
  document.getElementById("dueDate").setAttribute("min", today);
};

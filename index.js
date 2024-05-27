
document.querySelector('#taskForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.querySelector('#name').value;
    const description = document.querySelector('#description').value;
    const assignedTo = document.querySelector('#assignedTo').value;
    const dueDate = document.querySelector('#dueDate').value;
    const status = document.querySelector('#status').value;

    const errorElement = document.querySelector('#error');
    errorElement.style.display = 'none';
    
    const successElement = document.querySelector('#success');
    successElement.style.display = 'none';

    if (!name || !description || !assignedTo || !dueDate || !status) {
        errorElement.textContent = 'All fields are required.';
        errorElement.style.display = 'block';
        successElement.style.display = 'none';
        console.log('Form not valid');
    } else {
        successElement.textContent = 'Form submitted succesfully.';
        successElement.style.display = 'block';
        errorElement.style.display = 'none';
        console.log('Form is valid');
    }
});

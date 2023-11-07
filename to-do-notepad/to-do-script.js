// Set variables to all page elements

const noteContainer = document.getElementById('note-container');
const noteInput = document.getElementById('note-input');
const noteSubmit = document.getElementById('note-submit');

// Note array
let noteTasks = [];

// By default, -1 means no task is being edited
let editIndex = -1; 

// Listening for a button click
noteSubmit.addEventListener('click', function(event) {
    // Prevent the default behavior of the form submission
    event.preventDefault();

    // Grab value from the input
    const noteInputValue = noteInput.value.trim();

    // Checks if the input is not empty
    if (noteInputValue.length) {
        if (editIndex !== -1) {
            // Update the existing task
            noteTasks[editIndex] = noteInputValue;

            // Reset the editIndex
            editIndex = -1;
        } else {
            // Add the task to the task array
            noteTasks.push(noteInputValue);
        }

        // Update the DOM
        updateNotes();

        // Clear the input field
        noteInput.value = '';
    }
});

function updateNotes() {
    // Clearing noteContainer first
    noteContainer.innerHTML = '';

    // Append each task to the noteContainer
    noteTasks.forEach(function (task) {
        // Wrapper for the taskElement and deleteButton
        const taskWrapper = document.createElement('div');
        taskWrapper.className = 'task-wrapper';
        // Wrapper for the options
        const optionWrapper = document.createElement('div');
        optionWrapper.className = 'option-wrapper';

        // Task element creation
        const taskElement = document.createElement('div');
        taskElement.className = 'task'; 
        taskElement.textContent = task;
        // Delete button creation
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.textContent = 'X';
        // Edit button creation
        const editButton = document.createElement('button');
        editButton.className = 'edit';
        editButton.textContent = 'Edit';

        saveTasks();


        // Delete completed tasks
        deleteButton.addEventListener('click', function(event) {
            // Find the index of the task in noteTasks
            const index = noteTasks.indexOf(task);
            if (index > -1) {
                // Remove the task from noteTasks array
                noteTasks.splice(index, 1);
            }

            taskWrapper.remove();
            // Update the DOM and local storage
            updateNotes();
            saveTasks();
        });

        // Edit button event listener
        editButton.addEventListener('click', function() {
            // Loads the task back to the HTML textarea for editing
            noteInput.value = task;

            // Set the index of the task being edited
            editIndex = noteTasks.indexOf(task);
        });

        // Appends
        optionWrapper.appendChild(editButton);
        optionWrapper.appendChild(deleteButton);
        

        taskWrapper.appendChild(taskElement);
        taskWrapper.appendChild(optionWrapper);

        // Append the taskElement and optionWrapper to the noteContainer
        noteContainer.appendChild(taskWrapper);

    });
    saveTasks();
}

// Function to save tasks to local storage

function saveTasks() {
    localStorage.setItem('noteTasks', JSON.stringify(noteTasks));
}

// Function to load tasks from local storage

function loadTasks() {
    const storedTasks = localStorage.getItem('noteTasks');
    if (storedTasks) {
        noteTasks = JSON.parse(storedTasks);
        updateNotes();
    }
}

loadTasks();
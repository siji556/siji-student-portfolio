// ==================================
// ACADEMIC PLANNER
// ==================================


// Get HTML elements

const taskForm = document.getElementById("taskForm");

const taskInput = document.getElementById("taskInput");

const taskDate = document.getElementById("taskDate");

const taskList = document.getElementById("taskList");


// Load saved tasks from Local Storage

let tasks = JSON.parse(localStorage.getItem("academicTasks")) || [];


// ==================================
// SAVE TASKS
// ==================================

function saveTasks() {

    localStorage.setItem(
        "academicTasks",
        JSON.stringify(tasks)
    );

}


// ==================================
// DISPLAY TASKS
// ==================================

function displayTasks() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {

        taskList.innerHTML = `
            <p class="empty-message">
                No tasks yet. Add your first academic task!
            </p>
        `;

    }

    tasks.forEach(function(task) {

        const taskItem = document.createElement("div");

        taskItem.className = "task-item";

        if (task.completed) {

            taskItem.classList.add("completed");

        }

        const taskDetails = document.createElement("div");

        taskDetails.className = "task-details";

        const taskTitle = document.createElement("h3");

        taskTitle.textContent = task.name;

        const taskDeadline = document.createElement("p");

        taskDeadline.textContent = task.date
            ? "Due: " + task.date
            : "No deadline set";

        taskDetails.appendChild(taskTitle);

        taskDetails.appendChild(taskDeadline);


        const taskActions = document.createElement("div");

        taskActions.className = "task-actions";


        const completeButton = document.createElement("button");

        completeButton.className = "complete-btn";

        completeButton.textContent = task.completed
            ? "Undo"
            : "Complete";

        completeButton.addEventListener("click", function() {

            toggleTask(task.id);

        });


        const deleteButton = document.createElement("button");

        deleteButton.className = "delete-btn";

        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {

            deleteTask(task.id);

        });


        taskActions.appendChild(completeButton);

        taskActions.appendChild(deleteButton);


        taskItem.appendChild(taskDetails);

        taskItem.appendChild(taskActions);


        taskList.appendChild(taskItem);

    });


    updateStatistics();

}


// ==================================
// ADD NEW TASK
// ==================================

function addTask(name, date) {

    const newTask = {

        id: Date.now(),

        name: name,

        date: date,

        completed: false

    };


    tasks.push(newTask);

    saveTasks();

    displayTasks();

}


// ==================================
// COMPLETE OR UNDO TASK
// ==================================

function toggleTask(id) {

    tasks = tasks.map(function(task) {

        if (task.id === id) {

            task.completed = !task.completed;

        }

        return task;

    });


    saveTasks();

    displayTasks();

}


// ==================================
// DELETE TASK
// ==================================

function deleteTask(id) {

    tasks = tasks.filter(function(task) {

        return task.id !== id;

    });


    saveTasks();

    displayTasks();

}


// ==================================
// UPDATE STATISTICS
// ==================================

function updateStatistics() {

    const total = tasks.length;

    const completed = tasks.filter(function(task) {

        return task.completed;

    }).length;

    const pending = total - completed;


    document.getElementById("totalTasks").textContent = total;

    document.getElementById("completedTasks").textContent = completed;

    document.getElementById("pendingTasks").textContent = pending;

}


// ==================================
// FORM EVENT LISTENER
// ==================================

taskForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const name = taskInput.value.trim();

    const date = taskDate.value;


    if (name === "") {

        alert("Please enter a task description.");

        return;

    }


    addTask(name, date);


    taskForm.reset();

});


// DISPLAY SAVED TASKS WHEN PAGE LOADS

displayTasks();
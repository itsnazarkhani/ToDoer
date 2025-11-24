document.addEventListener('DOMContentLoaded', () => {

    // ----- Storage -----
    const STORAGE_KEY = "tasks";

    function getTasksFromLocalStorage() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    }

    function saveTasksToLocalStorage() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }

    // Load tasks from storage
    let tasks = getTasksFromLocalStorage();


    // ----- UI Elements -----
    const taskInput = document.getElementById('txtBox');
    const addBtn = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');


    // ----- Render Tasks -----
    function renderAllTasks() {
        taskList.innerHTML = "";
        tasks.forEach(task => addTaskToUI(task));
    }

    function addTaskToUI(task) {
        const li = document.createElement('li');
        li.className = 'taskItem';
        li.dataset.id = task.id;  // stores ID as string
        li.innerHTML = `
            <span class="taskText">${task.task}</span>
            <div id="taskItemBtnsContainer">
                <button class="editBtn">
                    <img src="assets/icon/edit.svg" alt="Edit Task">
                </button>
                <button class="doneBtn">
                    <img src="assets/icon/done.svg" alt="Mark Task as Done">
                </button>
            </div>
        `;
        taskList.appendChild(li);
    }

    // Render tasks on page load
    renderAllTasks();


    // ----- Add New Task -----
    addBtn.addEventListener('click', () => {
        const text = taskInput.value.trim();
        if (!text) return;

        const newTask = {
            id: Date.now().toString(),   // store ID as string
            task: text
        };

        tasks.push(newTask);
        saveTasksToLocalStorage();
        addTaskToUI(newTask);

        taskInput.value = "";
    });


    // ----- Delete Task -----
    function deleteTaskById(id) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasksToLocalStorage();
    }


    // ----- Edit or Delete From UI -----
    taskList.addEventListener('click', event => {
        const doneBtn = event.target.closest('.doneBtn');
        const editBtn = event.target.closest('.editBtn');
        const taskItem = event.target.closest('.taskItem');

        if (!taskItem) return;

        const id = taskItem.dataset.id;

        // Delete Task
        if (doneBtn) {
            deleteTaskById(id);
            taskItem.remove();
        }

        // Edit Task
        else if (editBtn) {
            const taskTextSpan = taskItem.querySelector('.taskText');
            taskInput.value = taskTextSpan.textContent;
            taskInput.focus();

            deleteTaskById(id);
            taskItem.remove();
        }
    });

});

document.addEventListener('DOMContentLoaded', function () {
    var taskInput = document.getElementById('txtBox');
    var addBtn = document.getElementById('addTask')
    var taskList = document.getElementById('taskList');

    addBtn.addEventListener('click', function () {
        var taskText = taskInput.value.trim();
        if (taskText !== '') {
            var taskItem = document.createElement('li');
            taskItem.className = 'taskItem';
            var taskId = Date.now();
            taskItem.setAttribute('data-id', taskId);
            taskItem.innerHTML = `
            <span class="taskText">${taskText}</span>
            <div id="taskItemBtnsContainer">
                <button class="editBtn">
                    <img src="assets/icon/edit.svg" alt="Edit Task">
                </button>
                <button class="doneBtn">
                    <img src="assets/icon/done.svg" alt="Mark Task as Done">
                </button>
            </div>`;
            taskList.appendChild(taskItem);
            taskInput.value = '';
        }
    });

    // Task Item actions
    taskList.addEventListener('click', function (event) {
        if (event.target.closest('.doneBtn')) {
            const taskItem = event.target.closest('.taskItem');
            taskItem.remove();
        }
        else if (event.target.closest('.editBtn')) {
            const taskItem = event.target.closest('.taskItem');
            const taskTextSpan = taskItem.querySelector('.taskText');
            const currentText = taskTextSpan.textContent;
            taskInput.value = currentText;
            taskInput.focus();
            taskItem.remove();
        }
    });
});
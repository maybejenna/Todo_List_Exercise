document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector("#listForm"); 
    const toDoInput = document.querySelector('#toDoInput');
    const toDoList = document.querySelector('#toDo');
    const removeSelectedBtn = document.querySelector('.removeButton');

    function updateLocalStorage() {
        const todos = [];
        toDoList.querySelectorAll('li').forEach(todo => {
            todos.push({
                text: todo.textContent.trim(),
                completed: todo.classList.contains('completed')
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function createToDoItem(text, completed = false) {
        const newToDo = document.createElement('li');
        if (completed) {
            newToDo.classList.add('completed');
        }
        const newBox = document.createElement('input');
        newBox.type = 'checkbox';
        newBox.checked = completed;

        if (completed) {
            newToDo.classList.add('completed');
        }

        newBox.addEventListener('change', function() {
            // Update only if the checkbox state changes, not based on 'completed' class
            if (newBox.checked) {
                newToDo.classList.add('completed');
            } else {
                newToDo.classList.remove('completed');
            }
            updateLocalStorage();
        });

        newToDo.appendChild(newBox);
        newToDo.appendChild(document.createTextNode(' ' + text));
        toDoList.appendChild(newToDo);
    }

    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    savedTodos.forEach(todo => createToDoItem(todo.text, todo.completed));

    toDoList.addEventListener("click", function(e) {
        if(e.target && e.target.nodeName == "LI") {
            e.target.classList.toggle('completed');
            updateLocalStorage();
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!toDoInput.value) {
            return; 
        }
        createToDoItem(toDoInput.value);
        updateLocalStorage();
        toDoInput.value = '';
    });

    removeSelectedBtn.addEventListener('click', function() {
        const allTodos = Array.from(toDoList.getElementsByTagName('li'));

        for (let i = allTodos.length - 1; i >= 0; i--) {
            const todo = allTodos[i];
            const checkbox = todo.querySelector('input[type="checkbox"]');

            if (checkbox && checkbox.checked) {
                toDoList.removeChild(todo);
            }
        }
        updateLocalStorage();
    });
});
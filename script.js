const form = document.getElementById('todoform');
const todoInput = document.getElementById('newtodo');
const todoListEl = document.getElementById('todolist');
const notificationEl = document.querySelector('.notification');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let EditTodoId = -1;

// Render the initial to do list
renderTodos();

// Handle form submission 
form.addEventListener('submit', function (event) {
  event.preventDefault();

  saveTodo();
  renderTodos();
  localStorage.setItem('todos', JSON.stringify(todos));
});

//Save a new todo 
function saveTodo() {
  const todoValue = todoInput.value;

  // check if the todo is empty
  const isEmpty = todoValue === '';

  // check for duplicate todos
  const isDuplicate = todos.some((todo) => todo.value.toUpperCase() === todoValue.toUpperCase());

  if (isEmpty) {
    showNotification("Todo's input is empty");
  } else if (isDuplicate) {
    showNotification('Todo already exists!');
  } else {
    if (EditTodoId >= 0) {
      todos = todos.map((todo, index) => ({
        ...todo,
        value: index === EditTodoId ? todoValue : todo.value,
      }));
      EditTodoId = -1;
    } else {
      todos.push({
        value: todoValue,
        checked: false,
        color: '#' + Math.floor(Math.random() * 16777215).toString(16),
      });
    }

    todoInput.value = '';
  }
}

// RENDER TODOS
function renderTodos() {
  if (todos.length === 0) {
    todoListEl.innerHTML = '<center>Nothing to do!</center>';
    return;
  }

  // CLEAR ELEMENT BEFORE A RE-RENDER
  todoListEl.innerHTML = '';

  // RENDER TODOS
  todos.forEach((todo, index) => {
    todoListEl.innerHTML += `
    <div class="todo" id=${index}>
      <i 
        class="bi ${todo.checked ? 'bi-check-circle-fill' : 'bi-circle'}"
        style="color : ${todo.color}"
        data-action="check"
      ></i>
      <p class="${todo.checked ? 'checked' : ''}" data-action="check">${todo.value}</p>
      <i class="bi bi-pencil-square" data-action="edit"></i>
      <i class="bi bi-trash" data-action="delete"></i>
    </div>
    `;
  });
}

// CLICK EVENT LISTENER FOR ALL THE TODOS
todoListEl.addEventListener('click', (event) => {
  const target = event.target;
  const parentElement = target.parentNode;

  if (parentElement.className !== 'todo') return;

  // t o d o id
  const todo = parentElement;
  const todoId = Number(todo.id);

  // target action
  const action = target.dataset.action;

  action === 'check' && checkTodo(todoId);
  action === 'edit' && editTodo(todoId);
  action === 'delete' && deleteTodo(todoId);
});

// CHECK A TODO
function checkTodo(todoId) {
  todos = todos.map((todo, index) => ({
    ...todo,
    checked: index === todoId ? !todo.checked : todo.checked,
  }));

  renderTodos();
  localStorage.setItem('todos', JSON.stringify(todos));
}

// EDIT A TODO
function editTodo(todoId) {
  todoInput.value = todos[todoId].value;
  EditTodoId = todoId;
}

// DELETE TODO
function deleteTodo(todoId) {
  todos = todos.filter((todo, index) => index !== todoId);
  EditTodoId = -1;

  // re-render
  renderTodos();
  localStorage.setItem('todos', JSON.stringify(todos));
}

// SHOW A NOTIFICATION
function showNotification(msg) {
  // change the message
  notificationEl.innerHTML = msg;

  // notification enter
  notificationEl.classList.add('notif-enter');

  // notification leave
  setTimeout(() => {
    notificationEl.classList.remove('notif-enter');
  }, 2000);
}

// Your array of quotes
const quotes = [
    {
      "text": "Genius is one percent inspiration and ninety-nine percent perspiration.",
      "author": "Thomas Edison"
    },
    {
      "text": "You can observe a lot just by watching.",
      "author": "Yogi Berra"
    },
    {
      "text": "A house divided against itself cannot stand.",
      "author": "Abraham Lincoln"
    },
    {
      "text": "Difficulties increase the nearer we get to the goal.",
      "author": "Johann Wolfgang von Goethe"
    },
    {
      "text": "Fate is in your hands and no one else's",
      "author": "Byron Pulsifer"
    },
    {
      "text": "Be the chief but never the lord.",
      "author": "Lao Tzu"
    },
    {
      "text": "Nothing happens unless first we dream.",
      "author": "Carl Sandburg"
    },
    {
      "text": "Well begun is half done.",
      "author": "Aristotle"
    },
    {
      "text": "Life is a learning experience, only if you learn.",
      "author": "Yogi Berra"
    },
    {
      "text": "Self-complacency is fatal to progress.",
      "author": "Margaret Sangster"
    },
    {
      "text": "Peace comes from within. Do not seek it without.",
      "author": "Buddha"
    },
    {
      "text": "What you give is what you get.",
      "author": "Byron Pulsifer"
    },
    {
      "text": "We can only learn to love by loving.",
      "author": "Iris Murdoch"
    },
    {
      "text": "Life is change. Growth is optional. Choose wisely.",
      "author": "Karen Clark"
    },
    {
      "text": "You'll see it when you believe it.",
      "author": "Wayne Dyer"
    },
    {
      "text": "Today is the tomorrow we worried about yesterday.",
      "author":  "Unknown"
    }
];

// Function to display a random motivational quote
function displayMotivationalQuote() {
  const motivationalQuoteEl = document.getElementById('motivational-quote');
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Update the content of the motivational quote element
  motivationalQuoteEl.innerHTML = `<p>"${randomQuote.text}" - ${randomQuote.author}</p>`;
}

// Call the function to display a quote when the page loads
displayMotivationalQuote();

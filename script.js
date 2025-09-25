const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list  = document.getElementById('todo-list');

// Load saved todos from localStorage
const todos = JSON.parse(localStorage.getItem('todos')) || [];
todos.forEach(addTodoToDOM);

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  const todo = { text, done: false };
  todos.push(todo);
  save();
  addTodoToDOM(todo);
  input.value = '';
});

function addTodoToDOM(todo) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = todo.text;
  if (todo.done) li.classList.add('completed');

  span.addEventListener('click', () => {
    todo.done = !todo.done;
    li.classList.toggle('completed');
    save();
  });

  const delBtn = document.createElement('button');
  delBtn.textContent = '✕';
  delBtn.className = 'delete';
  delBtn.addEventListener('click', () => {
    const idx = todos.indexOf(todo);
    todos.splice(idx, 1);
    li.remove();
    save();
  });

  li.append(span, delBtn);
  list.appendChild(li);
}

function save() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

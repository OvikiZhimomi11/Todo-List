/******************************************************
 * ELEMENT REFERENCES
 ******************************************************/
const form     = document.getElementById('todo-form');
const input    = document.getElementById('todo-input');
const list     = document.getElementById('todo-list');
const menuBtn  = document.getElementById('menu-btn');
const dlBtn    = document.getElementById('downloadBtn');

/******************************************************
 * STATE
 ******************************************************/
const todos = JSON.parse(localStorage.getItem('todos')) || [];

/******************************************************
 * INIT – Load saved todos
 ******************************************************/
todos.forEach(addTodoToDOM);

/******************************************************
 * EVENT LISTENERS
 ******************************************************/
// Add a new todo
form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  const todo = { text, done: false };
  todos.push(todo);
  saveTodos();
  addTodoToDOM(todo);

  input.value = '';
});

// Toggle dark mode & animate hamburger
menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
  document.body.classList.toggle('dark');
});

// Capture and download as image or PDF
dlBtn.addEventListener('click', async () => {
  const area   = document.querySelector('.container'); // capture whole app
  const canvas = await html2canvas(area, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');

  // Save as PNG
  const link = document.createElement('a');
  link.href = imgData;
  link.download = 'todo-list.png';
  link.click();

  // --- Optional: Save as PDF ---
  // const { jsPDF } = window.jspdf;
  // const pdf = new jsPDF('p', 'mm', 'a4');
  // const imgWidth = 210;
  // const imgHeight = (canvas.height * imgWidth) / canvas.width;
  // pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  // pdf.save('todo-list.pdf');
});

/******************************************************
 * FUNCTIONS
 ******************************************************/
function addTodoToDOM(todo) {
  const li   = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = todo.text;
  if (todo.done) li.classList.add('completed');

  // Toggle completion on click
  span.addEventListener('click', () => {
    todo.done = !todo.done;
    li.classList.toggle('completed');
    saveTodos();
  });

  // Delete button
  const delBtn = document.createElement('button');
  delBtn.textContent = '✕';
  delBtn.className   = 'delete';
  delBtn.addEventListener('click', () => {
    const idx = todos.indexOf(todo);
    todos.splice(idx, 1);
    li.remove();
    saveTodos();
  });

  li.append(span, delBtn);
  list.appendChild(li);
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

/******************************************************
 * OPTIONAL NOTIFICATION (Example)
 ******************************************************/
if (Notification.permission === 'granted') {
  new Notification('Task Reminder!', { body: 'Task 1 is due today.' });
}
// Request permission on first load if not granted
else if (Notification.permission !== 'denied') {
  Notification.requestPermission();
}

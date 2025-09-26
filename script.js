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
document.querySelector('#toggleTheme').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

function save() {
  localStorage.setItem('todos', JSON.stringify(todos));
}
// Toggle dark mode + animate hamburger
const menuBtn = document.getElementById('menu-btn');
menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
  document.body.classList.toggle('dark');
});

// Capture and download
const dlBtn = document.getElementById('downloadBtn');
dlBtn.addEventListener('click', async () => {
  const area = document.querySelector('.container'); // capture whole app

  const canvas = await html2canvas(area, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');

  // Save as PNG
  const link = document.createElement('a');
  link.href = imgData;
  link.download = 'todo-list.png';
  link.click();

  // Optional PDF
  // const { jsPDF } = window.jspdf;
  // const pdf = new jsPDF('p', 'mm', 'a4');
  // const imgWidth = 210;
  // const imgHeight = (canvas.height * imgWidth) / canvas.width;
  // pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  // pdf.save('todo-list.pdf');
});

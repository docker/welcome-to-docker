const form = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoLabel = document.getElementById('todo-list');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const todoText = todoInput.value.trim();
  
  if (todoText === '') {
    const todoLabel = document.createElement('li');
  
  this.textContent = todoText;

  li.addEventListener('click', function() {
    li.classList.toggle('completed');
  });

  todo.List.appendChild(li);
  input.value = '';
}
});


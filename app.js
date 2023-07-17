// Tüm elementleri seçmek

const form = document.querySelector('#todoAddForm');
const addInput = document.querySelector('#todoName');
const todoList = document.querySelector('.list-group');
const firstCardBody = document.querySelectorAll('.card-body')[0];
const secondCardBody = document.querySelectorAll('.card-body')[1];
const clearButton = document.querySelector('#clearButton');
const filterInput = document.querySelector('#todoSearch');

let todos = [];

runEvents();

function runEvents() {
  form.addEventListener('submit', addTodo);
  document.addEventListener('DOMContentLoaded', storageToTodos);
  secondCardBody.addEventListener('click', removeTodoToUI);
  clearButton.addEventListener('click', allTodosEverywhere);
  filterInput.addEventListener('keyup', filter);
}

function storageToTodos() {
  checkTodosFromStorage();
  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}

function filter(e) {
  const filterValue = e.target.value.toLowerCase().trim();
  const todoListesi = document.querySelectorAll('.list-group-item');

  if (todoListesi.length > 0) {
    todoListesi.forEach(function (todo) {
      if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
        todo.setAttribute('style', 'display: block');
      } else {
        todo.setAttribute('style', 'display: none !important');
      }
    });
  } else {
    showAlert('warning', 'Liste boş olduğu için filtreleme yapılamıyor.');
  }
}

function allTodosEverywhere() {
  const todoListesi = document.querySelectorAll('.list-group-item');
  if (todoListesi.length > 0) {
    todoListesi.forEach(function (todo) {
      todo.remove();
    });
    todos = [];
    localStorage.setItem('todos', JSON.stringify(todos));
    showAlert('success', 'Başarılı bir şekilde silindi.');
  } else {
    showAlert('warning', 'Silmek için en az bir todo olmalıdır.');
  }
}

function removeTodoToUI(e) {
  if (e.target.className == 'fa fa-remove') {
    const todo = e.target.parentElement.parentElement;
    todo.remove();

    removeTodoToStorage(todo.textContent);
  }
}

function removeTodoToStorage(removeTodo) {
  checkTodosFromStorage();
  todos.forEach(function (todo, index) {
    if (removeTodo === todo) {
      todos.splice(index, 1);
    }
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo(e) {
  const inputText = addInput.value.trim();
  if (inputText == null || inputText == '') {
    showAlert('warning', 'Lütfen bir değer giriniz!');
  } else {
    addTodoToUI(inputText);
    addTodoToStorage(inputText);
    showAlert('success', 'Todo başarılı bir şekilde eklendi.');
  }
  // Arayüze ekleme
  // Storage ekleme
  e.preventDefault();
}

function addTodoToUI(newTodo) {
  /*<li class="list-group-item d-flex justify-content-between">Todo 1
  <a href="#" class="delete-item">
  <i class="fa fa-remove"></i>
  </a>
  </li> */
  const li = document.createElement('li');
  li.className = 'list-group-item d-flex justify-content-between';
  li.textContent = newTodo;

  const a = document.createElement('a');
  a.className = 'delete-item';
  a.href = '#';

  const i = document.createElement('i');
  i.className = 'fa fa-remove';

  a.appendChild(i);
  li.appendChild(a);
  todoList.appendChild(li);

  addInput.value = '';
}

function addTodoToStorage(newTodo) {
  checkTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function checkTodosFromStorage() {
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
}

function showAlert(type, message) {
  /* <div class = "alert alert-warning" role="alert">
    this is warning message
    </div>*/
  const div = document.createElement('div');
  div.className = `alert alert-${type}`; // literal template
  div.textContent = message;
  firstCardBody.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 1000);
}

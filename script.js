const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

const todoList = []
let itemCount = Number(itemCountSpan.innerHTML)
let todoIDCounter = 0

function addTodo() {
  const todo = prompt('Write your new todo')

  if (todo) {
    todoObject = {
      id: todoIDCounter,
      html:
        '<div class="todo-container">' +
          '<input class="todo-checkbox" type="checkbox" onClick="checkTodo(' + todoIDCounter + ')" unchecked>' +
          '<li class="todo-text">' + todo + "</li>" +
          '<button class="todo-delete" onClick="deleteTodo(' + todoIDCounter + ')">Delete</button>' +
        '</div>',
      checked: false
    }

    todoList.push(todoObject)

    list.innerHTML = list.innerHTML + todoList[itemCount].html

    updateItemCount("add")
    updateUncheckedCount()
    todoIDCounter++
  }
}

function checkTodo(todoID) {
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id === todoID) {
      if (todoList[i].checked === false) {
        let html = todoList[i].html
        html = html.replace("unchecked", "checked")
        
        todoList[i].html = html
        todoList[i].checked = true
      }
      else if (todoList[i].checked === true) {
        let html = todoList[i].html
        html = html.replace("checked", "unchecked")
        
        todoList[i].html = html
        todoList[i].checked = false
      }
    }
  }

  updateUncheckedCount()
}

function deleteTodo(todoID) {
  list.innerHTML = ""
  
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id === todoID) {
      todoList.splice(i, 1)
    }

    if (todoList[i]) {
      list.innerHTML = list.innerHTML + todoList[i].html
    }
  }

  updateItemCount("sub")
}

function updateItemCount(operation) {
  if (operation === "add") {
    itemCount++
  }
  else if (operation === "sub") {
    itemCount--
  }

  itemCountSpan.innerHTML = itemCount
}

function updateUncheckedCount() {
  let unchecked = 0

  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].checked === false) {
      unchecked++
    }
  }

  uncheckedCountSpan.innerHTML = unchecked
}
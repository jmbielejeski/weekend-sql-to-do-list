console.log('client js is running');

$(document).ready(onReady);

function onReady() {
  console.log('in onReady');
  getToDoList();

  $(document).on('click', '#addButton', addTask);
  $(document).on('click', '.delete', deleteTask);
  $(document).on('click', '.complete', changeToComplete);
}

// get todo list
function getToDoList() {
  // ajax call to server to get list
  $.ajax({
    type: 'GET',
    url: '/toDo',
  }).then((res) => {
    console.log('got a response on getToDoList');
    postList(res);
  });
}

// function to post list to DOM
function postList(toDoList) {
  // empty the list
  $('#viewTasks').empty();
  let completeBtn = '';
  let completeStatus = '';
  // loop through list
  for (const toDo of toDoList) {
    if (toDo.complete == false) {
      completeBtn = `<button class="complete" data-id="${toDo.id}">Mark complete</button>`;
      completeStatus = 'incomplete';
    } else if (toDo.complete == true) {
      completeBtn = '';
      completeStatus = 'complete';
    }
    $('#viewTasks').append(`
      
        <li class="displayCompleteStatus" id=${completeStatus}>${toDo.task}
        <span>${completeBtn}</span>
        <span><button class="delete" data-id="${toDo.id}">Delete</button></span>
        </li>
      
    `);
  }
}

// add to do item
function addTask() {
  let newTask = {
    task: $('#task').val(),
    complete: $('#complete').val(),
  };
  $.ajax({
    type: 'POST',
    url: '/toDo',
    data: newTask,
  })
    .then((res) => {
      console.log(res);
      getToDoList();
      clearInputs();
    })
    .catch((error) => {
      console.log('error adding task', error);
      alert('Task not added');
    });
}

function deleteTask() {
  // put task id into a variable
  let taskId = $(this).data('id');

  // send delete request to server
  $.ajax({
    type: 'DELETE',
    url: `/toDo/remove/${taskId}`,
  })
    .then((response) => {
      getToDoList(); // render update list to DOM
    })
    .catch((error) => {
      console.log('failed to delete task', error);
      alert('Could not delete task, please try again');
    });
}

function changeToComplete() {
  let completeId = $(this).data('id');

  $.ajax({
    type: 'PUT',
    url: `/toDo/ready/${completeId}`,
  })
    .then((response) => {
      getToDoList();
    })
    .catch((error) => {
      console.log('error updated status', error);
      alert('task not marked as completed');
    });
}

function clearInputs() {
  $('#task').val('');
}

console.log('client js is running');

$(document).ready(onReady);

function onReady() {
  console.log('in onReady');
  getToDoList();

  $(document).on('click', '#addButton', addTask);
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

  // loop through list
  for (const toDo of toDoList) {
    $('#viewTasks').append(`
      <tr>
        <td id="newToDo">${toDo.task}</td>
        <td id="newComplete">${toDo.complete}</td>
      </tr>
    `);
  }
}

// add to do item
function addTask() {
  let newTask = {
    task: $('#task').val(),
  };
  $.ajax({
    type: 'POST',
    url: '/toDo',
    data: newTask,
  })
    .then((res) => {
      console.log(res);
      getToDoList();
    })
    .catch((error) => {
      console.log('error adding task', error);
      alert('Task not added');
    });
}

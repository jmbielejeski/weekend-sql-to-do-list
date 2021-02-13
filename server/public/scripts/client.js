console.log('client js is running');

$(document).ready(onReady);

function onReady() {
  console.log('in onReady');
  getToDoList();
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
        <td>${toDo.task}</td>
        <td?>${toDo.complete}</td?
      </tr>
    `);
  }
}

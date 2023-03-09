
// Setting up variables
let theInput = document.querySelector(".add-task input");
let theAddButton = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".tasks-content");
let tasksCount = document.querySelector(".tasks-count span");
let tasksCompleted = document.querySelector(".tasks-completed span");

// focus on input Feild
window.onload = function() {
  theInput.focus();
}

// Adding the Task
theAddButton.onclick = function() {
  if (theInput.value === "") {
    // swal("No Input!", "You must enter a task!", "error");
    let {value: name} = Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You must enter a task!',
    });
    console.log(name)

  } else {
    let noTasksMsg = document.querySelector(".no-tasks-message");

    if (document.body.contains(document.querySelector(".no-tasks-message"))) {
      noTasksMsg.remove();
    }
    
    let mainSpan = document.createElement("span");
    let text = document.createTextNode(theInput.value);
    mainSpan.className = "task-box";

    let icons = document.createElement('div');
    icons.className = 'task-icons';

    // creating Icons 
    let deleteElement = document.createElement("span");
    deleteElement.className = 'delete';
    deleteElement.title = 'Delete task';

    let notes = document.createElement("span");
    notes.className = 'notes';
    notes.title = 'Notes';

    let resources = document.createElement("span");
    resources.className = 'resources';
    resources.title = 'Resources';

    let details = document.createElement("span");
    details.className = 'details';
    details.title = 'Details';

    // Adding the icons to icon div and to the task box
    icons.appendChild(details);
    icons.appendChild(resources);
    icons.appendChild(notes);
    icons.appendChild(deleteElement);
    


    mainSpan.appendChild(text);
    mainSpan.appendChild(icons);

    tasksContainer.appendChild(mainSpan);

    theInput.value = "";
    theInput.focus();

    calculateTasks();
  };
};

document.addEventListener('click', function (e) {
  if (e.target.className == 'delete') {
    e.target.parentNode.parentNode.remove();

    if (tasksContainer.childElementCount == 0) {
      createNoTasks();
    }
  }

  if (e.target.classList.contains('task-box')) {
    e.target.classList.toggle('finished');
  };

  calculateTasks()
});


function createNoTasks() {
  let msgSpan = document.createElement("span");
  let msgText = document.createTextNode("No Tasks to Show");
  msgSpan.appendChild(msgText);
  msgSpan.className = "no-tasks-message";

  tasksContainer.appendChild(msgSpan)
}

function calculateTasks() {
  tasksCount.innerHTML = document.querySelectorAll('.tasks-content .task-box').length;

  tasksCompleted.innerHTML = document.querySelectorAll('.tasks-content .finished').length;
}


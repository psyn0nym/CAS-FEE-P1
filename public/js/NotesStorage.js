'use strict'


var todosData = []

function getTaskFromForm(){


    let taskName = document.querySelector('#task-name').value,
    taskDesc = document.querySelector('#task-description').value,
    taskPrioSelect = document.querySelector('#task-priority'),
    taskPrio = taskPrioSelect.value,
    taskDueDate = document.querySelector('#task-duedate').value,
    taskDueSort = taskDueDate.split(".").reverse().join(""),
    taskStatus = "open",
    taskCreateDate = new Date(),
    taskPublishDate = `${addZero(taskCreateDate.getDate())}.${addZero(taskCreateDate.getMonth() + 1)}.${taskCreateDate.getFullYear()}`,
    taskId = document.querySelector('#task-id').value;
        
    if (taskId == ''){
        taskId = taskCreateDate.getTime();
    };

  // create Task-Object
  const task = {
      id: taskId,
      name: taskName,
      desc: taskDesc,
      prio: taskPrio,
      status: taskStatus,
      date: taskPublishDate,
      due: taskDueDate,
      dueSort: taskDueSort
  }
  return task
}

// Set Tasks via Form
function setTasks(e) {
    e.preventDefault();

  var task = getTaskFromForm()

    console.log(task);

    axios.put("/api/todo", task).then(resp => {
        console.log("todo task saved", resp)
        document.querySelector('#tasks-input').reset();
        renderTodos();
    })
 
}

function renderTodos() {
    axios.get("/api/todo").then(response => {
        todosData = response.data
        todosData = todosData.sort((a, b) => (a.dueSort > b.dueSort) ? 1 : -1);
        var renderedContent = template(response.data);
        document.querySelector("#tasks-entries").innerHTML = renderedContent
        const editBtn = document.querySelectorAll('i.edit')
        editBtn.forEach(function (editElement) {
            editElement.addEventListener('click', editTask);
        });
        const statBtn = document.querySelectorAll('button.status')
        statBtn.forEach(function (statElement) {
            statElement.addEventListener('click', updateStatus);
        });
    })
}

// render Tasks Function
function renderTasks() {
    renderTodos();
}

// update Status function => Close/Reopen Tasks
function updateStatus(e) {
    const id = e.target.dataset.id;
    let update;

    for (let t in todosData) {
        if (todosData[t].id == id) {
            update = todosData[t];
            if (update.status == "open") {
                update.status = "closed";
            } else {
                update.status = "open";
            }
        }
    }

    axios.post("/api/todo/" + id, update).then(response => {
        renderTodos();
    });
}

// move data to form to edit
function editTask(e) {
    const id = e.target.dataset.id;
    document.querySelector('#add-task').setAttribute("data-id", id);

    //let taskData = JSON.parse(localStorage.getItem('taskData'));
    axios.get("/api/todo/" + id).then(response => {
        var task = response.data
        document.querySelector('#task-name').setAttribute("value", task.name);
        document.querySelector('#task-description').value = task.desc;
        document.querySelector('#task-duedate').setAttribute("value", task.due);
        document.querySelector(`#task-priority option[value="${task.prio}"]`).setAttribute("selected", "selected");
        document.querySelector('#task-id').value = task.id;

        // change submit event
        swapEventListener("toEdit");
    })
}

// save updated task
function updateTask(e) {
    e.preventDefault();

    
  const task = getTaskFromForm();
    var url = "/api/todo/"+e.target.dataset.id;
    axios.post(url, task).then(resp => {
        document.querySelector('#tasks-input').reset();
        renderTodos();
        clearFormData();
    });
}

// swap button events
function swapEventListener(swapCase) {
    if (swapCase == "toEdit") {
        document.querySelector('#add-task').removeEventListener('click', setTasks);
        document.querySelector('#add-task').addEventListener('click', updateTask);
    } else if (swapCase == "toSubmit") {
        document.querySelector('#add-task').removeEventListener('click', updateTask);
        document.querySelector('#add-task').addEventListener('click', setTasks);
    }
}

// clear form in edit mode
function clearFormData() {
    document.querySelector('#tasks-input').reset();
    document.querySelector('#task-name').setAttribute("value", "");
    document.querySelector('#task-description').value = "";
    document.querySelector('#task-duedate').setAttribute("value", "");
    document.querySelector('#add-task').removeAttribute('data-id');
    document.querySelector('#task-id').value = "";

    $('#task-priority option:selected').removeAttr('selected');
    $("#task-priority").val($("#task-priority option:first").val());

    swapEventListener("toSubmit");
}

// sort Priority
function sortTasks(e) {
    const sortProperty = e.target.dataset.sort,
        sortOrder = e.target.dataset.order;

    let ordered;
    const unordered = todosData

    if (sortProperty == "prio") {
        if (sortOrder == "asc") {
            ordered = unordered.sort((a, b) => (a.prio > b.prio) ? 1 : -1);
            document.querySelector('#sort-prio').dataset.order = "desc";
        } else if (sortOrder == "desc") {
            ordered = unordered.sort((a, b) => (a.prio < b.prio) ? 1 : -1);
            document.querySelector('#sort-prio').dataset.order = "asc";
        }
    } else if (sortProperty == "date") {
        if (sortOrder == "asc") {
            ordered = unordered.sort((a, b) => (a.id > b.id) ? 1 : -1);
            document.querySelector('#sort-date').dataset.order = "desc";
        } else if (sortOrder == "desc") {
            ordered = unordered.sort((a, b) => (a.id < b.id) ? 1 : -1);
            document.querySelector('#sort-date').dataset.order = "asc";
        }
    } else if (sortProperty == "due") {
        if (sortOrder == "asc") {
            ordered = unordered.sort((a, b) => (a.dueSort > b.dueSort) ? 1 : -1);
            document.querySelector('#sort-due').dataset.order = "desc";
        } else if (sortOrder == "desc") {
            ordered = unordered.sort((a, b) => (a.dueSort < b.dueSort) ? 1 : -1);
            document.querySelector('#sort-due').dataset.order = "asc";
        }
    }

    // render new order   
    document.querySelector("#tasks-entries").innerHTML = template(ordered);
}



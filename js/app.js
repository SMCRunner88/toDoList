//Problem: User interaction does not provide desired result
//Solution: add interactivity so the user can manage daily tasks
var taskInput = document.getElementById('new-task'); //new-task
var addButton = document.getElementsByTagName('button')[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks


//New Task List Item
var createNewTaskElement = function(taskString) {
  //Create list Item
  var listItem = document.createElement("li");
  
    //Input (checkbox)
  var checkBox = document.createElement("input");
  //label
  var label = document.createElement("label");
  //input (text)
  var editInput = document.createElement("input");
  //button.edit
  var editButton = document.createElement("button");
    //button.delete
  var deleteButton = document.createElement("button");
  
  //Each element needs modifying
  checkBox.type = "checkbox";
  editInput.type = "text";
  
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  
  label.innerText = taskString;
  
    //Each element will need to be modifying and appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

//Add Tasks
var addTask = function() {
  console.log("Add task...")
  //When button is pressed
  //Create a new list item with the text from new-task
  var listItem = createNewTaskElement(taskInput.value);
  
  //Append listItem to IncompleteTaskHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
}



//Edit existing task
var editTask = function() {
  console.log("Edit task...")  
  
  var listItem = this.parentNode;
  
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var containsClass = listItem.classList.contains("editMode")
  if (containsClass) {
      //Switch from editMode
      //label text become the input's value
    label.innerText = editInput.value;
  } else {
      //Switch to editMode
      //Input value becomes the label's text
    editInput.value = label.innerText;
  }
  
    //Toggle .editMode on the parent
  listItem.classList.toggle("editMode");
}


var deleteTask = function() {
  console.log("Delete task...")
  
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  
  //Remove parent li item from the ul 
  ul.removeChild(listItem);


}

var taskCompleted = function () {
//Complete Tasks
  console.log("Task complete...")
//Mark a task as complete 
    //Append the task list item to the completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function() {
  console.log("Task incomplete...")
//Mark a task as incomplete
  //When the checkbox is unchecked 
    //Append the task list item to the completed-tasks
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("Bind task events");
    //select lis items children
  var checkBox = taskListItem.querySelector("input[type=checkbox]") ;
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
    //bind editTast to edit button
  editButton.onclick = editTask;
    //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
    //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler; 
  
}

var ajaxRequest = function() {
  console.log("AJAX request");
}

//Set the click handler to the add task function
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

//Cycle over the incomplete task holder ul list items
for( var i = 0; i < incompleteTasksHolder.children.length; i++) {
  //for each list item 
    //bind events to list items children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i],taskCompleted);
}

//Cycle over the complete task holder ul list items
for( var i = 0; i < completedTasksHolder.children.length; i++) {
    //bind events to list items children    
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete)
}




//retreve todo from local storage or initialize aan empty array
//{} is an object 
//[] is an Array both can store info
//let todo = 1; //let defines variable which is mutable
//const test=2;// constant is immutable
//function(){}; to initialize func

let todo= JSON.parse(localStorage.getItem("todo")) || [];//retreves the items in storage named todo or if not there then it makes empty array

const todoInput = document.getElementById("todoInput");//refrences id=todoInput from html......console.log(todoInput); go to inspect->console to check if refrencing is working or not
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

//initialize project
document.addEventListener("DOMContentLoaded" , function(){
                    addButton.addEventListener("click" , addTask);
                    todoInput.addEventListener("keydown" , function(event){
                            if (event.key=="enter"){
                                event.preventDefault();//prevents webpage to go anywhere else
                                addTask();
                            }
                                                                        });
                    deleteButton.addEventListener("click" , deleteALLTasks);
                    displayTasks();
                                    }
                        );

//first listner listens to whole webpage every second and calls a function that listens to addButton whenever it is clicked then calls function addTask
//when we click enter in "Add a new todo" function(event) is called which also calls addTask
//when we click deleteButton in deleteTask function is called

function addTask(){
    const newTask = todoInput.value.trim();
    if(newTask !== ""){
        todo.push({
            text:newTask,
            disbled:false,
        });
        saveToLocalStorage();
        todoInput.value="";
        displayTasks();
    }
}


//=> gives function which here means nested function for each todo and its index no.
// with `` we can write html code in js 
//${} can use js in html code
function displayTasks() {
  todoList.innerHTML = "";
  todo.forEach((item, index) => {
    const p = document.createElement("p");
    p.innerHTML = `
      <div class="todo-container">
        <input type="checkbox" class="todo-checkbox" id="input-${index}" ${
      item.disabled ? "checked" : ""
    }>
        <p id="todo-${index}" class="${
      item.disabled ? "disabled" : ""
    }" onclick="editTask(${index})">${item.text}</p>
      </div>
    `;
    p.querySelector(".todo-checkbox").addEventListener("change", () =>
      toggleTask(index)
    );
    todoList.appendChild(p);
  });
  todoCount.textContent = todo.length;
}


function editTask(index) {
  const todoItem = document.getElementById(`todo-${index}`);
  const existingText = todo[index].text;
  const inputElement = document.createElement("input");

  inputElement.value = existingText;
  todoItem.replaceWith(inputElement);
  inputElement.focus();

  inputElement.addEventListener("blur", function () {
    const updatedText = inputElement.value.trim();
    if (updatedText) {
      todo[index].text = updatedText;
      saveToLocalStorage();
    }
    displayTasks();
  });
}

function toggleTask(index) {
  todo[index].disabled = !todo[index].disabled;
  saveToLocalStorage();
  displayTasks();
}

function deleteALLTasks() {
  todo = [];
  saveToLocalStorage();  
  displayTasks();
}

function saveToLocalStorage(){
    localStorage.setItem("todo",JSON.stringify(todo));
}

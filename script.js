let todoDataListSection = document.getElementById('todo-data-list');
let saveButton = document.getElementById("save-todo");
let todoInputBar = document.getElementById("todo-input-bar");
let todoData = [];

todoInputBar.addEventListener("keyup",()=>{
    let todoText = todoInputBar.value;
    if(todoText.length==0){
        if(saveButton.classList.contains("disabled")){
            return;
        }
        saveButton.classList.add("disabled");
    }else{
        if(saveButton.classList.contains("disabled")){
        saveButton.classList.remove("disabled");
        }
    }

})

saveButton.addEventListener("click",function getTextAndAddTodo(){
    let todoText = todoInputBar.value;
    if(todoText.length == 0)return;
    let todoObj = {text:todoText,status:"In Progress..",finishedButtonText: "Finished"};
    todoData.push(todoObj);
    addTodo( todoObj,todoData.length);
    todoInputBar.value="";
})
function addTodo(todoObj, todoCount) {
    console.log("called add todo")
    let rowDiv = document.createElement("div");
    let todoItem = document.createElement("div");
    let todoNumber = document.createElement("div");
    let todoDetail = document.createElement("div");
    let todoStatus = document.createElement("div");
    let todoActions = document.createElement("div");
    let deleteButton = document.createElement("button");
    let finishedButton = document.createElement("button");
    let hr = document.createElement("hr");

    // adding classes
    rowDiv.classList.add("row");
    todoItem.classList.add("todo-item", "d-flex", "flex-row", "justify-content-between", "align-items-center");
    todoNumber.classList.add("todo-no");
    todoDetail.classList.add("todo-detail", "text-muted");
    todoStatus.classList.add("todo-status", "text-muted");
    todoActions.classList.add("todo-actions", "d-flex", "justify-content-start", "gap-2");
    deleteButton.classList.add("btn", "btn-danger", "delete-todo");
    finishedButton.classList.add("btn", "btn-success", "finish-todo");

    deleteButton.onclick = deleteTodo;
    finishedButton.onclick = finishedTodo;

    todoNumber.textContent = `${todoCount}.`;
    todoDetail.textContent = todoObj.text; // sets the todo text sent from the input element
    todoStatus.textContent = `${todoObj.status}`;
    deleteButton.textContent = "Delete";
    finishedButton.textContent = todoObj.finishedButtonText;

    deleteButton.setAttribute("todo-idx",todoCount-1);
    finishedButton.setAttribute("todo-idx",todoCount-1);
    todoActions.appendChild(deleteButton);
    todoActions.appendChild(finishedButton);

    todoItem.appendChild(todoNumber);
    todoItem.appendChild(todoDetail);
    todoItem.appendChild(todoStatus);
    todoItem.appendChild(todoActions);

    rowDiv.appendChild(todoItem);
    rowDiv.appendChild(hr);

    todoDataListSection.appendChild(rowDiv);
}

function finishedTodo(event){

      let indexToBeFinished =Number(event.target.getAttribute("todo-idx"));
      let status = todoData[indexToBeFinished].status;
      if(status=="In Progress.."){
        todoData[indexToBeFinished].status="Finished..";
        todoData[indexToBeFinished].finishedButtonText="Undo..";
        event.target.textContent = "Undo..";
      }else{
        todoData[indexToBeFinished].status="In Progress..";
        todoData[indexToBeFinished].finishedButtonText="Finished..";
        event.target.textContent = "Finished..";
      }
      todoData.sort((a,b)=>{

        if(a.status=="Finished.."){
            return 1;
        }
        return -1;
      })
      todoDataListSection.innerHTML="";
      todoData.forEach((element,idx)=>{
        addTodo(element , idx+1);
      })
}
function deleteTodo(event){
    console.log(event.target);
    let indexToBeRemoved = Number(event.target.getAttribute('todo-idx'));
    todoDataListSection.innerHTML="";
    todoData.splice(indexToBeRemoved,1);
    todoData.forEach((element , idx)=>{
        addTodo(element,idx+1);
    })
    
}





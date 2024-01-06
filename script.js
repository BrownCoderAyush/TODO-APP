let todoDataListSection = document.getElementById('todo-data-list');
let saveButton = document.getElementById("save-todo");
let todoInputBar = document.getElementById("todo-input-bar");
let getPendingTodosButton = document.getElementById("get-todos");
let todoData = [];

getPendingTodosButton.addEventListener("click",()=>{
    let newTodos = todoData.filter((todo,index)=>{
        if(todo.status == "Finished.."){
            return false;
        }
        return true;
    })
    todoData = newTodos;
    console.log(todoData);
    todoDataListSection.innerHTML="";
    todoData.forEach((element,idx)=>{
        addTodo(element , idx+1);
      })
})
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
    let editButton = document.createElement("button");
    let hiddenInput = document.createElement("input");
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
    editButton.classList.add("btn","btn-warning","edit-todo");
    hiddenInput.classList.add("form-control","todo-detail");
    deleteButton.onclick = deleteTodo;
    finishedButton.onclick = finishedTodo;
    editButton.onclick = editTodo;
    hiddenInput.type = "hidden";


    todoNumber.textContent = `${todoCount}.`;
    todoDetail.textContent = todoObj.text; // sets the todo text sent from the input element
    todoStatus.textContent = `${todoObj.status}`;
    deleteButton.textContent = "Delete";
    editButton.textContent = "Edit";
    finishedButton.textContent = todoObj.finishedButtonText;
    hiddenInput.addEventListener("keypress",saveEdittedTodo);

    deleteButton.setAttribute("todo-idx",todoCount-1);
    finishedButton.setAttribute("todo-idx",todoCount-1);
    editButton.setAttribute("todo-idx",todoCount-1);
    todoDetail.setAttribute("todo-idx",todoCount-1);
    hiddenInput.setAttribute("todo-idx",todoCount-1);
    todoActions.appendChild(deleteButton);
    todoActions.appendChild(finishedButton);
    todoActions.appendChild(editButton);
    todoItem.appendChild(todoNumber);
    todoItem.appendChild(todoDetail);
    todoItem.appendChild(hiddenInput);
    todoItem.appendChild(todoStatus);
    todoItem.appendChild(todoActions);

    rowDiv.appendChild(todoItem);
    rowDiv.appendChild(hr);

    todoDataListSection.appendChild(rowDiv);
}
function editTodo(event){
    let editBtn = event.target;
    let indexToBeEdited = Number(editBtn.getAttribute("todo-idx"));
    let detailDiv = document.querySelector(`div[todo-idx="${indexToBeEdited}"]`);
    let input = document.querySelector(`input[todo-idx="${indexToBeEdited}"]`);
    detailDiv.style.display = "none";
    input.type = "text";
}
function saveEdittedTodo(event){
    let inputToBeSaved = event.target;
    let indexInputToBeSaved = Number(inputToBeSaved.getAttribute("todo-idx"));
    let detailDiv = document.querySelector(`div[todo-idx="${indexInputToBeSaved}"]`);
    let input = document.querySelector(`input[todo-idx="${indexInputToBeSaved}"]`);
    if(event.key=="Enter"){
        let editedText = inputToBeSaved.value;
        todoData[indexInputToBeSaved].text = editedText;
        console.log(todoData[indexInputToBeSaved].text);
        detailDiv.style.display = "block";
        input.type = "hidden";
        todoDataListSection.innerHTML="";
        todoData.forEach((element , idx)=>{
        addTodo(element,idx+1);
    })

    }
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





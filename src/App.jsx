import { useState } from 'react'


//Backlog component
function Backlog({ setTodolist, todolist, setProgressList, progressList }) {

  const [addTask, setAddTask] = useState({});
  const [editTask, setEditTask] = useState(false);
  const [currIndex, setCurrIndex] = useState();
  const [updatedTask, setUpdatedTask] = useState();

  //Add a new task in the text field
  function handleChange(e) {
    const newTodo = {
      id: Date.now(),
      todos: e.target.value
    }
    setAddTask(newTodo);
  }

  // On click, update the todo list with newly added items
  function handleAdd() {
    console.log("newly added", addTask)
    setTodolist([...todolist, addTask]);
    console.log("todolist", todolist);
    const emptyTodo = {
      id: " ",
      todos: " "
    }
    setAddTask(emptyTodo);
  }

  //  On click, delete the selected item from the todo list
  function handleDelete(deleteTodo) {
    console.log(deleteTodo);
    const filteredTodo = todolist.filter((todo) => todo.id !== deleteTodo);
    setTodolist(filteredTodo);
    console.log("delete", filteredTodo);
    console.log("todolist", todolist);
  }

  // When checked, send items to progress list
  function handleCheckBacklog(event, checkedBacklog) {
    console.log('event -> ',event.target.checked);
    console.log('checkedbacklog::',checkedBacklog)
    if (event.target.checked) {
      const updateProgressList = todolist.filter((todo) => todo.id === checkedBacklog);
      console.log("new progress item=========>", updateProgressList);
      setProgressList(progressList.concat(updateProgressList));
      console.log("progress list=========>", progressList);
    }
  }

  //On click, edit the backlog task
  function handleEdit(index) {
    setEditTask(prev => !prev);
    setCurrIndex(index);
  }

  //On click, update the backlog task
  function updateTask(existingTodo) {
    const editedTodo = todolist.map((todo) => {todo.id === existingTodo? todo.todos = updatedTask : " "});
    setTodolist([...todolist]);
    console.log("existing and updated todo list=====>", todolist);
    setEditTask(prev => !prev);
  }



  return (
    <div>
      <input value={addTask.todos} type="text" name="backlog" placeholder='Add your task' onChange={(e) => handleChange(e)} />
      <button onClick={() => handleAdd()}>Add</button>
      {todolist.map((todo, index) => {
        return (
          <div key={index}>
            <input type="checkbox" onClick={(event) => handleCheckBacklog(event, todo.id)} />
            {todo.todos}
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
            <button onClick={() => handleEdit(index)}>Edit</button><br />
            {editTask && currIndex === index ? <input type="text" defaultValue = {todo.todos} onChange={(e) => setUpdatedTask(e.target.value)} /> : " "}
            {editTask && currIndex === index ? <button onClick={() => updateTask(todo.id)}>Update</button> : " "}
          </div>
        )
      }
      )
      }
    </div>
  )
}

//In progress component
function InProgress({ progressList, doneList, setDoneList, setProgressList}) {

console.log("progress list=======>", progressList);

function handleCheckProgress(event, itemId) {
  if(event.target.checked) {
  const checkedItem = progressList.filter((item) => item.id === itemId);
  console.log("checked item=======>", checkedItem);
  setDoneList(doneList.concat(checkedItem));
}
}

function handleDeleteProgress(itemId) {
  console.log(itemId);
    const deletedProgress = progressList.filter((todo) => todo.id !== itemId);
    setProgressList(deletedProgress);
    console.log("delete", deletedProgress);
    console.log("todolist", progressList);
}

  return (
    <>
      {progressList.map((item, index) => {
        return (
          <div key={item.id}>
            <input type="checkbox" onClick={(event) => handleCheckProgress(event, item.id)} />
            {item.todos}
            <button onClick={() => handleDeleteProgress(item.id)}>Delete</button>
          </div>
        )
      })}

    </>
  )
}


//Done component

function Done({ doneList , setDoneList}) {
  console.log("done list=======>", doneList);

function handleDeleteDone(itemId) {
  console.log(itemId);
  const deletedDone = doneList.filter((todo) => todo.id !== itemId);
  setDoneList(deletedDone);
  console.log("delete", deletedDone);
  console.log("todolist", doneList);
}


  return (
    <>
    {doneList.map((item) => {
      return (
        <div>
        {item.todos}
        <button onClick={() => handleDeleteDone(item.id)}>Delete</button>
        </div>
      )})}
    </>
  )
}


//The main App component
function App() {
  const [todolist, setTodolist] = useState([]);
  const [progressList, setProgressList] = useState([]);
  const [doneList, setDoneList] = useState([]);


  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: 500 }}>
          <h2>Backlog</h2>
          <Backlog setTodolist={setTodolist} todolist={todolist} setProgressList={setProgressList} progressList={progressList} />
        </div>

        <div style={{ marginRight: 500 }}>
          <h2>In Progress</h2>
          <InProgress progressList={progressList} setProgressList = {setProgressList} setDoneList= {setDoneList} doneList = {doneList}/>
        </div>

        <div>
          <h2>Done</h2>
          <Done doneList={doneList} setDoneList= {setDoneList}/>
        </div>
      </div>
    </>
  )
}



export default App


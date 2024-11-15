import { useState } from 'react';
import moment from 'moment';


function Backlog({ setTodolist, todolist, setProgressList, progressList, setCountOpen, countOpen }) {

    const [addTask, setAddTask] = useState({});
    const [editTask, setEditTask] = useState(false);
    const [currIndex, setCurrIndex] = useState();
    const [updatedTask, setUpdatedTask] = useState();
   /*  const [isChecked, setIsChecked] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false); */
    const [showForm, setShowForm] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');


    //Open form when clicked on add new task
    function handleOpenForm() {
        setShowForm(true);
    }

    // Select priorities of tasks
    function handleSelectedValue(e) {
        setSelectedValue(e.target.value);
    }
  
  
    //Add a new task in the text field
    function handleChange(e) {
      const newTodo = {
        id: Date.now(),
        todos: e.target.value,
        priority: {selectedValue}
      }
      setAddTask(newTodo);
    }
  
    // On click, add the todo list with newly added items
    function handleAdd() {
      console.log("newly added", addTask)
      setTodolist([...todolist, addTask]);
      console.log("todolist", todolist);
      const emptyTodo = {
        id: " ",
        todos: " "
      }
      setAddTask(emptyTodo);
      setShowForm(false);
      setCountOpen(prevCount => prevCount + 1 );
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
      console.log('event -> ', event.target.checked);
      console.log('checkedbacklog::', checkedBacklog)
      if (event.target.checked) {
        const updateProgressList = todolist.filter((todo) => todo.id === checkedBacklog);
        console.log("new progress item=========>", updateProgressList);
        setProgressList(progressList.concat(updateProgressList));
        setCountOpen(prevCount => prevCount - 1 );
      }
    }
  
    //On click, edit the backlog task
    function handleEdit(index) {
      setEditTask(prev => !prev);
      setCurrIndex(index);
    }
  
    //On click, update the backlog task
    function updateTask(existingTodo) {
        todolist.map((todo) => { todo.id === existingTodo ? todo.todos = updatedTask : " " });
        console.log("existing and updated todo list=====>", todolist);
        setEditTask(prev => !prev);
    }
  
  
  
    return (
      <div>
        <button onClick={handleOpenForm}>Add new task</button>
        {showForm && (  
            <div className='form-data'>
                <form>
            <label for="Add your task">Add your task</label>
            <input type= 'text' id='Add your task' value={addTask.todos} name="backlog" onChange={(e) => handleChange(e)} style={{ height: "3vh" }} />
            <label for="priority-select">Choose priority: </label>
            <select id="priority-select" onChange = {(e) => handleSelectedValue(e)} value={selectedValue}>
                <option value="">Please choose an option</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
        <button onClick={() => handleAdd()} style={{ backgroundColor: "lightgreen", fontWeight: "bold", borderColor: "green" }}>Add</button>
        </form>
        </div>
    )}
     
  
        {todolist.map((todo, index) => {
          return (
            <div className='backlog-and-dialog-box-container'>
              <div key={todo.id} className='backlog-list'>
                <div className='checkbox-with-todo-list'>
                  <input type="checkbox" onClick={(event) => handleCheckBacklog(event, todo.id)} />
                  <div className='todo-task' title={todo.todos.length > 50 ? todo.todos : ""}>
                    {todo.todos.length > 50 ? todo.todos.slice(0, 51) + "..." : todo.todos}
                  </div>
                </div>
                {addTask.priority}
                <div className='date-edit-delete-container'>
                  {moment().format('MM/DD/YYYY')}
                  <div className='delete-edit-button'>
                    <button onClick={() => handleDelete(todo.id)} style={{ backgroundColor: "orangered", fontWeight: "bold", borderColor: "red" }}>Delete</button>
                    <button onClick={() => handleEdit(index)} style={{ backgroundColor: "lightblue", fontWeight: "bold", borderColor: "blue" }}>Edit</button><br />
                  </div>
                </div>
              </div>
              {editTask && currIndex === index ?
                <div className='dialog-box'>
                  {editTask && currIndex === index ? <input type="text" defaultValue={todo.todos} onChange={(e) => setUpdatedTask(e.target.value)} style={{ height: "3vh" }} /> : " "}
                  {editTask && currIndex === index ?
                    <button onClick={() => updateTask(todo.id)} style={{ marginTop: "5px", backgroundColor: "lightgreen", fontWeight: "bold", borderColor: "green" }}>Update</button> : " "}
                </div> : " "}
            </div>
          )
        }
        )
        }
  
      </div>
    )
  }
 export default Backlog  
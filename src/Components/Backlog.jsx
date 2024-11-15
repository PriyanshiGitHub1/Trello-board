import { useState } from 'react';
import moment from 'moment';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function Backlog({ setTodolist, todolist, setProgressList, progressList, doneList, setDoneList, checkedTodo, setCheckedTodo, checkedProgress, setCheckedProgress, value}) {

    const [addTask, setAddTask] = useState({id: '', todos: ''});
    const [editTask, setEditTask] = useState(false);
    const [currIndex, setCurrIndex] = useState();
    const [updatedTask, setUpdatedTask] = useState();
    const [showForm, setShowForm] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    


     //Open form when clicked on add new task
     function handleOpenForm() {
        setShowForm(!showForm);
    }

    //Add a new task in the text field
    function handleChange(e) {
        const newTodo = {
            id: Date.now(),
            todos: e.target.value,
        }
        console.log("priority======>", newTodo.priority);
        setAddTask(newTodo);
    }

    // On click, add the todo list with newly added items
    function handleAdd(e) {
        console.log("selectedValue======>", selectedValue);
        console.log("newly added", addTask);
        addTask.priority = selectedValue;
        setTodolist([...todolist, addTask]);
        console.log("todolist", todolist);
        /* const emptyTodo = {
            id: " ",
            todos: " ",
        }
        setAddTask(emptyTodo); */
        setShowForm(!showForm);
    }

    //  On click, delete the selected item from the todo list
    function handleDelete(deleteTodo) {

        console.log(deleteTodo);

        if (checkedTodo.some(element => element.id === deleteTodo)) {
            const filteredTodo = todolist.filter((todo) => todo.id !== deleteTodo);
            setTodolist(filteredTodo);
            setCheckedTodo(checkedTodo.filter((todo) => todo.id!== deleteTodo));
        } else {
            const filteredTodo = todolist.filter((todo) => todo.id !== deleteTodo);
            setTodolist(filteredTodo);
        }

        if (progressList.some(element => element.id === deleteTodo)) {
            if(checkedProgress.some(element => element.id === deleteTodo)) {
                const plAfterDeleteingTl = progressList.filter((todo) => todo.id !== deleteTodo);
                setProgressList(plAfterDeleteingTl);
                setCheckedProgress(checkedProgress.filter((todo) => todo.id !== deleteTodo));
            } else {
                const plAfterDeleteingTl = progressList.filter((todo) => todo.id !== deleteTodo);
                setProgressList(plAfterDeleteingTl);
            }      
        }
        
        if (doneList.some(element => element.id === deleteTodo)) {
            const dlAfterDeleteingTl = doneList.filter((todo) => todo.id !== deleteTodo);
            setDoneList(dlAfterDeleteingTl);
        }

    }

    // When checked, send items to progress list
    function handleCheckBacklog(event, checkedBacklog) {
        console.log('event -> ', event.target.checked);
        console.log('checkedbacklog::', checkedBacklog)
        if (event.target.checked) {
            const updateProgressList = todolist.filter((todo) => todo.id === checkedBacklog);
            setCheckedTodo(checkedTodo.concat(updateProgressList));
            setProgressList(progressList.concat(updateProgressList));
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
            <button onClick={handleOpenForm} style={{height: "3vh", backgroundColor: "teal", borderRadius: '20px', color: 'white', border: 'none', padding: '0 10px 0 10px'}}> Add New Task</button>
            {showForm &&
           
            <div>
                 <form className='form-data' onSubmit={(e) => handleAdd(e)}>
                 <label htmlFor="Add your task">Add your task: </label>
                    <input value={addTask.todos}
                    type="text"
                    id='Add your task'
                    name="backlog" 
                    required
                    placeholder='Add your task'
                    onChange={(e) => handleChange(e)}
                    style={{ height: "3vh",borderRadius: '7px', paddingLeft: '10px', marginBottom: '10px' }} />
                    <br />
                    <label htmlFor="priority-select">Choose priority: </label>
                    <select id="priority-select"
                        name = "priority-select"
                        required
                        onChange={(e) =>  setSelectedValue(e.target.value)}
                        value={addTask.priority}
                        style={{ height: "3vh", borderRadius: '7px', paddingLeft: '10px', marginBottom: '10px' }}>
                       
                        <option value="">Please choose an option</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    <br />
                <input type = "submit" value = "Add" style={{ marginLeft: "5px", height: "3vh", backgroundColor: "teal", borderRadius: '7px', color: 'white', border: 'none'}} />
                </form>
            </div>}
            
            

            {value === 0 && todolist.map((todo, index) => {
                return (
                    <div className='backlog-and-dialog-box-container' key={todo.id} >
                        <div className='backlog-list'>
                            <div className='checkbox-with-todo-list'>
                                <input type="checkbox" disabled = {checkedTodo.includes(todo)} onChange={(event) => handleCheckBacklog(event, todo.id)} />
                                <div className='todo-task' title={todo.todos.length > 50 ? todo.todos : ""}>
                                    {todo.todos.length > 50 ? todo.todos.slice(0, 51) + "..." : todo.todos}
                                </div>
                            </div>
                            <div className='date-edit-delete-container'>
                            {moment().format('MM/DD/YYYY')}
                           <span>{todo.priority}</span>
                                <div className='delete-edit-button'>
                                    <span onClick={() => handleDelete(todo.id)} > <MdDelete style={{color: 'red', fontSize: "1.5em"}}/> </span>
                                   {!checkedTodo.includes(todo) && <><span onClick={() => handleEdit(index)}> <FaRegEdit style={{color: 'blue', fontSize: "1.5em"}}/> </span><br /></>}
                                </div>
                            </div>
                        </div>
                        {editTask && currIndex === index ?
                            <div className='dialog-box'>
                                {editTask && currIndex === index ? <input type="text" defaultValue={todo.todos} onChange={(e) => setUpdatedTask(e.target.value)} style={{ height: "2.5vh" }} /> : " "}
                                {editTask && currIndex === index ?
                                    <button onClick={() => updateTask(todo.id)} 
                                    style={{ marginTop: "5px",
                                            backgroundColor: "green",
                                            borderRadius: '10px',
                                            border: 'none',
                                            height: "2.5vh",
                                            color: "white"
                                    }}> Update </button> : " "}
                            </div> : " "}
                    </div>
                )
            }
            )
            }

            {value === 1 && todolist.filter((element => element.priority === 'Low')).map((todo, index) => {
                return (
                    <div className='backlog-and-dialog-box-container' key={todo.id} >
                        <div className='backlog-list'>
                            <div className='checkbox-with-todo-list'>
                                <input type="checkbox" disabled = {checkedTodo.includes(todo)} onChange={(event) => handleCheckBacklog(event, todo.id)} />
                                <div className='todo-task' title={todo.todos.length > 50 ? todo.todos : ""}>
                                    {todo.todos.length > 50 ? todo.todos.slice(0, 51) + "..." : todo.todos}
                                </div>
                            </div>
                            <div className='date-edit-delete-container'>
                            {moment().format('MM/DD/YYYY')}
                           <span>{todo.priority}</span>
                                <div className='delete-edit-button'>
                                    <span onClick={() => handleDelete(todo.id)} > <MdDelete style={{color: 'red', fontSize: "1.5em"}}/> </span>
                                   {!checkedTodo.includes(todo) && <><span onClick={() => handleEdit(index)}> <FaRegEdit style={{color: 'blue', fontSize: "1.5em"}}/> </span><br /></>}
                                </div>
                            </div>
                        </div>
                        {editTask && currIndex === index ?
                            <div className='dialog-box'>
                                {editTask && currIndex === index ? <input type="text" defaultValue={todo.todos} onChange={(e) => setUpdatedTask(e.target.value)} style={{ height: "2.5vh" }} /> : " "}
                                {editTask && currIndex === index ?
                                    <button onClick={() => updateTask(todo.id)} 
                                    style={{ marginTop: "5px",
                                            backgroundColor: "green",
                                            borderRadius: '10px',
                                            border: 'none',
                                            height: "2.5vh",
                                            color: "white"
                                    }}> Update </button> : " "}
                            </div> : " "}
                    </div>
                )
            }
            )
            }


            {value === 2 && todolist.filter((element => element.priority === 'Medium')).map((todo, index) => {
                return (
                    <div className='backlog-and-dialog-box-container' key={todo.id} >
                        <div className='backlog-list'>
                            <div className='checkbox-with-todo-list'>
                                <input type="checkbox" disabled = {checkedTodo.includes(todo)} onChange={(event) => handleCheckBacklog(event, todo.id)} />
                                <div className='todo-task' title={todo.todos.length > 50 ? todo.todos : ""}>
                                    {todo.todos.length > 50 ? todo.todos.slice(0, 51) + "..." : todo.todos}
                                </div>
                            </div>
                            <div className='date-edit-delete-container'>
                            {moment().format('MM/DD/YYYY')}
                           <span>{todo.priority}</span>
                                <div className='delete-edit-button'>
                                    <span onClick={() => handleDelete(todo.id)} > <MdDelete style={{color: 'red', fontSize: "1.5em"}}/> </span>
                                   {!checkedTodo.includes(todo) && <><span onClick={() => handleEdit(index)}> <FaRegEdit style={{color: 'blue', fontSize: "1.5em"}}/> </span><br /></>}
                                </div>
                            </div>
                        </div>
                        {editTask && currIndex === index ?
                            <div className='dialog-box'>
                                {editTask && currIndex === index ? <input type="text" defaultValue={todo.todos} onChange={(e) => setUpdatedTask(e.target.value)} style={{ height: "2.5vh" }} /> : " "}
                                {editTask && currIndex === index ?
                                    <button onClick={() => updateTask(todo.id)} 
                                    style={{ marginTop: "5px",
                                            backgroundColor: "green",
                                            borderRadius: '10px',
                                            border: 'none',
                                            height: "2.5vh",
                                            color: "white"
                                    }}> Update </button> : " "}
                            </div> : " "}
                    </div>
                )
            }
            )
            }

            {value === 3 && todolist.filter((element => element.priority === 'High')).map((todo, index) => {
                return (
                    <div className='backlog-and-dialog-box-container' key={todo.id} >
                        <div className='backlog-list'>
                            <div className='checkbox-with-todo-list'>
                                <input type="checkbox" disabled = {checkedTodo.includes(todo)} onChange={(event) => handleCheckBacklog(event, todo.id)} />
                                <div className='todo-task' title={todo.todos.length > 50 ? todo.todos : ""}>
                                    {todo.todos.length > 50 ? todo.todos.slice(0, 51) + "..." : todo.todos}
                                </div>
                            </div>
                            <div className='date-edit-delete-container'>
                            {moment().format('MM/DD/YYYY')}
                           <span>{todo.priority}</span>
                                <div className='delete-edit-button'>
                                    <span onClick={() => handleDelete(todo.id)} > <MdDelete style={{color: 'red', fontSize: "1.5em"}}/> </span>
                                   {!checkedTodo.includes(todo) && <><span onClick={() => handleEdit(index)}> <FaRegEdit style={{color: 'blue', fontSize: "1.5em"}}/> </span><br /></>}
                                </div>
                            </div>
                        </div>
                        {editTask && currIndex === index ?
                            <div className='dialog-box'>
                                {editTask && currIndex === index ? <input type="text" defaultValue={todo.todos} onChange={(e) => setUpdatedTask(e.target.value)} style={{ height: "2.5vh" }} /> : " "}
                                {editTask && currIndex === index ?
                                    <button onClick={() => updateTask(todo.id)} 
                                    style={{ marginTop: "5px",
                                            backgroundColor: "green",
                                            borderRadius: '10px',
                                            border: 'none',
                                            height: "2.5vh",
                                            color: "white"
                                    }}> Update </button> : " "}
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
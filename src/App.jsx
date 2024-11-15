import React, { useState } from 'react';
import './App.css';
import Backlog from './Components/Backlog';
import InProgress from './Components/InProgress';
import Done from './Components/Done';
import Graph from './Components/Graph';
import img1 from './images/me.jpeg';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';



function App() {

 

  const [todolist, setTodolist] = useState([{
    id: 1,
    todos: "Play outdoor games with friends and classmates to strengthen muscles and immune system",
    priority: 'Medium',
  }]);

  const [progressList, setProgressList] = useState([]);
  const [doneList, setDoneList] = useState([]);
  const [checkedTodo, setCheckedTodo] = useState([]);
  const [checkedProgress, setCheckedProgress] = useState([]);
  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
 
 

  return (
    <>
      <div className="app-container">
        <div className='tabs-container'>
            <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example">
                  <Tab label="All" style={{color: 'brown', fontSize: '12px'}}/>
                  <Tab label="Low" style={{color: 'green', fontSize: '12px'}}/>
                  <Tab label="Medium" style={{color: 'blue', fontSize: '12px'}}/>
                  <Tab label="High" style={{color: 'red', fontSize: '12px'}}/>
                  </Tabs>
        </div>
        <div className='task-management-container'>
          <div className='backlog'>
            <h3>Backlog</h3>
            <Backlog
              todolist={todolist}
              setTodolist={setTodolist}
              progressList={progressList}
              setProgressList={setProgressList}
              doneList={doneList}
              setDoneList={setDoneList}
              checkedTodo = {checkedTodo}
              setCheckedTodo = {setCheckedTodo}
              checkedProgress = {checkedProgress}
              setCheckedProgress = {setCheckedProgress}
              value = {value}
               />
          </div>

          <div>
            <div className='Inprogress'>
              <h3>In-Progress</h3>
              <InProgress
                progressList={progressList}
                setProgressList={setProgressList}
                doneList={doneList}
                setDoneList={setDoneList}
                checkedProgress = {checkedProgress}
                setCheckedProgress = {setCheckedProgress}
                value = {value}
               />
            </div>
          </div>

          <div>
            <div className='done'>
              <h3>Done</h3>
              <Done
                doneList={doneList}
                setDoneList={setDoneList}
                value = {value}
                />
            </div>
          </div>
        </div>

          <div className='track-record-container'>
            <div className='img-h3'>
              <img src = {img1} alt = 'my picture'/>
              <h3>Hello, Priyanshi</h3>
            </div>
            
            <div className='total-pending-ongoing-completed'>
              <div className='total-task'>
                <h4>Total Task</h4>
                <div style= {{color: 'brown', fontSize: '30px'}}>{todolist.length}</div>
              </div>

              <div className='pending'>
                <h4>Pending</h4>
                <div style= {{color: 'red', fontSize: '30px'}}>{todolist.length - checkedTodo.length}</div>
              </div>

              <div className='ongoing'>
                <h4>Ongoing</h4>
                <div style= {{color: 'rgb(219, 73, 207)', fontSize: '30px'}}>{progressList.length - checkedProgress.length}</div>
              </div>

              <div className='completed'>
                <h4>Completed</h4>
                  <div style= {{color: 'green', fontSize: '30px'}}>{doneList.length}</div>

              </div>
            </div>

            <div className='pi-chart'>
                <Graph total = {todolist.length}
                        pending={todolist.length - checkedTodo.length}
                        ongoing={progressList.length - checkedProgress.length}
                        completed={doneList.length}
                        />
            </div>
          </div>
      </div>
    </>
  )
}



export default App


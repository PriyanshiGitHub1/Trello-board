import { useState } from 'react';
import { MdDelete } from "react-icons/md";


function Done({ doneList, setDoneList, value }) {
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
        {value === 0 && doneList.map((item, index) => {
          return (
            <div key={item.id} className='done-list'>
              <div className='done-task'>
                {item.todos.length > 50 ? item.todos.slice(0, 51).concat("...") : item.todos}
              </div>
              
              <span className='delete-button' onClick={() => handleDeleteDone(item.id)}>
                <MdDelete style={{color: 'red', fontSize: "1.5em"}}/>
              </span>
            </div>
          )
        })}

{value === 1 && doneList.filter((element => element.priority === 'Low')).map((item, index) => {
          return (
            <div key={item.id} className='done-list'>
              <div className='done-task'>
                {item.todos.length > 50 ? item.todos.slice(0, 51).concat("...") : item.todos}
              </div>
              
              <span className='delete-button' onClick={() => handleDeleteDone(item.id)}>
                <MdDelete style={{color: 'red', fontSize: "1.5em"}}/>
              </span>
            </div>
          )
        })}

{value === 2 && doneList.filter((element => element.priority === 'Medium')).map((item, index) => {
          return (
            <div key={item.id} className='done-list'>
              <div className='done-task'>
                {item.todos.length > 50 ? item.todos.slice(0, 51).concat("...") : item.todos}
              </div>
              
              <span className='delete-button' onClick={() => handleDeleteDone(item.id)}>
                <MdDelete style={{color: 'red', fontSize: "1.5em"}}/>
              </span>
            </div>
          )
        })}
        
        {value === 3 && doneList.filter((element => element.priority === 'High')).map((item, index) => {
          return (
            <div key={item.id} className='done-list'>
              <div className='done-task'>
                {item.todos.length > 50 ? item.todos.slice(0, 51).concat("...") : item.todos}
              </div>
              <span className='delete-button' onClick={() => handleDeleteDone(item.id)}>
                <MdDelete style={{color: 'red', fontSize: "1.5em"}}/>
              </span>
            </div>
          )
        })}

      </>
    )
  }
  
export default Done  
import { useState } from 'react';
import { MdDelete } from "react-icons/md";


function InProgress({ progressList, doneList, setDoneList, setProgressList, checkedProgress, setCheckedProgress, value }) {

    console.log("progress list=======>", progressList);

  
    function handleCheckProgress(event, itemId) {
      if (event.target.checked) {
        const updateDoneList= progressList.filter((item) => item.id === itemId);
        setCheckedProgress(checkedProgress.concat(updateDoneList))
        setDoneList(doneList.concat(updateDoneList));
      }
    }
  

    function handleDeleteProgress(itemId) {
      console.log(itemId);

      if (checkedProgress.some(element => element.id === itemId)) {
        const deletedProgress = progressList.filter((todo) => todo.id !== itemId);
        setProgressList(deletedProgress);
        setCheckedProgress(checkedProgress.filter((todo) => todo.id!== itemId));
    } else {
      const deletedProgress = progressList.filter((todo) => todo.id !== itemId);
      setProgressList(deletedProgress);
    }
      
      if(doneList.some(element => element.id === itemId)) {
        const dlAfterDeleteingPl = doneList.filter((todo) => todo.id !== itemId);
        setDoneList(dlAfterDeleteingPl);
        }
    }
  
    return (
      <>
      {value === 0 && progressList.map((item, index) => {
                return (
                  <div key={item.id} className='progress-list'>
                  <div className='checkbox-with-progress-list'>
                    <input type="checkbox" disabled = {checkedProgress.includes(item)} onClick={(event) => handleCheckProgress(event, item.id)} />
                    <div className='progress-task' title={item.todos.length > 50 ? item.todos : ""}>
                      {item.todos.length > 50 ? item.todos.slice(0, 51).concat("...") : item.todos}
                    </div>
                  </div>
                  <span className='delete-button' onClick={() => handleDeleteProgress(item.id)}>
                    <MdDelete style={{color: 'red', fontSize: "1.5em"}}/>
                  </span>
                </div>
                )
      }
    )
  }

{value === 1 && progressList.filter((element => element.priority === 'Low')).map((item, index) => {
                return ( <div key={item.id} className='progress-list'>
                  <div className='checkbox-with-progress-list'>
                    <input type="checkbox" disabled = {checkedProgress.includes(item)} onClick={(event) => handleCheckProgress(event, item.id)} />
                    <div className='progress-task' title={item.todos.length > 50 ? item.todos : ""}>
                      {item.todos.length > 50 ? item.todos.slice(0, 51).concat("...") : item.todos}
                    </div>
                  </div>
                  <span className='delete-button' onClick={() => handleDeleteProgress(item.id)}>
                    <MdDelete style={{color: 'red', fontSize: "1.5em"}}/>
                  </span>
                </div>)
}
)
}

{value === 2 && progressList.filter((element => element.priority === 'Medium')).map((item, index) => {
                return ( <div key={item.id} className='progress-list'>
                  <div className='checkbox-with-progress-list'>
                    <input type="checkbox" disabled = {checkedProgress.includes(item)} onClick={(event) => handleCheckProgress(event, item.id)} />
                    <div className='progress-task' title={item.todos.length > 50 ? item.todos : ""}>
                      {item.todos.length > 50 ? item.todos.slice(0, 51).concat("...") : item.todos}
                    </div>
                  </div>
                  <span className='delete-button' onClick={() => handleDeleteProgress(item.id)}>
                    <MdDelete style={{color: 'red', fontSize: "1.5em"}}/>
                  </span>
                </div>)
}
)
}

{value === 3 && progressList.filter((element => element.priority === 'High')).map((item, index) => {
                return ( <div key={item.id} className='progress-list'>
                  <div className='checkbox-with-progress-list'>
                    <input type="checkbox" disabled = {checkedProgress.includes(item)} onClick={(event) => handleCheckProgress(event, item.id)} />
                    <div className='progress-task' title={item.todos.length > 50 ? item.todos : ""}>
                      {item.todos.length > 50 ? item.todos.slice(0, 51).concat("...") : item.todos}
                    </div>
                  </div>
                  <span className='delete-button' onClick={() => handleDeleteProgress(item.id)}>
                    <MdDelete style={{color: 'red', fontSize: "1.5em"}}/>
                  </span>
                </div>)
}
)
}


        {/* {progressList.map((item, index) => {
          return (
            <div key={item.id} className='progress-list'>
              <div className='checkbox-with-progress-list'>
                <input type="checkbox" disabled = {checkedProgress.includes(item)} onClick={(event) => handleCheckProgress(event, item.id)} />
                <div className='progress-task' title={item.todos.length > 50 ? item.todos : ""}>
                  {item.todos.length > 50 ? item.todos.slice(0, 51).concat("...") : item.todos}
                </div>
              </div>
              <span className='delete-button' onClick={() => handleDeleteProgress(item.id)}>
                <MdDelete style={{color: 'red', fontSize: "1.5em"}}/>
              </span>
            </div>
          )
        })} */}
  
      </>
    )
  }

  export default InProgress
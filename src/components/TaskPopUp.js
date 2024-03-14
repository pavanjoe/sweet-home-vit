import React from 'react';
import '../styles/TaskPopUp.css';

const TaskPopUp = ({ task, onClose, deleteItem }) => {
  
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const handleDelete = () => {
    if (task && task._id) {
      deleteItem(task._id);
      onClose();
    }
  };

  return (
    <div className={`popup ${task ? 'show' : ''}`}>
      {task && (
        <>
          <h3>{capitalizeFirstLetter(task.item)}</h3>
          {task.status && <p>Status: {capitalizeFirstLetter(task.status)}</p>}
          {task.priority && <p>Priority: {capitalizeFirstLetter(task.priority)}</p>}
          {task.category && <p>Category: {capitalizeFirstLetter(task.category)}</p>}
          {task.notes && <p>Description: {capitalizeFirstLetter(task.notes)}</p>}
          {task.date && <p>Completion Date: {capitalizeFirstLetter(task.date )}</p>}
          <center>
            <button onClick={onClose} className='btn btn-warning m-2'>Close</button>
            <button onClick={handleDelete} className='btn btn-danger m-2'>Delete</button>
          </center>
        </>
      )}
    </div>
  );
};

export default TaskPopUp;

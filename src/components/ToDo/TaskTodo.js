import React, { useState, useEffect } from "react";
import { TiPencil } from "react-icons/ti";

export default function TaskTodo({
  status,
  text,
  id,
  handleChangeToggleTask,
  handleDeleteClick,
  handleEditTask,
  theme,
  removingTaskId,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const [shortenedText, setShortenedText] = useState(text);

  useEffect(() => {
      if (text.length > 75) {
      setShortenedText(text.substring(0, 75) + "...");
    } else {
      setShortenedText(text);
    }
  }, [text]);

  const taskContent = function (status, text) {
    return status ? (
      <p className={`taskText completed ${theme}`}>
        <p className="taskContentSmoothStrikethrough">{text}</p>
      </p>
    ) : (
      <p className={`taskText ${theme}`}>{text}</p>
    );
  };
  const handleSaveEdit = () => {
    handleEditTask(id, editText);
    setIsEditing(false);
  };
  const handleCancelEdit = () => {
    setIsEditing(!isEditing)
    setEditText(text)
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    }
  };
  const handleOpenEditTask = () =>{
    setEditText(text)
    setIsEditing(true)

  }

  return (
    <div
      className={`task ${removingTaskId === id ? "taskFadeOut" : ""} ${theme}`}
      key={id}
    >
      <div className="textAndCheckbox">
        <label>
          <input
            className="inputCheckBox"
            onChange={() => handleChangeToggleTask(id)}
            type="checkbox"
            checked={status}
          />
          {<span className={`customCheckbox ${theme}`}></span>}
        </label>

        <div
          className="clickTextTask"
          onClick={() => handleChangeToggleTask(id)}
        >
          {isEditing ? (
            <textarea
            className= {` changeTextTask ${theme}`}
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyPress}
              onClick = {(e)=>e.stopPropagation()}
            />
          ) : (
            taskContent(status, shortenedText)
          )}
        </div>
      </div>
      {isEditing ? (
        <div className="taskEditDeleteBlock">
          <button  className='buttonSaveEdit'onClick={handleSaveEdit}>Save</button>
          <button className='buttonDeleteEdit' onClick={handleCancelEdit}>Cancel</button>
        </div>
      ) : (
        <div className="taskEditDeleteBlock">
          <button
            className="buttonPencilEdit"
            onClick={handleOpenEditTask}
          >
           {theme === "light"?<TiPencil />:<TiPencil style = {{color: "white"}}/>}
          </button>
          <button
            className={`buttonDeleteTask ${theme}`}
            onClick={() => handleDeleteClick(id)}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
}

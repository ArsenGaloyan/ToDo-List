import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TiPencil } from "react-icons/ti";
import { TiArrowUpThick } from "react-icons/ti";
import { TiArrowUpOutline } from "react-icons/ti";
import { setToggleTask, setEditTask } from "../../features/todos/todosSlice.js";
import { openModal, closeModal } from "../../features/todos/modalSlice.js";

export default function TaskTodo({
  status,
  text,
  id,
  handleDeleteClick,
  removingTaskId,
}) {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.currentTheme);


  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const [isExpanded] = useState(false); // оставляем в локальном состоянии компонента
  const [shortenedText, setShortenedText] = useState(text); // оставляем в локальном состоянии компонента

  useEffect(() => {
    if (isExpanded || text.length <= 25) {
      setShortenedText(text);
    } else {
      setShortenedText(text.substring(0, 25));
    }
  }, [text, isExpanded]);

  const handleSaveEdit = () => {
    // оставляем в локальном состоянии компонента
    dispatch(setEditTask({ id, newText: editText }));
    setIsEditing(false);
  };




  const taskContent = (status, text) => {
    return status ? (
      <p className={`taskText completed ${theme}`}>
        <span className="taskContentSmoothStrikethrough">{text}</span>
      </p>
    ) : (
      <p className={`taskText ${theme}`}>{text}</p>
    );
  };
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditText(text);
  };
  const handleOpenModal = () => {
    
    dispatch(openModal({text:text, modalType: "taskContent"}));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <div
      className={`task ${removingTaskId === id ? "taskFadeOut" : ""} ${theme}`}
      key={id}
    >
      <div className="textAndCheckbox">
        <label>
          <input
            className="inputCheckBox"
            onChange={() => dispatch(setToggleTask(id))}
            type="checkbox"
            checked={status}
          />
          {<span className={`customCheckbox ${theme}`}></span>}
        </label>

        <div className="clickTextTask">
          {isEditing ? (
            <textarea
              className={` changeTextTask ${theme}`}
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
          ) : (
            <span
              onClick={() => dispatch(setToggleTask(id))}
              className="textAndEllipsis"
            >
              {taskContent(status, shortenedText)}{" "}
              {!isExpanded && text.length > 25 && (
                <span
                  className={` expandText ${theme}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal(e);
                  }}
                >
                  ...
                </span>
              )}
              {isExpanded && (
                <span
                  className="collapseText"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCloseModal();
                  }}
                >
                  {theme === "light" ? (
                    <TiArrowUpOutline />
                  ) : (
                    <TiArrowUpThick />
                  )}
                </span>
              )}
            </span>
          )}
        </div>
      </div>
      {isEditing ? (
        <div className="taskEditDeleteBlock">
          <button className="buttonSaveEdit" onClick={handleSaveEdit}>
            Save
          </button>
          <button className="buttonDeleteEdit" onClick={handleCancelEdit}>
            Cancel
          </button>
        </div>
      ) : (
        <div className="taskEditDeleteBlock">
          <button
            className="buttonPencilEdit"
            onClick={() => setIsEditing(true)}
          >
            <TiPencil style={theme === "light" ? {} : { color: "white" }} />
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

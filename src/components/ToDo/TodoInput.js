import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { setAddTask } from "../../features/todos/todosSlice";
export default function TodoInput() {
  const [textTodo, setTextTodo] = useState("");

  const theme = useSelector((state)=> state.theme.currentTheme)

  const dispatch = useDispatch()
  
  

  const handleClickAddTask = () => {
    const newTask = {
      id: uuidv4(),
      text: textTodo,
      status: false,
    };
    if (textTodo.trim().length !== 0) {
      dispatch(setAddTask(newTask));
      
      setTextTodo("");
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleClickAddTask();
    }
  };
  const backgroundInput =
    theme === "light"
      ? { backgroundColor: "white" }
      : { backgroundColor: "#25273c" };

  return (
    <div className="todoInputBlock">
      <input
        style={backgroundInput}
        placeholder="Create a new todo..."
        className={`todoInput ${theme}`}
        onChange={(event) => setTextTodo(event.target.value)}
        onKeyDown={handleKeyDown}
        value={textTodo}
      />
    </div>
  );
}

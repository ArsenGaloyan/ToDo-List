import "./todo.css";
import { useEffect } from "react";
import TodoInput from "./TodoInput";
import TaskTodo from "./TaskTodo";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../features/todos/themeSlice.js";
import { setVision, FILTRES } from "../../features/todos/visionSlice.js";
import Modal from "./Modal.js";
import FiltredBlockTasks from "./FiltredBlockTasks.js";



export const ToDo = () => {
  const isShowModal = useSelector((state) => state.modal.isShowModal);

  const theme = useSelector((state) => state.theme.currentTheme);
  const vision = useSelector((state) => state.vision);
  const tasks = useSelector((state) => state.todos.tasks);

  const dispatch = useDispatch();

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const filtredTask = tasks.filter((task) => {
    if (vision === FILTRES.ALL) return true;
    if (vision === FILTRES.ACTIVE) return !task.status;
    if (vision === FILTRES.COMPLETED) return task.status;
    return true;
  });

  const checkBackgroundTheme =
    theme === "light" ? "light backgroundLight" : "dark backgroundDark";

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const hour = new Date().getHours();

    dispatch(toggleTheme(hour >= 7 && hour < 21 ? "light" : "dark"));
  }, [dispatch]);

  return (
    <div className={`todoContainer ${checkBackgroundTheme}`}>
      <div className="todoContainerBlock">
        <div className="todoContainerHeader">
          <h1 className="todoContainerTitle">T O D O</h1>
          <button
            onClick={handleToggleTheme}
            className={`todoContainerToggleTheme ${theme}`}
          >
            <img
              src={
                theme === "light"
                  ? "./img/img_todo/icon-moon.svg"
                  : "./img/img_todo/icon-sun.svg"
              }
              alt="Иконка"
            ></img>
          </button>
        </div>

        <TodoInput />
        {filtredTask.map(({ id, status, text }) => (
          <TaskTodo key={id} id={id} status={status} text={text} />
        ))}
        <FiltredBlockTasks theme = {theme} tasks = {tasks} setVision = {setVision} FILTRES = {FILTRES}/>
      </div>
      <div className="footer">
        <h6 className="footerTitle">Drag and drop to reorder list.</h6>
        <p className="footerString">
          Challenge by <a href="2332"> Frontend Mentor </a>. Coded by{" "}
          <a href="2121"> ApplePieGiraffe</a>.
        </p>
      </div>
      {isShowModal && <Modal/>}
    </div>
  );
};

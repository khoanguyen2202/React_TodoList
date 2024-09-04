import React, { useContext, useEffect, useReducer, useRef } from "react";
import reducer, { initialState } from "./reducer";
import { setTask, addTask, deleteTask } from "./actions";
import logger from "./logger";
import { ThemeContext } from "../App";

function TodoApp() {
  const [state, dispatch] = useReducer(logger(reducer), initialState);
  const { task, taskList } = state;
  const inputRef = useRef();
  const theme = useContext(ThemeContext);
  const handleAddTask = () => {
    if (task !== "") {
      dispatch(addTask(task));
      dispatch(setTask(""));
      inputRef.current.focus();
    }
  };
  useEffect(() => {
    localStorage.setItem("taskListVersion2", JSON.stringify(taskList));
  }, [taskList]);

  return (
    <div className={theme}>
      <div>Todo App Version 2</div>
      <input
        ref={inputRef}
        type="text"
        value={task}
        onChange={(e) => dispatch(setTask(e.target.value))}
        style={{ marginTop: "20px", marginBottom: "10px" }}
      />
      <button onClick={handleAddTask} style={{ marginLeft: "20px" }}>
        Add Task
      </button>
      {taskList.map((task, index) => (
        <li key={index}>
          {task}
          <span
            onClick={() => dispatch(deleteTask(index))}
            style={{ marginLeft: "20px", fontSize: "20px", cursor: "pointer" }}
          >
            &times;
          </span>
        </li>
      ))}
    </div>
  );
}

export default TodoApp;

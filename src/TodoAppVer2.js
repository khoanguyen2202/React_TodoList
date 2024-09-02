import React, { useEffect, useReducer, useRef } from "react";

const localTaskList = JSON.parse(localStorage.getItem("taskListVersion2"));
const initialState = {
  task: "",
  taskList: localTaskList ?? [],
};

const SET_TASK = "set_task";
const ADD_TASK = "add_task";
const DELETE_TASK = "delete_task";

const setTask = (payload) => {
  return {
    type: SET_TASK,
    payload,
  };
};
const addTask = (payload) => {
  return {
    type: ADD_TASK,
    payload,
  };
};
const deleteTask = (payload) => {
  return {
    type: DELETE_TASK,
    payload,
  };
};

const reducer = (state, action) => {
  let newState;
  switch (action.type) {
    case SET_TASK:
      newState = {
        ...state,
        task: action.payload,
      };
      break;
    case ADD_TASK:
      newState = {
        ...state,
        taskList: [...state.taskList, action.payload],
      };

      break;
    case DELETE_TASK:
      const newTaskList = [...state.taskList];
      newTaskList.splice(action.payload, 1);
      newState = {
        ...state,
        taskList: newTaskList,
      };
      break;
    default:
      throw new Error("Invalid Action.");
  }
  return newState;
};

function TodoAppVer2() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { task, taskList } = state;
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

  const inputRef = useRef();

  return (
    <div>
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
            style={{ marginLeft: "20px", fontSize: "20px" }}
          >
            &times;
          </span>
        </li>
      ))}
    </div>
  );
}

export default TodoAppVer2;

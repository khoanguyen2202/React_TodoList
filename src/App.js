import React, { createContext, useEffect, useReducer, useState } from "react";
import Content from "./Content";
import FakeChat from "./FakeChat";
import Cart from "./Cart";
// import TodoAppVer2 from "./TodoAppVer2";
import TodoApp from "./Todo";
import TodoAppVer3 from "./TodoAppVer3";

const initialState = {
  toggle: false,
  toggle2: false,
  toggle3: false,
  toggle4: false,
  toggle5: false,
};

const TOGGLE_TAB = "toggle_tab";

const setToggleTab = (payload) => {
  return {
    type: TOGGLE_TAB,
    payload,
  };
};

const reducer = (state, action) => {
  let newState = { ...state };
  switch (action.type) {
    case TOGGLE_TAB:
      // newState = {
      //   toggle: action.payload === "toggle" ? !state.toggle : false,
      //   toggle2: action.payload === "toggle2" ? !state.toggle2 : false,
      //   toggle3: action.payload === "toggle3" ? !state.toggle3 : false,
      //   toggle4: action.payload === "toggle4" ? !state.toggle4 : false,
      // };
      for (const key in newState) {
        if (key === action.payload) {
          newState[key] = !state[key]; // Toggle the specific property
        } else {
          newState[key] = false; // Reset other properties to false
        }
      }

      break;

    default:
      throw new Error("Invalid action.");
  }
  return newState;
};

export const ThemeContext = createContext();

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState(() => {
    const storageTaskList = JSON.parse(localStorage.getItem("taskList"));
    return storageTaskList ?? [];
  });
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [theme, setTheme] = useState("dark");

  const handleAddTask = () => {
    setTaskList((prev) => {
      const newTaskList = [...prev, task];
      // Save to local storage
      const jsonTaskList = JSON.stringify(newTaskList);
      localStorage.setItem("taskList", jsonTaskList);

      return newTaskList;
    });
    setTask("");
  };

  const handleDeleteTask = (index) => {
    setTaskList((prev) => {
      const updateTaskList = [...prev];
      updateTaskList.splice(index, 1);
      localStorage.setItem("taskList", JSON.stringify(updateTaskList));
      return updateTaskList;
    });
  };

  // const [show, setShow] = useState({
  //   toggle: false,
  //   toggle2: false,
  //   toggle3: false,
  // });

  // const handleToggle = (toggleId) => {
  //   setShow((prev) => {
  //     return {
  //       toggle: false,
  //       toggle2: false,
  //       toggle3: false,
  //       [toggleId]: !prev[toggleId],
  //     };
  //   });
  // };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <ThemeContext.Provider value={theme}>
      <div className="App" style={{ padding: "32px" }}>
        <button onClick={toggleTheme}>Set Theme</button>
        <br />
        <input
          style={{ marginRight: "10px" }}
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add</button>
        <ul>
          {taskList.map((task, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              {task}
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => handleDeleteTask(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => dispatch(setToggleTab("toggle"))}
          style={{ marginRight: "30px" }}
        >
          Toggle
        </button>
        <button
          onClick={() => dispatch(setToggleTab("toggle2"))}
          style={{ marginRight: "30px" }}
        >
          Toggle 2
        </button>
        <button
          onClick={() => dispatch(setToggleTab("toggle3"))}
          style={{ marginRight: "30px" }}
        >
          Toggle 3
        </button>
        <button
          onClick={() => dispatch(setToggleTab("toggle4"))}
          style={{ marginRight: "30px" }}
        >
          Toggle 4
        </button>
        <button
          onClick={() => dispatch(setToggleTab("toggle5"))}
          style={{ marginRight: "30px" }}
        >
          Toggle 5
        </button>
        {`Screen Width: ${width}`}
        <span style={{ marginLeft: "30px", marginRight: "30px" }}></span>
        {`Screen Height: ${height}`}

        {state.toggle && <Content />}
        {state.toggle2 && <FakeChat />}
        {state.toggle3 && <Cart />}
        {state.toggle4 && <TodoApp />}
        {state.toggle5 && <TodoAppVer3 />}
      </div>
    </ThemeContext.Provider>
  );
}

export default App;

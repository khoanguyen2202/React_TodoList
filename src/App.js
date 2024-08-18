import React, { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState(() => {
    const storageTaskList = JSON.parse(localStorage.getItem("taskList"));
    return storageTaskList ?? [];
  });
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
  return (
    <div className="App" style={{ padding: "32px" }}>
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
    </div>
  );
}

export default App;

import React, { useContext, useEffect } from "react";
import { useStore, actions } from "./store";
import { ThemeContext } from "./App";
import { useRef } from "react";
function TodoAppVer3() {
  const [state, dispatch] = useStore();
  const { todos, todoInput } = state;
  const theme = useContext(ThemeContext);
  const inputRef = useRef();
  const handleAddTodo = () => {
    if (todoInput.trim() !== "") {
      dispatch(actions.addTodo(todoInput));
      dispatch(actions.setTodoInput(""));
      inputRef.current.focus();
    }
  };
  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <div className={theme}>
      <input
        ref={inputRef}
        type="text"
        value={todoInput}
        placeholder="Enter todo"
        onChange={(e) => {
          dispatch(actions.setTodoInput(e.target.value));
        }}
      />
      <button onClick={handleAddTodo}>Add</button>
      <br />
      {todos.map((todo, index) => (
        <li key={index}>
          {todo}
          <span
            style={{ marginLeft: "20px", cursor: "pointer" }}
            onClick={() => dispatch(actions.deleteTodo(index))}
          >
            &times;
          </span>
        </li>
      ))}
    </div>
  );
}

export default TodoAppVer3;

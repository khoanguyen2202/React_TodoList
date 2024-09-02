import { SET_TASK, ADD_TASK, DELETE_TASK } from "./constants";

const localTaskList = JSON.parse(localStorage.getItem("taskListVersion2"));
export const initialState = {
  task: "",
  taskList: localTaskList ?? [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_TASK:
      return {
        ...state,
        task: action.payload,
      };

    case ADD_TASK:
      return {
        ...state,
        taskList: [...state.taskList, action.payload],
      };

    case DELETE_TASK:
      const newTaskList = [...state.taskList];
      newTaskList.splice(action.payload, 1);
      return {
        ...state,
        taskList: newTaskList,
      };

    default:
      throw new Error("Invalid Action.");
  }
};

export default reducer;

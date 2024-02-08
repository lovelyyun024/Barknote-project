const SET_TASKS = "tasks/setTasks";
const ADD_TASK = "tasks/addTask";
const UPDATE_TASK = "tasks/updateTask";
const DELETE_TASK = "tasks/deleteTask";
const FETCH_ONE_TASK = "tasks/fetchOneTask";
const UPDATE_ONE_TASK = "tasks/updateOneTask";

const setTasks = (tasks) => ({
  type: SET_TASKS,
  payload: tasks,
});

const addTask = (task) => ({
  type: ADD_TASK,
  payload: task,
});

const updateTask = (task) => ({
  type: UPDATE_TASK,
  payload: task,
});

const deleteTask = (taskId) => ({
  type: DELETE_TASK,
  payload: taskId,
});

const fetchOneTask = (task) => ({
  type: FETCH_ONE_TASK,
  payload: task,
});

export const updateOneTask = (id) => ({
  type: UPDATE_ONE_TASK,
  payload: id,
});

export const thunkFetchTasks = () => async (dispatch) => {
  const response = await fetch("/api/tasks");
  if (response.ok) {
    const data = await response.json();
    dispatch(setTasks(data.tasks));
  }
};

export const thunkFetchOneTask = (taskId) => async (dispatch) => {
  const response = await fetch(`/api/tasks/${taskId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(fetchOneTask(data.task));
    return data;
  }
};

export const thunkCreateTask = (taskData) => async (dispatch) => {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addTask(data));
  }
};

export const thunkUpdateTask = (taskId, taskData) => async (dispatch) => {
  const response = await fetch(`/api/tasks/${taskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(updateTask(data));
  }
};

export const thunkDeleteTask = (taskId) => async (dispatch) => {
  const response = await fetch(`/api/tasks/${taskId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteTask(taskId));
  }
};

const initialState = { tasks: [], task: [] };

function taskReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TASKS:
      return { ...state, tasks: action.payload };
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case FETCH_ONE_TASK:
      return { ...state, task: [action.payload] }
    default:
      return state;
  }
}

export default taskReducer;

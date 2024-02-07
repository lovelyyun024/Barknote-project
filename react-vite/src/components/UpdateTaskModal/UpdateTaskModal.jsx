import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import {thunkFetchOneTask, thunkUpdateTask, thunkDeleteTask} from "../../redux/tasks";

export default function TaskUpdateForm({ id }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [description, setDescription] = useState("");
  const [due_date, setDue_date] = useState("");
  const [errors, setErrors] = useState({});
  const tasksData = useSelector((state) => state.task.task);
  const taskData = Object.values(tasksData);
  const convertDateFormat2 = (inputDate) => {
     const date = new Date(inputDate);
     const year = date.getFullYear();
     const month = (date.getMonth() + 1).toString().padStart(2, "0");
     const day = date.getDate().toString().padStart(2, "0");
     const hours = date.getHours().toString().padStart(2, "0");
     const minutes = date.getMinutes().toString().padStart(2, "0");

     const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
     return formattedDate;
   };
   
  const duetime = taskData[0]?.due_date ? convertDateFormat2(taskData[0]?.due_date.slice(0, -4)) : ""


useEffect(() => {
    dispatch(thunkFetchOneTask(id));
  }, [dispatch, id]);
1
useEffect(() => {
  setDescription(taskData[0]?.description);

  setDue_date(duetime);
}, [taskData, duetime]);

  const convertDateFormat = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  };

  const handleTaskUpdate = async (e) => {
    e.preventDefault();

    const task = {
      description,
    };
    if (due_date) task.due_date = convertDateFormat(due_date);

    console.log("time---", task)

    const taskData = await dispatch(thunkUpdateTask(id, task));
    if (taskData) {
      setErrors(taskData.errors);
    } else closeModal();
  };

  const handleTaskDelete = async(e) =>{
    e.preventDefault();
    dispatch(thunkDeleteTask(id));
    closeModal();
  }

  // const [status, setStatus] = useState("incomplete");

  // const toggleStatus = () => {
  //     setStatus((prevStatus) =>
  //       prevStatus === "completed" ? "incomplete" : "completed"
  //     );
  // };


  return (
    <div className="create-notebook-wrapper">
      <div className="create-notebook-header">
        <div>Manage task</div>
        <button onClick={closeModal}>
          <i className="fa fa-close"></i>
        </button>
      </div>
      <div className="create-notebook-middle">
        Tasks allow you to assign due date to actions, helping you organize and
        manage your to-do lists effectively.
      </div>
      {errors.server && <span className="error-message">{errors.server}</span>}
      <form onSubmit={handleTaskUpdate} className="notebook-creation-form">
        <label>
          Description
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task"
            required
          />
        </label>
        {errors.description && <span className="error-message">{errors.description}</span>}
        <label>
          Due date
          <input
            type="datetime-local"
            name="datetime"
            value={due_date}
            onChange={(e) => setDue_date(e.target.value)}
          ></input>
        </label>
        {/* <button onClick={toggleStatus}>
          Status: {status.charAt(0).toUpperCase() + status.slice(1)}
        </button> */}

        <div className="update-button-wrapper">
          <div className="delete-task-button">
            <button onClick={handleTaskDelete}>Delete task</button>
          </div>
          <button type="submit" className="create-button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

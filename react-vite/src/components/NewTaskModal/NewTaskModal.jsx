import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkCreateTask } from "../../redux/tasks";

export default function TaskCreationForm() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [description, setDescription] = useState("");
  const [due_date, setDue_date] = useState("");
  const [errors, setErrors] = useState({});
  const handleTaskCreation = async (e) => {
    e.preventDefault();

    const task = {
      description
    };
    if (due_date) task.due_date = convertDateFormat(due_date);

    const taskData = await dispatch(thunkCreateTask(task));
    if (taskData) {
      setErrors(taskData.errors);
    } else closeModal();
  };

  const  convertDateFormat = (inputDate) =>{
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  }

  return (
    <div className="create-notebook-wrapper">
      <div className="create-notebook-header">
        <div>Create new task</div>
        <button onClick={closeModal}>
          <i className="fa fa-close"></i>
        </button>
      </div>
      <div className="create-notebook-middle">
        Tasks allow you to assign due date to actions, helping you organize and
        manage your to-do lists effectively.
      </div>
      {errors.server && <span className="error-message">{errors.server}</span>}
      <form onSubmit={handleTaskCreation} className="notebook-creation-form">
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

        <div className="create-button-wrapper">
          <button type="submit" className="create-button">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkUpdateNotebook } from "../../redux/notebooks";
import "./UpdateNotebookModal.css";

export default function NBUpdateForm({ notebookId, nbtitle }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [title, setTitle] = useState(nbtitle);
  const [errors, setErrors] = useState({});

  const handleNotebookCreation = async (e) => {
    e.preventDefault();

    if (title.length > 100)
      return setErrors({
        title: "Name: limit 100 characters.",
      });

    const notebook = { title };

    const notebookData = await dispatch(
      thunkUpdateNotebook(notebookId, notebook)
    );
    if (!notebookData?.errors) {
      return closeModal();
    } else {
      setErrors(notebookData.errors);
    }
  };

  return (
    <div className="create-notebook-wrapper">
      <div className="create-notebook-header">
        <div>Rename notebook</div>
        <button onClick={closeModal}>
          <i className="fa fa-close"></i>
        </button>
      </div>
      <form
        onSubmit={handleNotebookCreation}
        className="notebook-creation-form"
      >
        <label>
          Name
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={nbtitle}
            required
          />
        </label>
        {errors.title && <span className="error-message">{errors.title}</span>}
        <div className="create-button-wrapper">
          <button
            onClick={closeModal}
            style={{
              backgroundColor: "white",
              color: "rgb(115, 115, 115)",
              border: "1px solid rgb(115, 115, 115)",
            }}
          >
            Cancel
          </button>
          <button type="submit">Continue</button>
        </div>
      </form>
    </div>
  );
}

import { thunkDeleteNotebook } from "../../redux/notebooks";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";

export default function NBDeleteForm({ notebookId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmitDelete = (e) => {
    e.preventDefault();
    dispatch(thunkDeleteNotebook(notebookId));
    closeModal();
  };

  return (
    <div className="create-notebook-wrapper">
      <div className="create-notebook-header">
        <div>Delete notebook? </div>
        <button onClick={closeModal}>
          <i className="fa fa-close"></i>
        </button>
      </div>
      <div className="create-notebook-middle">
        Warning: The notebook will be gone forever. This action cannot be undone.
      </div>
      <form onSubmit={handleSubmitDelete} className="notebook-creation-form">
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
          <button
            type="submit"
            style={{
              backgroundColor: "rgb(229, 78, 64)",
            }}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}

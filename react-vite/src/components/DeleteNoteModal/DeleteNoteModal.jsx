import { thunkDeleteNote } from "../../redux/notes";
import { thunkDeleteNBNote } from "../../redux/notebooks";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function NoteDeleteForm({ noteId, pattern }) {
  const id = noteId;
  const switchPat = pattern;
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const navigate = useNavigate();

  const handleSubmitDelete = (e) => {
    e.preventDefault();
    if (window.location.pathname == "/main/notebooks"){
      dispatch(thunkDeleteNBNote(id));
    } else  dispatch(thunkDeleteNote(id));
   
    closeModal();
    if (switchPat) navigate("/main/board");
  };

  return (
    <div className="create-notebook-wrapper">
      <div className="create-notebook-header">
        <div>Delete note? </div>
        <button onClick={closeModal}>
          <i className="fa fa-close"></i>
        </button>
      </div>
      <div className="create-notebook-middle">
        Warning: The note will be gone forever. This action cannot be undone.
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

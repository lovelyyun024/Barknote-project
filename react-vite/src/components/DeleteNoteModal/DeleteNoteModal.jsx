import { thunkDeleteNote } from "../../redux/notes";
import { useModal } from "../../context/Modal";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function NoteDeleteForm() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const { noteId } = useParams();
  const navigate = useNavigate();
  const handleSubmitDelete = (e) => {
    e.preventDefault();
    dispatch(thunkDeleteNote(noteId));

    closeModal();
    navigate("/main/board");
  };

  const handleSubmitKeep = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div>
      <form onSubmit={handleSubmitDelete}>
        <h1> Delete note? </h1>
        <p>
          Warning: The note will be gone forever. This action cannot be undone.
        </p>
        <button type="submit">Delete</button>
      </form>

      <form onSubmit={handleSubmitKeep}>
        <button type="submit">Cancel</button>
      </form>
    </div>
  );
}

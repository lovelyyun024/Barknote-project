import { thunkDeleteNote } from "../../redux/notes";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function NoteDeleteForm({noteId, pattern}) {
  const id = noteId
  const switchPat = pattern
  // console.log(id)
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const navigate = useNavigate();
  const handleSubmitDelete = (e) => {
    e.preventDefault();
    dispatch(thunkDeleteNote(id));

    closeModal();
    if (switchPat) navigate("/main/board");

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

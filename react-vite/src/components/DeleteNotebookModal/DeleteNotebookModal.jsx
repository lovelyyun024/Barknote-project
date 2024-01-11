import { thunkDeleteNotebook } from "../../redux/notebooks";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";

export default function NBDeleteForm({ notebookId }) {
  //   const id = spotId;
  //   console.log("label",id)
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmitDelete = (e) => {
    e.preventDefault();
    dispatch(thunkDeleteNotebook(notebookId));

    closeModal();
  };

  const handleSubmitKeep = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div>
      <form onSubmit={handleSubmitDelete}>
        <h1> Delete notebook? </h1>
        <p>
          Any notes in the notebook will be moved to Trash. This cannot be
          undone.
        </p>
        <button type="submit">Delete</button>
      </form>

      <form onSubmit={handleSubmitKeep}>
        <button type="submit">Cancel</button>
      </form>
    </div>
  );
}

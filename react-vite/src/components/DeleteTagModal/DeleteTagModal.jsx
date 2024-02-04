import { thunkDeleteTag } from "../../redux/tags";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";

export default function TagDeleteForm({ tagId, tag }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmitDelete = (e) => {
    e.preventDefault();
    dispatch(thunkDeleteTag(tagId));
    closeModal();
  };

  return (
    <div className="create-notebook-wrapper">
      <div className="create-notebook-header">
        <div>Delete tag? </div>
        <button onClick={closeModal}>
          <i className="fa fa-close"></i>
        </button>
      </div>
      <div className="create-notebook-middle">
        Are you sure you want to delete the <span style={{color:"#737373", fontWeight:"600"}}>{tag}</span> tag? This tag
        will be removed from all notes.
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

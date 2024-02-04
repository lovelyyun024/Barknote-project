import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkUpdateTag } from "../../redux/tags";

export default function TagUpdateForm({ tagId, tag, setTagModal }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [name, setName] = useState(tag);
  const [errors, setErrors] = useState({});

  const handleNotebookCreation = async (e) => {
    e.preventDefault();

    const tag = {
      name,
    };

    const tagData = await dispatch(thunkUpdateTag(tagId, tag));

    if (tagData) {
      setErrors(tagData.errors);
    } else closeModal();
  };

  return (
    <div className="create-notebook-wrapper">
      <div className="create-notebook-header">
        <div>Rename tag</div>
        <button onClick={closeModal}>
          <i className="fa fa-close"></i>
        </button>
      </div>
      <div className="create-notebook-middle">
        Tags let you add keywords to notes, making them easier to find and
        browse.
      </div>
      {errors.server && <span>{errors.server}</span>}
      <form
        onSubmit={handleNotebookCreation}
        className="notebook-creation-form"
      >
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={tag}
            required
          />
        </label>
        {errors.name && <span>{errors.name}</span>}
        <div className="create-button-wrapper">
          <button
            type="submit"
            className="create-button"
          >
            Done
          </button>
        </div>
      </form>
    </div>
  );
}

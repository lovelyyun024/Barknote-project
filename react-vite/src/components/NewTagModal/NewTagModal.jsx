import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkCreateTag } from "../../redux/tags";

export default function TagCreationForm() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const handleNotebookCreation = async (e) => {
    e.preventDefault();

    const tag = {
      name,
    };

    const tagData = await dispatch(thunkCreateTag(tag));

    if (tagData) {
      setErrors(tagData.errors);
    } else closeModal();
  };

  return (
    <div className="create-notebook-wrapper">
      <div className="create-notebook-header">
        <div>Create new tag</div>
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
            placeholder="Tag name"
            required
          />
        </label>
        {errors.name && <span>{errors.name}</span>}
        <div className="create-button-wrapper">
          <button type="submit" className="create-button">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

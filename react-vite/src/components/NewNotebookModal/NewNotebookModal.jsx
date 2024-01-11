import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkCreateNotebook } from "../../redux/notebooks";
import "./NewNotebookModal.css";

export default function NBCreationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState({});
//   const [theme, setTheme] = useState("light");

//   useEffect(() => {
//     const storedTheme = localStorage.getItem("theme");
//     if (storedTheme) {
//       setTheme(storedTheme);
//     }
//   }, []);

//   document.documentElement.className = `theme-${theme}`;

  const handleNotebookCreation = async (e) => {
    e.preventDefault();

    const notebook = {
      title
    };

    const notebookData = await dispatch(thunkCreateNotebook(notebook));
    if (!notebookData?.errors) {
      return closeModal();
    } else {
      setErrors(notebookData.errors);
    }
  };

  return (
    <div className="create-notebook-wrapper">
      <div className="create-notebook-header">
        <h3>Create new notebook</h3>
        <button onClick={closeModal}>
          <i class="fa fa-close"></i>
        </button>
        <p>
          Notebooks are useful for grouping notes around a common topic. They
          can be private or shared.
        </p>
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
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Notebook name"
            required
          />
        </label>
        {errors.title && <p>{errors.title}</p>}

        <button type="submit" className="create-button">
          Create
        </button>
      </form>
    </div>
  );
}

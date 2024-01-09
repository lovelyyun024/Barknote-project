import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkUpdateNotebook } from "../../redux/notebooks";
import "./UpdateNotebookModal.css";

export default function NoteCreationForm() {
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
      title,
    };

    const notebookData = await dispatch(thunkUpdateNotebook(notebook));
    if (!notebookData.errors) {
      return closeModal();
    } else {
      setErrors(notebookData.errors);
    }
  };

  return (
    <div className="update-notebook-wrapper">
      <div className="update--notebook-header">
        <h3>Rename notebook</h3>
        <button onClick={closeModal}>
          <i class="fa fa-close"></i>
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
            onChange={(e) =>
              setTitle(e.target.value.toLowerCase().replace(/\s+/g, "-"))
            }
            // placeholder="Notebook name"
            required
          />
        </label>
        {errors.title && <p>{errors.title}</p>}

        <button type="submit" className="create-button">
          Continue
        </button>
      </form>
    </div>
  );
}

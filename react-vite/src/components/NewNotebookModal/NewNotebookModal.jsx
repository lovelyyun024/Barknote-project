import { useState } from "react";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkCreateNotebook } from "../../redux/notebooks";
import "./NewNotebookModal.css";

export default function NBCreationForm() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  // const sessionUser = useSelector((state) => state.session.user);
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
        <div>Create new notebook</div>
        <button onClick={closeModal}>
          <i className="fa fa-close"></i>
        </button>
      </div>
      <div className="create-notebook-middle">
        Notebooks are useful for grouping notes around a common topic. They can
        be private or shared.
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
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Notebook name"
            required
          />
        </label>
        {errors.title && <p>{errors.title}</p>}
        <div className="create-button-wrapper">
          <button type="submit" className="create-button">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

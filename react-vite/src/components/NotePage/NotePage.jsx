import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkCreateNote } from "../../redux/notes";
import { thunkFetchNotebooks } from "../../redux/notebooks";
import "./NotePage.css";

export default function NotePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.session.user);
  const notebooksData = useSelector((state) => state.notebook.notebooks);
  const notebookList = Object.values(notebooksData);

  const [notebook_id, setNotebook_id] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [img_url] = useState("");
  const [pinned, setPinned] = useState("");
  const [errors] = useState({});

  useEffect(() => {
    dispatch(thunkFetchNotebooks());
  }, [dispatch]);

  const handleNoteCreation = async (e) => {
    e.preventDefault();
    const note = {
      notebook_id,
      user_id: currentUser.id,
      content,
      img_url,
      pinned,
    };

    if (title) note.title = title 
    const noteData = await dispatch(thunkCreateNote(note));
    // console.log(noteData)
    // if (!noteData.errors) {
      alert("Note created successfully");
      navigate(`/main/notes`)
      setNotebook_id("")
      setTitle("");
      setContent("")
      setPinned("")
    // } 
    // else {
    //   setErrors(noteData.errors);
    // }
  };

  return (
    <div className="note-editor-container">
      <form onSubmit={handleNoteCreation} className="note-editor-form">
        <div className="option-wrapper-big">
          <div className="botton-display-left">
            <div className="select-option-wrapper">
              <label className="note-label" style={{ width: "100px" }}>
                Select Notebook:
                <select
                  className="select-input"
                  value={notebook_id}
                  onChange={(e) => setNotebook_id(e.target.value)}
                  style={{ width: "160px", marginLeft:"10px"}}
                  required
                >
                  <option value="">Select a Notebook</option>
                  {notebookList.map((notebook) => (
                    <option key={notebook.id} value={notebook.id}>
                      {notebook.title}
                    </option>
                  ))}
                </select>
                {errors.notebook_id && <p>{errors.notebook_id}</p>}
              </label>
            </div>

            <label className="note-label">
              Pinned:
              <input
                type="checkbox"
                checked={pinned}
                onChange={(e) => setPinned(e.target.checked)}
                style={{ width: "20px", marginLeft: "30px" }}
              />
            </label>
            {errors.pinned && <p>{errors.pinned}</p>}
          </div>

          <div className="option-wrapper-small">
            <button type="submit">
              Create
            </button>
          </div>
        </div>

        <input
          className="note-input note-title-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        {errors.title && <p>{errors.title}</p>}
        <textarea
          className="note-input note-content-input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing"
        />
        {errors.content && <p>{errors.content}</p>}
      </form>
    </div>
  );
}

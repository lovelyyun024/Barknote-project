import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { thunkFetchNotebooks } from "../../redux/notebooks";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { thunkFetchOneNote, thunkUpdateNote } from "../../redux/notes";
import NoteDeleteForm from "../DeleteNoteModal/DeleteNoteModal";

export default function EditNotePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { noteId } = useParams();
  const currentUser = useSelector((state) => state.session.user);
  const notebooksData = useSelector((state) => state.notebook.notebooks);
  const notebookList = Object.values(notebooksData);

  useEffect(() => {
    dispatch(thunkFetchOneNote(noteId));
  }, [dispatch, noteId]);

    useEffect(() => {
      dispatch(thunkFetchNotebooks());
    }, [dispatch]);

  const notesData = useSelector((state) => state.note.notes);
  const noteList = Object.values(notesData);
  const [setShowMenu] = useState(false);
  // console.log("@@@", noteList[0].notebook_id)

  const [notebook_id, setNotebook_id] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [img_url, setImg_url] = useState("");
  const [pinned, setPinned] = useState("");
  const [errors] = useState({});

  if (!noteList[0]) return null;

  useEffect(() => {
    setNotebook_id(noteList[0].notebook_id ? noteList[0].notebook_id : "");
    setTitle(noteList[0].title ? noteList[0].title : "");
    setContent(noteList[0].content ? noteList[0].content : "");
    setPinned(noteList[0].pinned ? noteList[0].pinned : "");
    setImg_url(noteList[0].img_url ? noteList[0].img_url : "");
  }, [noteList]);

  const closeMenu = () => {
    setShowMenu(false);
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setNoteData((prevNoteData) => ({
  //     ...prevNoteData,
  //     [name]: value,
  //   }));
  // };

  // const handleCreateNote = async () => {
  //   await dispatch(thunkUpdateNote(noteId, noteData));
  //   navigate(`/main/notes/${noteId}`);
  //   alert("Note updated successfully");
  // };
  const handleNoteUpdate = async (e) => {
    e.preventDefault();
    const note = {
      notebook_id,
      user_id: currentUser.id,
      content,
      img_url,
      pinned,
    };

    if (title) note.title = title;
    const noteData = await dispatch(thunkUpdateNote(noteId, note));
    // console.log(noteData)
    // if (!noteData.errors) {
    alert("Note updated successfully");
    navigate(`/main/notes/${noteId}`);
    // }
    // else {
    //   setErrors(noteData.errors);
    // }
  };

  return (
    <div className="note-editor-container">
      <div className="botton-display-left">
        <i className="material-icons" style={{ color: "orange" }}>
          delete_forever
        </i>
        <OpenModalButton
          buttonText="Delele"
          onItemClick={closeMenu}
          type="button"
          modalComponent={<NoteDeleteForm />}
        />
      </div>
      <form onSubmit={handleNoteUpdate} className="note-editor-form">
        <div className="option-wrapper-big">
          <div className="botton-display-left">
            <label className="note-label" style={{ width: "100px" }}>
              Select Notebook:
            </label>
            <select
              className="note-input"
              value={notebook_id}
              onChange={(e) => setNotebook_id(e.target.value)}
              style={{ width: "150px" }}
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
          </div>
        </div>
        <div className="option-wrapper-small">
          <div className="botton-display-left">
            <label className="note-label" style={{ width: "100px" }}>
              Pinned:
              <input
                className="note-input"
                type="checkbox"
                value={pinned}
                onChange={(e) => setPinned(e.target.value)}
                style={{ width: "20px" }}
              />
            </label>
            {errors.pinned && <p>{errors.pinned}</p>}
          </div>

          <button className="note-button" type="submit">
            Update Note
          </button>
        </div>

        <input
          className="note-input note-title-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p>{errors.title}</p>}
        <textarea
          className="note-input note-content-input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {errors.content && <p>{errors.content}</p>}
      </form>
    </div>
  );
}

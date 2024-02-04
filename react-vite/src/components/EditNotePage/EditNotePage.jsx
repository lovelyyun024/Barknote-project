import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { thunkFetchNotebooks } from "../../redux/notebooks";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { thunkFetchOneNote, thunkUpdateNote } from "../../redux/notes";
import { Editor } from "primereact/editor";
import NoteDeleteForm from "../DeleteNoteModal/DeleteNoteModal";

export default function EditNotePage() {
  const dispatch = useDispatch();
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

  const [notebook_id, setNotebook_id] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [img_url, setImg_url] = useState("");
  const [pinned, setPinned] = useState("");
  const [tags, setTags] = useState([]);
 const [errors, setErrors] = useState({});

 const tagsData = useSelector((state) => state.tag.tags);
 const tagList = Object.values(tagsData);

  if (!noteList[0]) return null;

  // console.log("00000", noteList[0].tags);

  useEffect(() => {
    setNotebook_id(noteList[0].notebook_id ? noteList[0].notebook_id : "");
    setTitle(noteList[0].title ? noteList[0].title : "");
    setContent(noteList[0].content ? noteList[0].content : "");
    setPinned(noteList[0].pinned ? noteList[0].pinned : "");
    setImg_url(noteList[0].img_url ? noteList[0].img_url : "");
    setTags("");
  }, [noteList[0]]);

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

    //  if (content.length > 2000)
    //    return setErrors({
    //      content: "Content: limit 2000 characters.",
    //    });

     if (title.length > 100)
       return setErrors({
         title: "Title: limit 100 characters.",
       });

    const note = {
      notebook_id,
      user_id: currentUser.id,
      content,
      img_url,
      pinned,
      tags: JSON.stringify(tags),
    };

    if (title) {
      note.title = title} else{
      note.title="Untitled"
    }
    const noteData = await dispatch(thunkUpdateNote(noteId, note));
     if (noteData) {
       setErrors(noteData.errors);
     } else {
       alert("Note updated successfully");
       setErrors("");
     }
  };

  return (
    <div className="note-update-container">
      <form onSubmit={handleNoteUpdate} className="note-editor-form">
        <div className="option-wrapper-big">
          <div className="botton-display-left">
            <div className="select-option-wrapper">
              <label className="note-label" style={{ width: "100px" }}>
                Select Notebook:
                <select
                  className="select-input"
                  value={notebook_id}
                  onChange={(e) => setNotebook_id(e.target.value)}
                  style={{ width: "160px", marginLeft: "10px" }}
                  required
                >
                  <option value="">Select a Notebook</option>
                  {notebookList.map((notebook) => (
                    <option key={notebook.id} value={notebook.id}>
                      {notebook.title}
                    </option>
                  ))}
                </select>
                {errors.notebook_id && <span>{errors.notebook_id}</span>}
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
            {errors.pinned && <span>{errors.pinned}</span>}

            <label className="note-label">
              <div style={{ marginRight: "50px" }}>Tags:</div>
              {noteList[0].tags.length !== 0
                ? noteList[0].tags.map((tag) => (
                    <div key={tag.id}>|&nbsp;{tag.name}&nbsp;|&nbsp;</div>
                  ))
                : "none"}
            </label>
        
          </div>

          <div className="option-wrapper-small">
            <div className="botton-display-right">
              <OpenModalButton
                buttonText={
                  <i className="material-icons" style={{ fontSize: "30px" }}>
                    delete_forever
                  </i>
                }
                onItemClick={closeMenu}
                type="button"
                modalComponent={
                  <NoteDeleteForm noteId={noteId} pattern={true} />
                }
              />
            </div>
            <div className="option-wrapper-create">
              <button type="submit">Update</button>
            </div>
            <div
              className="option-wrapper-limit"
              style={{ fontSize: "12px", color: "#737373" }}
            >
              {/* Limit 2000 characters. <span>{2000 - content.length} </span>
              characters remaining */}
            </div>
          </div>
        </div>

        <div className="select-option-wrapper">
          <label className="note-label" style={{ width: "300px" }}>
            Select Tags:
            <select
              className="select-input-tags"
              value={tags}
              onChange={(e) =>
                setTags(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
              multiple
            >
              {tagList.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <input
          className="note-input note-title-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        {errors.title && <span>{errors.title}</span>}
        {errors.content && <span>{errors.content}</span>}
        {/* <textarea
          className="note-input note-content-input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div contenteditable="true">{content}</div> */}
        <Editor
          value={content}
          onTextChange={(e) => setContent(e.htmlValue)}
          style={{ height: "700px" }}
        />
      </form>
    </div>
  );
}

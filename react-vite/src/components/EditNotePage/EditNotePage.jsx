import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { thunkFetchNotebooks } from "../../redux/notebooks";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { thunkFetchOneNote, thunkUpdateNote } from "../../redux/notes";
import { thunkFetchTags } from "../../redux/tags";
import NoteDeleteForm from "../DeleteNoteModal/DeleteNoteModal";
import Editor1 from "../Editor/Editor";

export default function EditNotePage() {
  const dispatch = useDispatch();
  const { noteId } = useParams();
  const currentUser = useSelector((state) => state.session.user);
  const notebooksData = useSelector((state) => state.notebook.notebooks);
  const notebookList = Object.values(notebooksData);

  useEffect(() => {
    dispatch(thunkFetchOneNote(noteId));
    dispatch(thunkFetchNotebooks());
    dispatch(thunkFetchTags());
  }, [dispatch, noteId]);

  const notesData = useSelector((state) => state.note.note);
  const [showMenu, setShowMenu] = useState(false);

  const [notebook_id, setNotebook_id] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pinned, setPinned] = useState("");
  const [tags, setTags] = useState([]);
  const [errors, setErrors] = useState({});

  const tagsData = useSelector((state) => state.tag.tags);
  const tagList = Object.values(tagsData);

  // if (!notesData) {return null;}

  useEffect(() => {
    setNotebook_id(notesData?.notebook_id);
    setTitle(notesData?.title);
    setContent(notesData?.content);
    setPinned(notesData?.pinned);
    setTags(notesData?.tags.map((tag) => tag.id));
  }, [notesData]);

  const closeMenu = () => {
    setShowMenu(false);
  };

  function getFirstImgSrc(htmlString) {
    // Create a new DOMParser
    const parser = new DOMParser();

    // Parse the HTML string
    const doc = parser.parseFromString(htmlString, "text/html");

    // Find the first img tag
    const firstImg = doc.querySelector("img");

    // If an img tag is found, return its src attribute value, otherwise return null
    return firstImg ? firstImg.getAttribute("src") : null;
  }

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
      pinned,
    };

    if (getFirstImgSrc(content)) note.img_url = getFirstImgSrc(content);
    note.tags = JSON.stringify(tags);

    if (title) {
      note.title = title;
    } else {
      note.title = "Untitled";
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
            <label className="note-label">
              Notebook:
              <select
                className="select-input-edit"
                value={notebook_id}
                onChange={(e) => setNotebook_id(e.target.value)}
                required
              >
                <option value="">Select a Notebook</option>
                {notebookList.map((notebook) => (
                  <option key={notebook.id} value={notebook.id}>
                    {notebook.title}
                  </option>
                ))}
              </select>
              {errors.notebook_id && (
                <span className="error-message">{errors.notebook_id}</span>
              )}
            </label>

            <label className="note-label">
              Tags:
              <select
                className="select-input-tags-edit"
                value={tags}
                onChange={(e) =>
                  setTags(
                    Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    )
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

            {/* <label className="note-label">
              Tags:
              <div className="tags-list">
                {notesData.tags.length !== 0
                  ? notesData.tags.map((tag) => (
                    <>
                      <div key={tag.id} className="tags-list-detail">{tag.name}</div>
                      &nbsp;&nbsp;
                    </>
                    ))
                  : "none"}
              </div>
            </label> */}
            <label className="note-label">
              Pinned:
              <input
                type="checkbox"
                checked={pinned}
                onChange={(e) => setPinned(e.target.checked)}
                className="select-input-pin"
              />
            </label>
            {errors.pinned && (
              <span className="error-message">{errors.pinned}</span>
            )}
          </div>

          <div className="option-wrapper-small">
            <div className="botton-display-right">
              <OpenModalButton
                buttonText={
                  <i className="material-icons" style={{ fontSize: "32px" }}>
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
            {/* <div className="option-wrapper-create"> */}
            <button type="submit">Update</button>
            {/* </div> */}
            {/* <div
              className="option-wrapper-limit"
              style={{ fontSize: "12px", color: "#737373" }}
            > */}
            {/* Limit 2000 characters. <span>{2000 - content.length} </span>
              characters remaining */}
            {/* </div> */}
          </div>
        </div>

        {/* <div className="select-option-wrapper"> */}

        {/* </div> */}

        <input
          className="note-input note-title-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
        {errors.content && (
          <span className="error-message">{errors.content}</span>
        )}
        {/* <textarea
          className="note-input note-content-input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div contenteditable="true">{content}</div> */}
        <Editor1
          // defaultValue="start writing"
          onValueChange={(value) => setContent(value)}
          // style={{ height: "700px" }}
          value={content}
        />
      </form>
    </div>
  );
}

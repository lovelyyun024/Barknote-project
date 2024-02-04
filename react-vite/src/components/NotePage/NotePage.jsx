import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkCreateNote } from "../../redux/notes";
import { thunkFetchNotebooks } from "../../redux/notebooks";
import { thunkFetchTags } from "../../redux/tags";
import { Editor } from "primereact/editor";
// import "primereact/resources/themes/lara-dark-indigo/theme.css"
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css"
import "./NotePage.css";

export default function NotePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.session.user);
  const notebooksData = useSelector((state) => state.notebook.notebooks);
  const notebookList = Object.values(notebooksData);

   const tagsData = useSelector((state) => state.tag.tags);
   const tagList = Object.values(tagsData);
  //  console.log("!!!!!",tagList)

  const [notebook_id, setNotebook_id] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [img_url] = useState("");
  const [pinned, setPinned] = useState("");
  const [tags, setTags] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(thunkFetchNotebooks());
    dispatch(thunkFetchTags());
  }, [dispatch]);

  const handleNoteCreation = async (e) => {
    e.preventDefault();

    // if (content.length > 2000)
    //   return setErrors({
    //     content: "Content: limit 2000 characters.",
    //   });

    if (title.length > 100)
      return setErrors({
        title: "Title: limit 100 characters.",
      });

    // console.log("1111", tags)
    const note = {
      notebook_id,
      user_id: currentUser.id,
      content,
      img_url,
      pinned,
      tags: JSON.stringify(tags),
    };

    console.log("3333", note);

    if (title) note.title = title;
    const noteData = await dispatch(thunkCreateNote(note));
    if (noteData) {
      setErrors(noteData.errors);
    } else {
      alert("Note created successfully");
      setNotebook_id("");
      setTitle("");
      setContent("");
      setPinned("");
      setTags([]);
      setErrors("");
    }
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
          </div>

          <div className="option-wrapper-small">
            <div className="option-wrapper-create">
              <button type="submit">Create</button>
            </div>
            <div
              className="option-wrapper-limit"
              style={{ fontSize: "12px", color: "#737373" }}
            >
              {/* Limit 2000 characters. <span>{2000 - content?.length} </span>
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
          placeholder="Start writing"
        /> */}
        <Editor
          value={content}
          onTextChange={(e) => setContent(e.htmlValue)}
          style={{ height: "700px" }}
          placeholder="Start writing"
        />
      </form>
    </div>
  );
}

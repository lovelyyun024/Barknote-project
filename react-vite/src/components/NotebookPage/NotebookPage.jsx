import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
// import { Link, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { thunkFetchNotebooks } from "../../redux/notebooks";
// import { thunkFetchNotes } from "../../redux/notes";
import NBCreationForm from "../NewNotebookModal/NewNotebookModal";
import NBUpdateForm from "../UpdateNotebookModal/UpdateNotebookModal";
import NBDeleteForm from "../DeleteNotebookModal/DeleteNotebookModal";
import NoteDeleteForm from "../DeleteNoteModal/DeleteNoteModal";
import "./NotebookPage.css";

export default function NotebookPage() {
  const dispatch = useDispatch();

  const notebooksData = useSelector((state) => state.notebook.notebooks);
  const notebookList = Object.values(notebooksData);
  const [showMenu, setShowMenu] = useState(false);
  const [showMenu1, setShowMenu1] = useState(false);
  const [showMenu2, setShowMenu2] = useState(false);
  const ulRef = useRef();

  const [selectedNotebookId, setSelectedNotebookId] = useState(null);
  const [action, setAction] = useState(false);
  const [list, setList] = useState(false);

  const toggleMenu1 = (e, notebookId) => {
    e.stopPropagation();
    setShowMenu1(!showMenu1);
    setSelectedNotebookId(notebookId);
    setAction(false);
    setList(!list);
  };

  const toggleMenu2 = (e, notebookId) => {
    e.stopPropagation();
    setShowMenu2(!showMenu2);
    setSelectedNotebookId(notebookId);
    setAction(true);
  };

  useEffect(() => {
    if (!showMenu1) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu1(false);
        setSelectedNotebookId(null);
      }
    };

    document.addEventListener("click", closeMenu1);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu1]);

    useEffect(() => {
      if (!showMenu2) return;

      const closeMenu = (e) => {
        if (!ulRef.current.contains(e.target)) {
          setShowMenu2(false);
          setSelectedNotebookId(null);
        }
      };

      document.addEventListener("click", closeMenu2);

      return () => document.removeEventListener("click", closeMenu);
    }, [showMenu2]);

  const closeMenu1 = () => {
    setShowMenu1(false);
    // setSelectedNotebookId(null);
  };


    const closeMenu = () => {
      setShowMenu(false);
    };

    const closeMenu2 = () => {
      setShowMenu2(false);
      setSelectedNotebookId(null);
      setAction(false);
    };

  useEffect(() => {
    dispatch(thunkFetchNotebooks());
  }, [dispatch]);

  if (!notebookList) return null;

  return (
    <>
      <div className="all-notebook-wrapper">
        <div className="all-notebook-header">Notebooks</div>
        <div className="all-notebook-title">
          <p>
            {notebookList.length}&nbsp;
            {notebookList.length == 1 ? "notebook" : "notebooks"}
          </p>

          <div className="all-notebook-side">
            <i className="material-icons" style={{ color: "orange" }}>
              note_add
            </i>
            <OpenModalButton
              buttonText="New Notebook"
              onItemClick={closeMenu}
              modalComponent={<NBCreationForm />}
            />
          </div>
        </div>
        <div className="notebook-divider" />
        <div className="all-notebook-list-wrapper">
          <div className="all-notebook-title-wrapper">
            <div className="notebook-attribute-1">TITLE</div>
            <div className="notebook-attribute">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CREATED BY
            </div>
            <div className="notebook-attribute-time">CREATED </div>
            <button className="notebook-attribute">ACTIONS</button>
          </div>
          {[...notebookList]
            .reverse()
            .map(({ title, id, user, created_at, note }) => (
              <div key={id} className="all-notebook-container">
                <div key={id} className="all-notebook-list">
                  <div className="notebook-attribute-1">
                    <button onClick={(e) => toggleMenu1(e, id)}>
                      <i
                        className={`${
                          selectedNotebookId === id && list
                            ? `fa-solid fa-caret-down`
                            : `fa-solid fa-caret-right`
                        }`}
                      />
                    </button>
                    <i className="fas fa-book-open"></i> &nbsp;{title}&nbsp; (
                    {note ? note.length : 0})
                  </div>
                  <div className="notebook-attribute">{user}</div>
                  <div className="notebook-attribute-time">
                    {created_at.slice(4, 11)}
                  </div>
                  <div className="notebook-action-wrapper">
                    <button onClick={(e) => toggleMenu2(e, id)}>
                      <i className="material-icons">more_horiz</i>
                    </button>
                    <div
                      className={`action-dropdown ${
                        selectedNotebookId === id && action ? "" : "hidden"
                      }`}
                      ref={ulRef}
                    >
                      <OpenModalButton
                        buttonText="Rename notebook"
                        onItemClick={closeMenu2}
                        modalComponent={
                          <NBUpdateForm notebookId={id} nbtitle={title} />
                        }
                      />
                      <div className="outer-navbar-popup-divider"></div>
                      <OpenModalButton
                        buttonText="Delete notebook"
                        onItemClick={closeMenu2}
                        modalComponent={<NBDeleteForm notebookId={id} />}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  {selectedNotebookId === id &&
                    list &&
                    note &&
                    note.map((noteItem) => (
                      <div key={noteItem.id}>
                        <div className="all-note-list">
                          <div className="note-title-link">
                            <Link
                              to={`/main/notes/${noteItem.id}`}
                            >
                              <div className="notebook-attribute-title">
                                <i className="fas fa-file-alt"></i>
                                &nbsp;&nbsp;
                                {noteItem.title.length <= 40
                                  ? noteItem.title
                                  : noteItem.title.slice(0, 40) + "..."}
                              </div>
                            </Link>
                          </div>
                          <div className="notebook-attribute">{user}</div>
                          <div className="notebook-attribute-time">
                            {created_at.slice(4, 11)}
                          </div>
                          <div className="notebook-action-wrapper">
                            <OpenModalButton
                              buttonText={
                                <i className="material-icons">delete_forever</i>
                              }
                              onItemClick={closeMenu1}
                              modalComponent={
                                <NoteDeleteForm
                                  noteId={noteItem.id}
                                  pattern={false}
                                />
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

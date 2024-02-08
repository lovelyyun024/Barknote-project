import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { Link } from "react-router-dom";
import { thunkFetchNotebooks } from "../../redux/notebooks";
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
            <OpenModalButton
              buttonText={
                <div className="notebook-create-new">
                  <i className="material-icons">note_add</i>New
                </div>
              }
              onItemClick={closeMenu}
              modalComponent={<NBCreationForm />}
            />
          </div>
        </div>
        <div className="notebook-divider" />
        <div className="all-notebook-list-wrapper">
          <div className="all-notebook-title-wrapper">
            <div className="notebook-attribute-1">TITLE</div>
            <div className="notebook-attribute-name">CREATED BY</div>
            <div className="notebook-attribute-time">CREATED </div>
            <div className="notebook-action-wrapper">ACTIONS</div>
          </div>
          {[...notebookList]
            .reverse()
            .map(({ title, id, user, created_at, notes }) => (
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
                    {notes ? notes.length : 0})
                  </div>
                  <div className="notebook-attribute-name">&nbsp;{user}</div>
                  <div className="notebook-attribute-time">
                    &nbsp;{created_at.slice(4, 11)}
                  </div>
                  <div className="notebook-action-wrapper">
                    <button
                      onClick={(e) => toggleMenu2(e, id)}
                      className="material-icons"
                    >
                      more_horiz
                    </button>
                    <div
                      className={`action-dropdown ${
                        selectedNotebookId === id && action ? "" : "hidden"
                      }`}
                      ref={ulRef}
                    >
                      <OpenModalButton
                        buttonText={
                          <div className="dropdown-menu-option">
                            Rename notebook
                          </div>
                        }
                        onItemClick={closeMenu2}
                        modalComponent={
                          <NBUpdateForm notebookId={id} nbtitle={title} />
                        }
                      />
                      <div className="outer-navbar-popup-divider"></div>
                      <OpenModalButton
                        buttonText={
                          <div className="dropdown-menu-option">
                            Delete notebook
                          </div>
                        }
                        onItemClick={closeMenu2}
                        modalComponent={<NBDeleteForm notebookId={id} />}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  {selectedNotebookId === id &&
                    list &&
                    notes &&
                    notes.map((noteItem) => (
                      <div key={noteItem.id}>
                        <div className="all-note-list">
                          <div className="note-title-link">
                            <Link to={`/main/notes/${noteItem.id}`}>
                              <div className="notebook-attribute-1">
                          
                                <i className="fas fa-file-alt" style={{paddingLeft:"25px"}}></i>
                                &nbsp;&nbsp;
                                {noteItem.title.length <= 30
                                  ? noteItem.title
                                  : noteItem.title.slice(0, 30) + "..."}
                              </div>
                            </Link>
                          </div>
                          <div className="notebook-attribute-name">
                            &nbsp;{user}
                          </div>
                          <div className="notebook-attribute-time">
                            &nbsp;{created_at.slice(4, 11)}
                          </div>
                          <div className="notebook-action-wrapper">
                            <OpenModalButton
                              buttonText={
                                <i
                                  className="material-icons"
                                  style={{
                                    color: "#333333",
                                    marginRight: "-2px",
                                  }}
                                >
                                  delete_forever
                                </i>
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

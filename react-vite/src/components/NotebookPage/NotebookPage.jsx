import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
// import { Link, useNavigate } from "react-router-dom";
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
  // const ulClassName = "action-dropdown" + (showMenu ? "" : " hidden");
  const ulRef = useRef();

  const [selectedNotebookId, setSelectedNotebookId] = useState(null);

  const toggleMenu = (e, notebookId) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
    setSelectedNotebookId(notebookId);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        // setShowMenu(false);
        setShowMenu(false);
        setSelectedNotebookId(null);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  // const closeMenu = () => setShowMenu(false);
  const closeMenu = () => {
    setShowMenu(false);
    setSelectedNotebookId(null);
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
          <p>{notebookList?.length} notebooks</p>

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
        <div className="divider" />
        <div className="all-notebook-list-wrapper">
          <div className="all-notebook-list">
            <div className="notebook-attribute-1">TITLE</div>
            <div className="notebook-attribute">CREATED BY</div>
            <div className="notebook-attribute">CREATED </div>
            <button className="notebook-attribute">ACTIONS</button>
          </div>
          {[...notebookList]
            .reverse()
            .map(({ title, id, user, created_at, note }) => (
              <div key={id} className="all-notebook-container">
                <div key={id} className="all-notebook-list">
                  <div className="notebook-attribute-1">
                    <button>
                      <i className="fas fa-caret-right"></i>
                    </button>
                    <i className="fas fa-book-open"></i> &nbsp;{title}&nbsp; (
                    {note ? note.length : 0})
                  </div>
                  <div className="notebook-attribute">{user}</div>
                  <div className="notebook-attribute">
                    {created_at.slice(0, 16)}{" "}
                  </div>
                  <div className="notebook-action-wrapper">
                    <button onClick={(e) => toggleMenu(e, id)}>
                      <i
                        className="fas fa-list-ul"
                        style={{ fontSize: "20px" }}
                      ></i>
                    </button>
                    <div
                      className={`action-dropdown ${
                        selectedNotebookId === id ? "" : "hidden"
                      }`}
                      ref={ulRef}
                    >
                      <OpenModalButton
                        buttonText="Rename notebook"
                        onItemClick={closeMenu}
                        modalComponent={
                          <NBUpdateForm notebookId={id} nbtitle={title} />
                        }
                      />
                      <div className="outer-navbar-popup-divider"></div>
                      <OpenModalButton
                        buttonText="Delete notebook"
                        onItemClick={closeMenu}
                        modalComponent={<NBDeleteForm notebookId={id} />}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  {note &&
                    note.map((noteItem) => (
                      <div key={noteItem.id}>
                        {/* <Link
                          to={`/main/notes/${noteItem.id}`}
                          style={{ textDecoration: "none", color: "black" }}
                        > */}
                        <div className="all-note-list">
                          <Link
                            to={`/main/notes/${noteItem.id}`}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            <div className="notebook-attribute-1">
                              <div style={{ marginLeft: "20px" }}>
                                {noteItem.title}
                              </div>
                            </div>
                          </Link>
                          <div className="notebook-attribute">{user}</div>
                          <div className="notebook-attribute">
                            {created_at.slice(0, 16)}
                          </div>
                          <div className="notebook-action-wrapper">
                            <OpenModalButton
                              buttonText={<i class="material-icons" >delete_forever</i>}
                              onItemClick={closeMenu}
                              modalComponent={<NoteDeleteForm noteId={noteItem.id} pattern={false}/>}
                            />
                          </div>
                        </div>
                        {/* </Link> */}
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

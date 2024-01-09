import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { Link, useNavigate } from "react-router-dom";
import { thunkFetchNotebooks } from "../../redux/notebooks";
import NoteCreationForm from "../NewNotebookModal/NewNotebookModal";
import "./NotebookPage.css";


export default function BoardPage() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const notebooksData = useSelector((state) => state.notebook.notebooks);
  console.log("-----", notebooksData);
  const notebookList = Object.values(notebooksData);
  console.log("+++++", notebookList);
  console.log(notebookList.length)
  const [showMenu, setShowMenu] = useState(false);

      const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
      };

      useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
          if (!ulRef.current.contains(e.target)) {
            setShowMenu(false);
          }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
      }, [showMenu]);

      const closeMenu = () => setShowMenu(false);

  useEffect(() => {
    dispatch(thunkFetchNotebooks());
  }, [dispatch]);

  if (!notebookList) return null;

  return (
    <>
      <div className="all-notebook-wrapper">
        <div className="all-notebook-header">Notebooks</div>
        <div className="all-notebook-title">
          <p>{notebookList.length} notebooks</p>
          {/* <button> */}
          <div className="all-notebook-side">
            <i class="material-icons" style={{color:"orange"}}>note_add</i>
            <OpenModalButton
              buttonText="New Notebook"
              onItemClick={closeMenu}
              modalComponent={<NoteCreationForm />}
            />
          </div>
          {/* </button> */}
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
              <div key={id} className="all-notebook-list">
                <div className="notebook-attribute-1">
                  <button>
                    <i class="fas fa-caret-right"></i>
                  </button>{" "}
                  <i className="fas fa-book-open"></i> &nbsp;{title}
                </div>
                <div className="notebook-attribute">{user}</div>
                <div className="notebook-attribute">
                  {created_at.slice(0, 16)}{" "}
                </div>
                <button className="notebook-attribute">
                  <i class="fas fa-list-ul"></i>
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

import { useSelector, useDispatch } from "react-redux";
import { thunkFetchTags } from "../../redux/tags";
import { useState, useEffect, useRef } from "react";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import NBUpdateForm from "../UpdateNotebookModal/UpdateNotebookModal";
import NBDeleteForm from "../DeleteNotebookModal/DeleteNotebookModal";
import { Link, useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./TagSideBar";

export default function TagSideBar() {
  const dispatch = useDispatch();
  const tagsData = useSelector((state) => state.tag.tags);
  const tagList = Object.values(tagsData);
  const ulRef = useRef();
  const { closeModal } = useModal();
  const [showMenu, setShowMenu] = useState(false);
  const [selectedTagId, setSelectedTagId] = useState(null);

  useEffect(() => {
    dispatch(thunkFetchTags());
  }, [dispatch]);

  const toggleMenu = (e, tagId) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
    setSelectedTagId(tagId);
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

  const closeMenu = () => {
    setShowMenu(false);
  };

  console.log("?????",showMenu)

  return (
    <>
      <div className="tag-sidebar-wrapper">
        <div className="tag-sidebar-header">
          <div>Tags</div>
          <div>
            <i className="fas fa-tag"></i>
          </div>
        </div>
        <div className="outer-navbar-divider" />
        <div className="tag-sidebar-main">
          {[...tagList].reverse().map(({ name, id, notes }) => (
            <>
              <Link
                to={`/main/tags/${id}`}
                key={id}
                className="tag-section"
                style={{ textDecoration: "none", color: "#737373" }}
              >
                <div className="tag-section-name">
                  {name}&nbsp;
                  <span style={{ color: "#a6a6a6", fontSize: "12px" }}>
                    ({notes ? notes.length : 0})
                  </span>
                </div>
              </Link>
              <button onClick={(e) => toggleMenu(e, id)}>
                <i className="material-icons">more_horiz</i>
              </button>
              <div
                className={`action-dropdown ${
                  selectedTagId === id ? "" : "hidden"
                }`}
                ref={ulRef}
              >
                <OpenModalButton
                  buttonText="Rename tag"
                  onItemClick={closeMenu}
                  modalComponent={<NBUpdateForm tagId={id} name={name} />}
                />
                <div className="outer-navbar-popup-divider"></div>
                <OpenModalButton
                  buttonText="Delete tag"
                  onItemClick={closeMenu}
                  modalComponent={<NBDeleteForm tagId={id} />}
                />
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

import { useSelector, useDispatch } from "react-redux";
import { thunkFetchTags } from "../../redux/tags";
import { useState, useEffect, useRef } from "react";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { thunkFetchOneTag } from "../../redux/onetag";
import { Link } from "react-router-dom";
import TagCreationForm from "../NewTagModal/NewTagModal";
import TagUpdateForm from "../UpdateTagModal/UpdateTagModal";
import TagDeleteForm from "../DeleteTagModal/DeleteTagModal";
import "./TagSideBar.css";

export default function TagSideBar() {
  const dispatch = useDispatch();
  const tagsData = useSelector((state) => state.tag.tags);
  const tagList = Object.values(tagsData);
  const ulRef = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const [selectedTagId, setSelectedTagId] = useState(null);

  useEffect(() => {
    dispatch(thunkFetchTags());
    dispatch(thunkFetchOneTag(selectedTagId));
  }, [dispatch, selectedTagId]);

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

  return (
    <>
      {/* <div className="tag-sidebar-wrapper"> */}
      <div className="tag-sidebar-header">
        <div>Tags</div>
        <div className="tag-sidebar-header-button">
          <OpenModalButton
            buttonText={
              <div style={{ fontSize: "15px", color: "#333333" }}>
                <i className="fas fa-tag"></i>&nbsp;New
              </div>
            }
            onItemClick={closeMenu}
            modalComponent={<TagCreationForm />}
          />
        </div>
      </div>
      <div className="tag-sidebar-main">
        {[...tagList].reverse().map(({ name, id, notes }) => (
          <div className="tag-nav-section" key={id}>
            <Link
              to={`/main/tags/${id}`}
              style={{ textDecoration: "none", color: "#333333" }}
            >
              <div className="tag-section-name-2">
                <div className="tag-section-name-length">
                  {name.length > 30? name.slice(0, 30)+"...":name }&nbsp;
                  <span style={{ color: "gray", fontSize: "12px" }}>
                    ({notes ? notes.length : 0})
                  </span>
                </div>
              </div>
            </Link>
            <i
              className="material-icons"
              style={{ fontSize: "14px", color: "gray" }}
              onClick={(e) => toggleMenu(e, id)}
            >
              more_horiz
            </i>
            <div
              className={`tag-action-dropdown ${
                selectedTagId === id && showMenu ? "" : "hidden"
              }`}
              ref={ulRef}
            >
              <OpenModalButton
                buttonText="Rename tag"
                onItemClick={closeMenu}
                modalComponent={<TagUpdateForm tagId={id} tag={name} />}
              />
              <div className="outer-navbar-popup-divider"></div>
              <OpenModalButton
                buttonText="Delete tag"
                onItemClick={closeMenu}
                modalComponent={<TagDeleteForm tagId={id} tag={name} />}
              />
            </div>
            {/* </div> */}
          </div>
        ))}
      </div>
      {/* </div> */}
    </>
  );
}

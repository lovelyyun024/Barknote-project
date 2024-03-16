import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import "./InnerNavbar.css";
import { thunkFetchNotes } from "../../redux/notes";
import { thunkFetchOneTag } from "../../redux/onetag";

export default function InnerNavbar() {
  const dispatch = useDispatch();
  const notesData = useSelector((state) => state.note.notes);
  const noteList = Object.values(notesData);
  const noteNum = notesData.length;
  const { tagId } = useParams();
  const tagKey = useSelector((state) => state.onetag.onetags);
  const tagName = tagKey?.name;
  const notesTagList = useSelector((state) => state.onetag.onetags);
  const notesTagData = notesTagList?.notes;
  const noteTagNum = notesTagData?.length;

  useEffect(() => {
    dispatch(thunkFetchNotes());
    dispatch(thunkFetchOneTag(tagId));
  }, [dispatch, tagId]);

  const removeTags = function (str) {
    if (str === null || str === "") return false;
    else str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, "");
  };

  return (
    <>
      {!tagId && (
        <div className="inner-navbar-wrapper">
          <div className="inner-navbar-top">
            <i
              className="fas fa-paste"
              style={{ color: "gray", marginBottom: "5px" }}
            ></i>
            &nbsp;Notes
            <p
              style={{
                marginBottom: "20px",
                fontSize: "14px",
                color: "#666666",
              }}
            >
              {noteNum ? noteNum : 0} notes
            </p>
          </div>
          <div className="outer-navbar-divider" />
          <div className="inner-navbar-bottom ">
            {[...noteList]
              .reverse()
              .map(({ title, content, created_at, id, img_url, tags }) => (
                <div className="inner-note-section">
                  <Link
                    to={`/main/notes/${id}`}
                    key={id}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div className="note-bar-title">{title}</div>
                    <div className="note-bar-content">
                      {removeTags(content)}
                    </div>
                    {/* {img_url && (
                  <img
                    className="note-bar-img"
                    src={img_url}
                    alt="Note Image"
                  />
                )} */}
                    <div className="note-bar-date">
                      {created_at.slice(5, 11)}
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}
      {tagId && (
        <div className="inner-navbar-wrapper">
          <div className="inner-navbar-top">
            <i
              className="fas fa-paste"
              style={{ color: "gray", marginBottom: "5px" }}
            ></i>
            &nbsp;Notes
            <p
              style={{
                marginBottom: "20px",
                fontSize: "14px",
                color: "#666666",
              }}
            >
              {noteTagNum ? noteTagNum : 0} notes
            </p>
          </div>
          <div className="inner-navbar-filter">
            <div>FILTERS</div>
            <Link
              to={"/main/notes"}
              style={{ textDecoration: "none", color: "orange" }}
            >
              Clear
            </Link>
          </div>
          <div className="inner-navbar-tag">
            <i className="fas fa-tag"></i>
            <div>{tagName}</div>
          </div>
          <div className="outer-navbar-divider" />
          <div className="inner-navbar-bottom ">
            {notesTagData &&
              [...notesTagData]
                .reverse()
                .map(({ title, content, created_at, id, img_url, tags }) => (
                  <div className="inner-note-section">
                    <Link
                      to={`/main/notes/${id}`}
                      key={id}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div className="note-bar-title">{title}</div>
                      <div className="note-bar-content">
                        {removeTags(content)}
                      </div>
                      {/* {img_url && (
                  <img
                    className="note-bar-img"
                    src={img_url}
                    alt="Note Image"
                  />
                )} */}
                      <div className="note-bar-date">
                        {created_at.slice(5, 11)}
                      </div>
                    </Link>
                  </div>
                ))}
          </div>
        </div>
      )}
    </>
  );
}

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import "./InnerNavbar.css";
import { thunkFetchNotes } from "../../redux/notes";
import { thunkFetchOneTag } from "../../redux/tags";
import { useParams } from "react-router-dom";

export default function InnerNavbar() {
  const dispatch = useDispatch();
  const notesData = useSelector((state) => state.note.notes);
  const noteList = Object.values(notesData);
  const noteNum = notesData.length;

  const devFeature = () => alert("Feature under development");
  const { tagId } = useParams();
  const tagName = useSelector((state) => state.tag.tags.name);
  const notesTagData = useSelector((state) => state.tag.tags.notes);
  const noteTagNum = notesTagData?.length;

  useEffect(() => {
    dispatch(thunkFetchNotes());
    dispatch(thunkFetchOneTag(tagId));
  }, [dispatch]);

  if (!notesTagData) return null

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
                    <div className="note-bar-content">{content}</div>
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
              <i className="fas fa-tag" style={{ margin: "5px" }}></i>
              {tagName}
          </div>
          <div className="outer-navbar-divider" />
          <div className="inner-navbar-bottom ">
            {[...notesTagData]
              .reverse()
              .map(({ title, content, created_at, id, img_url, tags }) => (
                <div className="inner-note-section">
                  <Link
                    to={`/main/notes/${id}`}
                    key={id}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div className="note-bar-title">{title}</div>
                    <div className="note-bar-content">{content}</div>
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

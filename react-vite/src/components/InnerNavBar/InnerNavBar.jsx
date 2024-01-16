import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
// import * as sessionActions from "../../redux/session";
import ProfileModal from "../ProfileModal/ProfileModal";
import { thunkLogout } from "../../redux/session";
// import PreferenceFormModal from "../PreferenceFormModal/PreferenceFormModal";
// import ChannelCreationForm from "../ChannelCreationForm";
import "./InnerNavbar.css";
import { thunkFetchNotes } from "../../redux/notes";

export default function InnerNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notesData = useSelector((state) => state.note.notes);
    const noteList = Object.values(notesData);
  const noteNum = notesData.length;

  const devFeature = () => alert("Feature under development");

  useEffect(() => {
    dispatch(thunkFetchNotes());
  }, [dispatch]);

  return (
    <div className="inner-navbar-wrapper">
      <div className="inner-navbar-top">
        <i
          className="fas fa-paste"
          style={{ color: "gray", marginBottom: "5px" }}
        ></i>
        &nbsp;Notes
        <p style={{ marginBottom: "20px", fontSize: "14px", color:"#666666" }}>
         {noteNum ? noteNum : 0} notes
        </p>
      </div>
      <div className="outer-navbar-divider" />
      <div className="inner-navbar-bottom">
        {[...noteList]
          .reverse()
          .map(({ title, content, created_at, id, img_url }) => (
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
                <div className="note-bar-date">{created_at.slice(5, 11)}</div>
                {/* <div className="outer-navbar-divider" /> */}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

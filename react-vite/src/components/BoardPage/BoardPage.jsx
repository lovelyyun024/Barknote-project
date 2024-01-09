import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {thunkFetchNotebooks } from "../../redux/notebooks"
import "./BoardPage.css";


export default function BoardPage() {
  const sessionUser = useSelector((state) => state.session.user);
  const currentDate = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);
  const dispatch = useDispatch();

  const notebooksData = useSelector((state) => state.notebook);
  console.log("-----", notebooksData);
  const notebookList = Object.values(notebooksData);
  console.log("+++++", notebookList);
  
    useEffect(() => {
      dispatch(thunkFetchNotebooks());
    }, [dispatch]);

    if (!notebookList) return null;

  return (
    <>
      <div className="main-board-wrapper">
        <div className="main-board-header">
          <p>Hello, {sessionUser.username}!</p>
          <div className="main-board-header-side">
            <p>{formattedDate}</p>
            <button>
              <i className="fas fa-sliders-h" style={{ marginLeft: "1px" }}></i>
              &nbsp;&nbsp;Customize
            </button>
          </div>
        </div>
        <div className="note-board-widget">
          <div className="note-board-wrapper">
            <div className="note-board-header">
              <Link style={{ textDecoration: "none", color: "black" }}>
                NOTES &nbsp;
                <i className="fas fa-angle-right" style={{ color: "orange" }}></i>
              </Link>
              <div className="note-board-list">

              </div>
            </div>
          </div>
          <div className="task-board-wrapper">
            <Link style={{ textDecoration: "none", color: "black" }}>
              MY TASKS &nbsp;
              <i className="fas fa-angle-right" style={{ color: "orange" }}></i>
            </Link>
          </div>
          <div className="scratch-pad-wrapper">
            <div style={{ textDecoration: "none", color: "black" }}>
              SCRATCH PAD &nbsp;
              <i className="fas fa-angle-right" style={{ color: "orange" }}></i>
            </div>
          </div>
          <div className="pinned-note-wrapper">
            <Link style={{ textDecoration: "none", color: "black" }}>
              PINNED NOTE &nbsp;
              <i className="fas fa-angle-right" style={{ color: "orange" }}></i>
            </Link>
          </div>
          <div className="tag-board-wrapper">
            <Link style={{ textDecoration: "none", color: "black" }}>
              TAGS &nbsp;
              <i className="fas fa-angle-right" style={{ color: "orange" }}></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

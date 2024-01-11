import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { thunkFetchNotes } from "../../redux/notes";
import "./BoardPage.css";

export default function BoardPage() {
  const sessionUser = useSelector((state) => state.session.user);
  const currentDate = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);
  const dispatch = useDispatch();

  const notesData = useSelector((state) => state.note.notes);
  // console.log("-----", notesData);
  const noteList = Object.values(notesData);
  console.log("+++++", noteList);

  useEffect(() => {
    dispatch(thunkFetchNotes());
  }, [dispatch]);

  if (!noteList) return null;
  if(!sessionUser) return null;

  const devFeature = () => alert("Feature under development")

  return (
    <>
      <div className="main-board-wrapper">
        <div className="main-board-header">
          <p>Hello, {sessionUser.username}!</p>
          <div className="main-board-header-side">
            <p>{formattedDate}</p>
            <button onClick={devFeature}>
              <i className="fas fa-sliders-h" style={{ marginLeft: "1px" }}></i>
              &nbsp;&nbsp;Customize
            </button>
          </div>
        </div>
        <div className="note-board-widget">
          <div className="note-board-wrapper">
            <div className="note-board-header">
              <Link to="/main/notes"style={{ textDecoration: "none", color: "black" }}>
                NOTES &nbsp;
                <i
                  className="fas fa-angle-right"
                  style={{ color: "orange" }}
                ></i>
              </Link>

              <Link
                style={{ textDecoration: "none", color: "black" }}
                className="add-note-button"
                to="/main/notes"
              >
                <i className="material-icons" style={{ color: "orange" }}>
                  note_add
                </i>
              </Link>
            </div>
            <div className="note-board-main">
              {[...noteList]
                .reverse()
                .map(({ title, content, created_at, id, img_url }) => (
                  <Link
                    to={`/main/notes/${id}`}
                    key={id}
                    className="note-section"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div className="note-section-title">{title}</div>
                    <div className="note-section-content">{content}</div>
                    {img_url && (<img className="note-section-img" src={img_url} alt="Note Image" />)}
                    <div className="note-section-date">
                      {created_at.slice(5, 11)}
                    </div>
                  </Link>
                ))}
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

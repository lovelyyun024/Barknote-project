import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { thunkFetchNotes } from "../../redux/notes";
import { thunkFetchTags } from "../../redux/tags";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import TagCreationForm from "../NewTagModal/NewTagModal";
import TaskCreationForm from "../NewTaskModal/NewTaskModal";
import TaskUpdateForm from "../UpdateTaskModal/UpdateTaskModal";
import { thunkUpdateTask, thunkFetchOneTask, thunkFetchTasks } from "../../redux/tasks";
import parse from "html-react-parser";
import "./BoardPage.css";

export default function BoardPage() {
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();
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
  const noteList = Object.values(notesData);
  const tasksData = useSelector((state) => state.task.tasks);

  const pinned = [...noteList].filter((note) => note.pinned);
  const tagsData = useSelector((state) => state.tag.tags);
  const tagList = Object.values(tagsData);
  const url1 = "https://barkbook-bucket.s3.us-west-2.amazonaws.com/bg1.jpeg";
  const url2 = "https://barkbook-bucket.s3.us-west-2.amazonaws.com/bg2.jpeg";
  const [backgroundImage, setBackgroundImage] = useState(`url(${url1})`);

  const [setShowMenu] = useState(false);

  const [completedTasks, setCompletedTasks] = useState([]);

  //  const convertDateFormat = (inputDate) => {
  //    const date = new Date(inputDate);
  //    const year = date.getFullYear();
  //    const month = (date.getMonth() + 1).toString().padStart(2, "0");
  //    const day = date.getDate().toString().padStart(2, "0");
  //    const hours = date.getHours().toString().padStart(2, "0");
  //    const minutes = date.getMinutes().toString().padStart(2, "0");
  //    const seconds = date.getSeconds().toString().padStart(2, "0");

  //    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  //    return formattedDate;
  //  };

  const handleBgiClick = () => {
    if (backgroundImage == `url(${url1})`) {
      setBackgroundImage(`url(${url2})`);
    } else setBackgroundImage(`url(${url1})`);
  };

  const handleStaUpdate = async (id,description, completed, due_date, e) => {
    e.preventDefault();
    const updatedCompletedTasks = completedTasks.includes(id)
      ? completedTasks.filter((taskId) => taskId !== id)
      : [...completedTasks, id];

    setCompletedTasks(updatedCompletedTasks);

    const task = {
      description: description,
      completed: !completed,

    };
    // console.log("===", task)
    setTimeout(async ()=> {
      await dispatch(thunkUpdateTask(id, task));
    }, 500);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const removeTags = function (str) {
    if (str === null || str === "") return false;
    else str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, " ");
  };

  useEffect(() => {
    if (!sessionUser) {
      navigate("/");
    }
  }, [sessionUser, navigate]);

  if (!noteList) return null;

  useEffect(() => {
    dispatch(thunkFetchNotes());
    dispatch(thunkFetchTags());
    dispatch(thunkFetchTasks());
  }, [dispatch]);

  const [note, setNote] = useState("");

  useEffect(() => {
    const savedNotesFromStorage = localStorage.getItem(
      `scratchPadNotes_${sessionUser?.id}`
    );
    if (savedNotesFromStorage) {
      setNote(JSON.parse(savedNotesFromStorage));
    }
  }, []);

  const handleNoteChange = (e) => {
    const newNote = e.target.value;
    setNote(newNote);
    localStorage.setItem(
      `scratchPadNotes_${sessionUser?.id}`,
      JSON.stringify(newNote)
    );
  };

  function replaceClass(htmlString) {
    // Use a regular expression to replace all occurrences of class with className
    const updatedHtml = htmlString.replace(/class=/g, "className=");

    return updatedHtml;
  }



  return (
    <>
      <div
        className="main-board-wrapper"
        style={{ backgroundImage: backgroundImage }}
      >
        <div className="main-board-header">
          <div className="main-board-greet">
            Hello, {sessionUser?.username}!
          </div>
          <div className="main-board-header-side">
            <p
              style={{
                fontSize: "12px",
                color: "#f8f8f8",
                textShadow: "rgba(0, 0, 0, 0.4) 1px 1px 2px",
              }}
            >
              {formattedDate.toUpperCase()}
            </p>
            <button onClick={handleBgiClick}>
              <i className="fas fa-sliders-h" style={{ marginLeft: "1px" }}></i>
              &nbsp;&nbsp;Customize
            </button>
          </div>
        </div>
        <div className="note-board-widget">
          <div className="note-board-wrapper">
            <div className="note-board-header">
              <Link
                to="/main/notes"
                style={{
                  textDecoration: "none",
                  color: "#333333",
                  margin: "0px 0px 0px 8px",
                  fontSize: "14px",
                  padding: "0px 0px 0px 4px",
                }}
              >
                NOTES
                <i
                  className="fas fa-angle-right"
                  style={{ color: "orange", padding: "4px 6px 4px 6px" }}
                ></i>
              </Link>

              <Link
                style={{ padding: "1px 3px 0 3px" }}
                className="tag-section-add"
                to="/main/notes"
              >
                <i className="material-icons" style={{ color: "gray" }}>
                  note_add
                </i>
              </Link>
            </div>
            <div className="note-board-main">
              {[...noteList]
                .reverse()
                .map(({ title, content, created_at, id, tags, img_url }) => (
                  <Link
                    to={`/main/notes/${id}`}
                    key={id}
                    className="note-section"
                    style={{ textDecoration: "none" }}
                  >
                    <div className="note-section-title">{title}</div>
                    <div
                      className={
                        img_url
                          ? "note-section-content"
                          : "note-section-content2"
                      }
                    >
                      {removeTags(content)}
                    </div>
                    {img_url && (
                      <img
                        className="note-section-img"
                        src={img_url}
                        alt="Note Image"
                      />
                    )}
                    {/* <div className="note-section-tags">
                      {tags?.map((tag) => (
                        <div
                          className="note-tag-wrapper"
                        >
                          {tag.name}
                        </div>
                      ))}
                    </div> */}
                    <div className="note-section-date">
                      {created_at.slice(5, 11)}
                    </div>
                  </Link>
                ))}
            </div>
          </div>

          <div className="task-board-wrapper">
            <div className="task-board-header">
              <Link
                style={{
                  textDecoration: "none",
                  color: "#333333",
                  margin: "0px 0px 0px 8px",
                  fontSize: "14px",
                  padding: "0px 0px 0px 4px",
                }}
              >
                MY TASKS
                <i
                  className="fas fa-angle-right"
                  style={{ color: "orange", padding: "4px 6px 4px 6px" }}
                ></i>
              </Link>
              <div className="tag-section-add">
                <OpenModalButton
                  buttonText={<i className="fas fa-tasks"></i>}
                  onItemClick={closeMenu}
                  type="button"
                  modalComponent={<TaskCreationForm />}
                />
              </div>
            </div>
            <div className="task-board-main">
              {tasksData &&
                [...tasksData]
                  .filter((task) => task.completed == false)
                  .reverse()
                  .map(({ description, due_date, completed, id }) => (
                    <div className="task-board-action" key={id}>
                      <button className="check-button-effect">
                        <i
                          onClick={(e) =>
                            handleStaUpdate(
                              id,
                              description,
                              completed,
                              due_date,
                              e
                            )
                          }
                          className={
                            completedTasks.includes(id)
                              ? "far fa-check-circle"
                              : "far fa-circle"
                          }
                          style={{ fontSize: "17px", color: "orange" }}
                        ></i>
                      </button>
                      <OpenModalButton
                        buttonText={
                          <div className="task-board-button">
                            <div
                              className="task-description"
                              style={{ fontSize: "14px", overflow: "hidden" }}
                            >
                              {description}
                            </div>
                            {due_date && (
                              <div
                                style={{
                                  fontSize: "12px",
                                  color:
                                    new Date(due_date) < new Date()
                                      ? "red"
                                      : "inherit",
                                }}
                              >
                                Due {due_date.slice(4, 11)}
                              </div>
                            )}
                          </div>
                        }
                        onItemClick={closeMenu}
                        type="button"
                        modalComponent={<TaskUpdateForm id={id} />}
                      />
                    </div>
                  ))}
            </div>
          </div>

          <div className="scratch-pad-wrapper">
            <div
              style={{
                textDecoration: "none",
                color: "#333333",
                margin: "0px 0px 5px 8px",
                fontSize: "14px",
                padding: "4px 0px 4px 4px",
              }}
            >
              SCRATCH PAD
            </div>
            {/* <div className="scratch-pad-body"> */}
            <textarea
              placeholder="Start writing..."
              value={note}
              onChange={handleNoteChange}
            />
            {/* </div> */}
            {/* <div className="scratch-pad-button">
              <button onClick={handleSaveNote}>Save Note</button>
            </div> */}
          </div>

          <div className="pinned-note-wrapper">
            <div
              className="pinned-note-header"
              style={{
                textDecoration: "none",
                color: "#333333",
                margin: "0px 0px 0px 8px",
                fontSize: "14px",
                padding: "4px 0px 4px 4px",
              }}
            >
              PINNED NOTE ({pinned.length})
            </div>
            <div className="pinned-board-main">
              {[...noteList]
                .filter((note) => note.pinned)
                .reverse()
                .map(({ title, content, id}) => (
                  <Link
                    to={`/main/notes/${id}`}
                    key={id}
                    className="pinned-section"
                    style={{ textDecoration: "none" }}
                  >
                    <div className="pinned-section-icon">
                      <i
                        className="fas fa-paperclip"
                        style={{ fontSize: "20px", color: "orange" }}
                      ></i>
                    </div>
                    <div className="pinned-section-title">{title}</div>
                    <div className="pinned-section-content">
                      {parse(replaceClass(content))}
                    </div>
                  </Link>
                ))}
            </div>
          </div>
          <div className="tag-board-wrapper">
            <div className="tag-board-header">
              <Link
                style={{
                  textDecoration: "none",
                  color: "#333333",
                  margin: "0px 0px 0px 8px",
                  fontSize: "14px",
                  padding: "0px 0px 0px 4px",
                }}
              >
                TAGS
                <i
                  className="fas fa-angle-right"
                  style={{ color: "orange", padding: "4px 6px 4px 6px" }}
                ></i>
              </Link>
              <div className="tag-section-add">
                <OpenModalButton
                  buttonText={
                    <i className="fa fa-tag" style={{ fontSize: "22px" }}></i>
                  }
                  onItemClick={closeMenu}
                  type="button"
                  modalComponent={<TagCreationForm />}
                />
              </div>
            </div>
            <div className="tag-board-main">
              <div className="tag-board-container">
                {[...tagList].reverse().map(({ name, id, notes }) => (
                  <Link
                    to={`/main/tags/${id}`}
                    key={id}
                    className="tag-section"
                    style={{ textDecoration: "none", color: "#737373" }}
                  >
                    <div className="tag-section-name-1">
                      {name}
                      <span style={{ color: "#a6a6a6", fontSize: "12px" }}>
                        ({notes ? notes.length : 0})
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

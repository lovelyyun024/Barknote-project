import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import OpenModalButton1 from "../OpenModalButton/OpenModalButton1";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
// import * as sessionActions from "../../redux/session";
import ProfileModal from "../ProfileModal/ProfileModal";
import ThemeModal from "../ThemeModal/ThemeModal";
import { thunkLogout } from "../../redux/session";
// import PreferenceFormModal from "../PreferenceFormModal/PreferenceFormModal";
// import ChannelCreationForm from "../ChannelCreationForm";
import TagSideBar from "../TagSideBar/TagSideBar";
import TaskSideBar from "../TaskSideBar/TaskSideBar";
import "./OuterNavbar.css";

export default function OuterNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const [showMenu, setShowMenu] = useState(false);
  const [showTag, setShowTag] = useState(false);

    const closeShowTag = () => {setShowTag(false);};

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); 
    setShowMenu(!showMenu);
  };


  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current?.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    navigate("/");
  };

  return (
    <>
      <div className="outer-navbar-wrapper">
        <div className="outer-navbar-top">
          <div className="outer-navbar-profile-wrapper">
            <div className="outer-navbar-profile-button">
              <button
                onClick={toggleMenu}
                className="outer-navbar-profile-button"
              >
                <img
                  src={sessionUser?.img_url}
                  alt="Profile Image"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "10px",
                    objectFit: "cover",
                    marginLeft: "5px",
                  }}
                ></img>
                <div>
                  {sessionUser?.username}&nbsp;&nbsp;
                  <i
                    className="fas fa-angle-down"
                    style={{ textAlign: "center", fontSize: "14px" }}
                  ></i>
                </div>
              </button>
            </div>
            <div className={`profile-dropdown ${ulClassName}`} ref={ulRef}>
              <div className="profile-info-wrapper">
                <img
                  src={sessionUser?.img_url}
                  alt="Profile Image"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                ></img>
                <div className="profile-info-main">
                  <div>{sessionUser?.username}</div>
                  <p>{sessionUser?.email}</p>
                </div>
              </div>
              <div className="outer-navbar-divider" />
              <button onClick={logout} style={{ paddingBottom: "8px" }}>
                &nbsp;Sign out&nbsp;{sessionUser?.username}
              </button>
            </div>
          </div>
        </div>
        <div className="outer-navbar-middle">
          <button>
            <Link
              to="/main/notes"
              style={{ textDecoration: "none", color: "black" }}
            >
              <div style={{ color: "white" }}>
                <i className="fas fa-plus" style={{ marginRight: "5px" }}></i>{" "}
                New
              </div>
            </Link>
          </button>
        </div>
        <div className="outer-navbar-bottom1">
          <button>
            <Link
              to="/main/board"
              style={{ textDecoration: "none", color: "#333333" }}
            >
              <i
                className="fas fa-house-user"
                style={{ color: "gray", marginLeft: "-1px" }}
              ></i>
              &nbsp;&nbsp;Home
            </Link>
          </button>
          <OpenModalButton1
            buttonText={
              <div style={{ textDecoration: "none", color: "#333333" }}>
                <i className="fas fa-tag" style={{ color: "gray" }}></i>
                &nbsp;&nbsp;Tasks
              </div>
            }
            onItemClick={closeShowTag}
            modalComponent={<TaskSideBar />}
          />
          <button>
            <Link
              to="/main/notebooks"
              style={{ textDecoration: "none", color: "#333333" }}
            >
              <i className="fas fa-book-open" style={{ color: "gray" }}></i>
              &nbsp;&nbsp;Notebooks
            </Link>
          </button>
          <OpenModalButton1
            buttonText={
              <div style={{ textDecoration: "none", color: "#333333" }}>
                <i className="fas fa-tag" style={{ color: "gray" }}></i>
                &nbsp;&nbsp;Tags
              </div>
            }
            onItemClick={closeShowTag}
            modalComponent={<TagSideBar />}
          />
        </div>
      </div>
    </>
  );
}

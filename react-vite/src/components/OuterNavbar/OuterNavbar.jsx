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
import "./OuterNavbar.css";

export default function OuterNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const [showMenu, setShowMenu] = useState(false);
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const ulRef = useRef();

  useEffect(() => {
    if (!sessionUser) {
      navigate("/");
      console.log("check1");
    }
  }, [sessionUser, navigate]);

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

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    navigate("/");
  };

   const devFeature = () => alert("Feature under development");

  return (
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
                }}
              ></img>
              <div>{sessionUser?.username}</div>
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
            <OpenModalButton
              buttonText="Profile Photo"
              onItemClick={closeMenu}
              modalComponent={<ProfileModal />}
            />
            <div className="outer-navbar-divider" />
            <button onClick={logout}>
              Sign out&nbsp;{sessionUser?.username}
            </button>
          </div>
        </div>

        <OpenModalButton
          onItemClick={closeMenu}
          modalComponent={<ProfileModal />}
          buttonText={<i className="fas fa-cog" style={{ color: "gray" }}></i>}
        />
      </div>
      <div className="outer-navbar-middle">
        <button>
          <Link
            to="/main/notes"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div >
              <i className="fas fa-plus" style={{ marginRight: "5px" }}></i> New
            </div>
            {/* <i className="fas fa-angle-down"></i> */}
          </Link>
        </button>
      </div>
      <div className="outer-navbar-bottom1">
        <button>
          <Link
            to="/main/board"
            style={{ textDecoration: "none", color: "black" }}
          >
            <i
              className="fas fa-house-user"
              style={{ color: "gray", marginLeft: "-1px" }}
            ></i>
            &nbsp;&nbsp;Home
          </Link>
        </button>
        {/* <button>
          <Link
            to="/main/notes"
            style={{ textDecoration: "none", color: "black" }}
          >
            <i className="fas fa-paste" style={{ color: "gray" }}></i>
            &nbsp;&nbsp;Notes
          </Link>
        </button> */}
        <button onClick={devFeature}>
          <i className="fas fa-calendar-check" style={{ color: "gray" }}></i>
          &nbsp;&nbsp;Tasks
        </button>
      </div>
      <div className="outer-navbar-bottom2">
        <button>
          <Link
            to="/main/notebooks"
            style={{ textDecoration: "none", color: "black" }}
          >
            <i className="fas fa-book-open" style={{ color: "gray" }}></i>
            &nbsp;&nbsp;Notebooks
          </Link>
        </button>

        <button onClick={devFeature}>
          <i
            className="fas fa-tag"
            style={{ color: "gray", marginLeft: "1px" }}
          ></i>
          &nbsp;&nbsp;Tags
        </button>
      </div>
    </div>
  );
}

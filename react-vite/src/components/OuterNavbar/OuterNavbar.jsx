import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { useSelector } from "react-redux";
// import { useState, useEffect, useRef } from "react";
// import * as sessionActions from "../../redux/session";
// import { NavLink } from "react-router-dom";
// import ProfileModal from "../ProfileModal";
// import PreferenceFormModal from "../PreferenceFormModal/PreferenceFormModal";
// import ChannelCreationForm from "../ChannelCreationForm";
import "./OuterNavbar.css";
// import { loadServer } from "../../redux/server";

export default function OuterNavbar() {
//   const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
//   const dispatch = useDispatch();
//   const [showMenu1, setShowMenu1] = useState(false);
//   const [showMenu2, setShowMenu2] = useState(false);
//   const [profileModal, setProfileModal] = useState(false);
//   const [profileModal2, setProfileModal2] = useState(false);
//   const ulClassName1 = showMenu1 ? "" : " hidden";
//   const ulClassName2 = showMenu2 ? "" : " hidden";
//   const ulRef = useRef();

//   document.documentElement.className = `theme-${localStorage.getItem("theme") || "light"}`;

//   const toggleMenu1 = (e) => {
//     e.stopPropagation();
//     setShowMenu1(!showMenu1);
//     setShowMenu2(false);
//   };

//   useEffect(() => {
//     if (!showMenu1) return;

//     const closeMenu = (e) => {
//       if (!ulRef.current.contains(e.target)) {
//         setShowMenu1(false);
//       }
//     };

//     document.addEventListener("click", closeMenu);

//     return () => document.removeEventListener("click", closeMenu);
//   }, [showMenu1]);

//   const closeMenu1 = () => setShowMenu1(false);

//   const toggleMenu2 = (e) => {
//     e.stopPropagation();
//     setShowMenu2(!showMenu1);
//     setShowMenu1(false);
//   };

//   useEffect(() => {
//     if (!showMenu2) return;

//     const closeMenu = (e) => {
//       if (!ulRef.current.contains(e.target)) {
//         setShowMenu2(false);
//       }
//     };

//     document.addEventListener("click", closeMenu);

//     return () => document.removeEventListener("click", closeMenu);
//   }, [showMenu2]);

//   const closeMenu2 = () => setShowMenu2(false);

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(sessionActions.thunkLogout());
//     navigate("/");
//   };

//   const navigateToServer = async (serverId) => {
//     const preloadServer = async (servId) => {
//       const serv = await dispatch(loadServer(servId));
//       return serv;
//     };
//     const server = await preloadServer(serverId);
//     const channelId = Object.values(server.channels)[0].id;
//     return navigate(`/main/servers/${server.id}/channels/${channelId}`);
//   };

  return (
    <div className="outer-navbar-wrapper">
      <div className="outer-navbar-top">
        <img
          src={sessionUser.img_url}
          alt="Profile Image"
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "10px",
            objectFit: "cover",
          }}
        ></img>
        <button>{sessionUser.username}</button>
        <i className="fas fa-cog" style={{ color: "gray" }}></i>
      </div>
      <div className="outer-navbar-middle">
        <button>
          <div>
            <i className="fas fa-plus"></i> New
          </div>
          <i className="fas fa-angle-down"></i>
        </button>
      </div>
      <div className="outer-navbar-bottom1">
        <button>
          <Link to="/main/board" style={{textDecoration:"none", color:"black"}}>
            <i
              className="fas fa-house-user"
              style={{ color: "gray", marginLeft: "-1px" }}
            ></i>
            &nbsp;Home
          </Link>
        </button>
        <button>
          <i className="fas fa-paste" style={{ color: "gray" }}></i>
          &nbsp;Notes
        </button>
        <button>
          <i className="fas fa-calendar-check" style={{ color: "gray" }}></i>
          &nbsp;Tasks
        </button>
      </div>
      <div className="outer-navbar-bottom2">
        <button>
          <Link
            to="/main/notebook"
            style={{ textDecoration: "none", color: "black" }}
          >
            <i className="fas fa-book-open" style={{ color: "gray" }}></i>
            &nbsp;Notebooks
          </Link>
        </button>

        <button>
          <i
            className="fas fa-tag"
            style={{ color: "gray", marginLeft: "1px" }}
          ></i>
          &nbsp;Tags
        </button>
      </div>
    </div>
  );
}

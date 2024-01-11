import "./MainPage.css";
import OuterNavbar from "../OuterNavbar/OuterNavbar";


import { Outlet } from "react-router-dom";

export default function MainPage() {

  return (
    <>
      <div className="main-page-wrapper">
        <OuterNavbar />
        <Outlet />
      </div>
    </>
  );
}

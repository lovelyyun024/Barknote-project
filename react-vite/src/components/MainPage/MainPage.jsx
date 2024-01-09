// import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { thunkLogin } from "../../redux/session";
// import { useState } from "react";
// import { useModal } from "../../context/Modal";
import "./MainPage.css";
import OuterNavbar from "../OuterNavbar/OuterNavbar";

// export default function Main() {
  //   const demoUser2Login = async () => {
  //     const serverResponse = await dispatch(
  //       thunkLogin({
  //         email: "pikachu@aa.io",
  //         password: "password",
  //       })
  //     );

  //     if (serverResponse) {
  //       // setErrors(serverResponse);
  //     } else {
  //       navigate("/landing");
  //     }
  //   };

//   return (
//     <>
//       <p>logout</p>
//     </>
//   );
// }

import { Outlet } from "react-router-dom";

export default function MainPage() {
  return (
    // <OuterNavbar />
    <>
      <div className="main-page-wrapper">
        <OuterNavbar />
        <Outlet />
      </div>
    </>
  );
}

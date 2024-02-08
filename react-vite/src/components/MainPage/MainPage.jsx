import "./MainPage.css";
import OuterNavbar from "../OuterNavbar/OuterNavbar";
import LoadingOverlay from "react-loading-overlay-ts";
import PacmanLoader from "react-spinners/PacmanLoader";
import { connect, useDispatch } from "react-redux";
import { setLoader } from "../../redux/loader";
import { useEffect } from "react";

import { Outlet } from "react-router-dom";



function MainPage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(setLoader(false));
    }, 500);
  }, [dispatch]);

  return (
    <>
      <LoadingOverlay
        active={props.isActive}
        styles={{
          overlay: (base) => ({
            ...base,
            background: "white",
          }),
        }}
        spinner={
          <PacmanLoader
            color="orange"
            cssOverride={{
              marginBottom: "10px",
            }}
          />
        }
        text="Loading..."
      >
        <div className="main-page-wrapper">
          <OuterNavbar />
          <Outlet />
        </div>
      </LoadingOverlay>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isActive: state.loader.isLoading,
  };
};

export default connect(mapStateToProps)(MainPage);

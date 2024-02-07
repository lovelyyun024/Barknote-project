import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { ModalProvider1, Modal1 } from "../context/TagModal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <ModalProvider1>
        <ModalProvider>
          <Navigation />
          {isLoaded && <Outlet />}
          <Modal />
          <Modal1 />
        </ModalProvider>
      </ModalProvider1>
    </>
  );
}

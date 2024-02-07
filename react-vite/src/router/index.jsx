import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Home from "../components/Home";
import MainPage from "../components/MainPage"
import BoardPage from '../components/BoardPage/BoardPage';
import NotebookPage from "../components/NotebookPage/NotebookPage";
import NotePage from "../components/NotePage/NotePage";
import EditNoatePage from "../components/EditNotePage/EditNotePage"
import InnerNavbar from '../components/InnerNavBar/InnerNavBar';
// export const router = createBrowserRouter([
//   {
//     element: <Layout />,
//     children: [
//       {
//         path: "/",
//         element: <h1>Welcome!</h1>,
//       },
//       {
//         path: "login",
//         element: <LoginFormPage />,
//       },
//       {
//         path: "signup",
//         element: <SignupFormPage />,
//       },
//     ],
//   },
// ]);

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      {/* <Route path="/login" element={<LoginFormPage />} />
      <Route path="/signup" element={<SignupFormPage />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/new-server" element={<ServerCreationForm />} />
      <Route path="/join-server" element={<JoinServer />} />
      <Route path="/redirect" element={<Redirect />} />
      <Route path="*" element={<Redirect />} /> */}
      <Route path="/signup" element={<SignupFormPage />} />
      <Route path="/main" element={<MainPage />}>
        {/* <Route
          path="servers/:serverId/channels/:channelId"
          element={<ServerPage />}
        ></Route> */}
        <Route path="board" element={<BoardPage />}></Route>
        <Route path="notebooks" element={<NotebookPage />}></Route>
        <Route
          path="notes"
          element={
            <>
              <InnerNavbar />
              <NotePage />
            </>
          }
        ></Route>
        <Route
          path="tags/:tagId"
          element={
            <>
              <InnerNavbar />
              <NotePage />
            </>
          }
        ></Route>
        <Route path="notes/:noteId" element={<EditNoatePage />}></Route>
      </Route>
      <Route path="*" element={<Home />} />
    </Route>
  )
);

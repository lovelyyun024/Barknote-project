import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Home from "../components/Home";
import Main from "../components/Main"

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
      <Route path="/main" element={<MainPage />}>
        <Route
          path="servers/:serverId/channels/:channelId"
          element={<ServerPage />}
        ></Route>
      </Route>
      <Route path="*" element={<Redirect />} /> */}
      <Route path="/signup" element={<SignupFormPage />} />
      <Route path="/main" element={<Main />} />
    </Route>
  )
);

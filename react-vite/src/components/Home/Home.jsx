import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { thunkLogin } from "../../redux/session";
import { useState } from "react";
import { useModal } from "../../context/Modal";
import "./Home.css";

export default function HomePage() {
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionUser) {
      navigate("/main/board");
    } 
  }, [sessionUser, navigate]);

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [errors, setErrors] = useState({});
   const { closeModal } = useModal();

   const handleSubmit = async (e) => {
     e.preventDefault();

     const serverResponse = await dispatch(
       thunkLogin({
         email,
         password,
       })
     );

     if (serverResponse) {
       setErrors(serverResponse);
     } else {
       closeModal();
     }
   };

  const demoUserLogin = async () => {
    const serverResponse = await dispatch(
      thunkLogin({
        email: "test1@aa.io",
        password: "123456",
      })
    );

    if (serverResponse) {
      // setErrors(serverResponse);
    } else {
      navigate("/main/board");
    }
  };

  return (
    <>
      <div className="home-header">
        <img
          className="home-logo"
          src="https://cdn-icons-png.flaticon.com/512/8708/8708467.png"
        />
        <div className="signin-header">
          <h1>Barkbook</h1>
          <p>Unleash Your Ideas, Fetch Your Thoughts</p>
        </div>
        <div className="home-body">
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="large-input"
            />

            {errors.email && <p>{errors.email}</p>}

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="large-input"
            />

            {errors.password && <p>{errors.password}</p>}
            <button className="large-orange-button" type="submit">
              Sign In
            </button>
          </form>
          <div className="home-or">or</div>
          <div className="divider" />
          <div className="demo-user-wrapper">
            <button className="large-orange-button" onClick={demoUserLogin}>
              Sign In As Demo User
            </button>
          </div>
          <div className="sign-up-wrapper">
            <p>Don&apos;t have an account?</p>
            <Link to="/signup" className="signup-button">
              <p>Create account</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

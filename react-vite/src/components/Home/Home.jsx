import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { thunkLogin } from "../../redux/session";
import { useState } from "react";
import { useModal } from "../../context/Modal";
import shiba from "./shibainu.png";
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
      setErrors(serverResponse);
    } else {
      navigate("/main/board");
    }
  };

  return (
    <>
      <div className="home-page-container">
        <div className="home-wrapper">
          <div className="home-header">
            <img className="home-logo" src={shiba} />
            <div className="signin-header">
              <h1>Barkbook</h1>
              <p>Unleash Your Ideas, Fetch Your Thoughts</p>
            </div>
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

              {errors.email && <span>{errors.email}</span>}

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="large-input"
              />

              {errors.password && <span>{errors.password}</span>}
              <button className="large-orange-button" type="submit">
                Sign In
              </button>
            </form>
            <div className="demo-user-wrapper">
              <div className="home-or">or</div>
              <button className="large-orange-button" onClick={demoUserLogin}>
                Sign In As Demo User
              </button>
            </div>
            <div className="sign-up-wrapper">
              <div style={{ marginBottom: "10px", fontSize: "14px" }}>
                Don&apos;t have an account?
              </div>
              <Link to="/signup" className="signup-button">
                Create account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup, thunkUploadImage } from "../../redux/session";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const validateEmail = (email) => {
    const atPos = email.indexOf("@");
    const dotPos = email.lastIndexOf(".");
    return atPos > 0 && dotPos > atPos + 1 && dotPos < email.length - 1;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorsTemp = {};
    setErrors({});
    if (password.length < 6) {
      errorsTemp = {
        ...errorsTemp,
        password: "Password must be at least 6 characters",
      };
    }

    if (password !== confirmPassword) {
      errorsTemp = {
        ...errorsTemp,
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      };
    }

    if (!validateEmail(email)) {
      errorsTemp = {
        ...errorsTemp,
        email: "Invalid Email Address",
      };
    }

    setErrors(errorsTemp);
    if (Object.keys(errorsTemp).length) return;

    let returnImage;
    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      // aws uploads can be a bit slow—displaying
      // some sort of loading message is a good idea
      returnImage = await dispatch(thunkUploadImage(formData));
    }

    const userData = {
      email,
      username,
      password
    };

    if (returnImage){ 
      userData.img_url = returnImage.url;}

    const serverResponse = await dispatch(thunkSignup(userData));

    if (serverResponse) {
      setErrors(serverResponse);
    } else navigate("/main/board");
  };

  return (
    <>
      <div className="home-page-container">
        <div className="signup-wrapper">
          <div className="home-header">
            <img
              className="home-logo"
              src="https://barkbook-bucket.s3.us-west-2.amazonaws.com/shibainu.png"
              alt="Barkbook Logo"
            />
            <div className="signin-header">
              <h1>Barkbook</h1>
              <p>Unleash Your Ideas, Fetch Your Thoughts</p>
            </div>
          </div>
          <div className="home-body">
            {errors.server && <span className="error-message">{errors.server}</span>}
            <form
              onSubmit={handleSubmit}
              className="login-form"
              encType="multipart/form-data"
            >
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
                className="large-input"
              />

              {errors.email && <span className="error-message">{errors.email}</span>}
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                className="large-input"
              />
              {errors.username && <span className="error-message">{errors.username}</span>}

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="large-input"
              />

              {errors.password && <span className="error-message">{errors.password}</span>}

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
                className="large-input"
              />

              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              <label className="file-upload">
                Profile Photo (optional)
                <div className="signup-file-upload-wrapper">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
              </label>
              {errors.image && <span className="error-message">{errors.image}</span>}
              <button className="large-orange-button" type="submit">
                Sign Up
              </button>
            </form>
            <div className="demo-user-wrapper"></div>
            <div className="sign-up-wrapper">
              <div style={{ marginBottom: "10px", fontSize: "14px" }}>
                Already have an account?
              </div>
              <Link to="/" className="signup-button">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupFormPage;

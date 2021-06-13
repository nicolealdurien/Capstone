import "../../css/AllResetPswdPages.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";


const CustResetPswdPage = ({ history, match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords don't match");
    }

    try {
      const { data } = await axios.put(
        `/auth/customer-reset-password/${match.params.resetToken}`,
        {
          password,
        },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="resetpassword-screen">
      <form
        onSubmit={resetPasswordHandler}
        className="resetpassword-screen__form"
      >
        <h3 className="resetpassword-screen__title">Reset Password</h3>
        {error && <span className="error-message">{error} </span>}
        {success && (
          <span className="success-message">
            {success}!   <Link to="/auth/customer-login" className='post__reset__login__link'>Login</Link>
          </span>
        )}
        <div className="form-group">
          <input type="password" required id="password" placeholder="Enter new password"
            autoComplete="true" value={password} onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input type="password" required id="confirmpassword" placeholder="Confirm new password"
            autoComplete="true" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default CustResetPswdPage;
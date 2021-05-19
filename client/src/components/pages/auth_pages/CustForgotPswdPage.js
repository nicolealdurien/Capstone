import { useState } from "react";
import axios from "axios";
import "../../css/AllForgotPswdPages.css";

const CustForgotPswdPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post('/auth/customer-forgot-password', { email }, config);
      setSuccess(data.data);
    } catch (error) {
        setError(error.response.data.error);
        setEmail("");
        setTimeout(() => {
            setError("");
        }, 5000);
    }
  };

  return (
    <div className="forgotpassword-screen">
      <form onSubmit = {forgotPasswordHandler} className = "forgotpassword-screen__form">
        <h3 className="forgotpassword-screen__title">Forgot Password</h3>
        {error && <span className="error-message">{error}</span>}
        {success && <span className="success-message">{success}</span>}
        <div className="form-group">
          <p className="forgotpassword-screen__subtext">
            Please enter the email address you used when registering for your account. We
            will send a password reset email to this address.
          </p>
          <input type="email" required id="email" placeholder="Email address" value={email}
            onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <button type="submit" className="forgotbutton">
          Send Email
        </button>
      </form>
    </div>
  );
};

export default CustForgotPswdPage;
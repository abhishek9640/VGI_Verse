import { useState } from "react";
import {sendPasswordResetEmail} from 'firebase/auth';
import { auth } from '../firebaseConfig';


const resetPasswordAPI = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true, message: "Password reset email sent. Please check your inbox." };
    } catch (error) {
      // Handle password reset errors
      return { success: false, message: "Password reset failed. Please check your email address." };
    }
  };

  function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);
  
    const handleResetPassword = async () => {
      try {
        const result = await resetPasswordAPI(email);
        if (result.success) {
          setMessage(result.message);
        } else {
          setMessage(result.message);
        }
      } catch (error) {
        // Handle any unexpected errors, e.g., display a generic error message
        console.error("Password reset error:", error);
        setMessage("An error occurred while resetting the password. Please try again later.");
      }
    };
  
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8f9fa"
      }}>
        <div style={{
          maxWidth: "400px",
          width: "100%",
          backgroundColor: "#fff",
          padding: "2em",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          borderRadius: "4px"
        }}>
          <h2 style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "1em"
          }}>Forgot Password</h2>
          <p style={{ textAlign: "center" }}>Enter your email address to reset your password.</p>
          <input type="email"
            style={{
              marginTop: "1em",
              padding: "1em",
              width: "100%",
              borderRadius: "4px",
              border: "1px solid #ddd",
              outline: "none",
              ":focus": {
                outline: "none",
                boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.2)"
              }
            }}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleResetPassword}
            style={{
              width: "100%",
              padding: "1em",
              backgroundColor: "#3490dc",
              color: "#fff",
              borderRadius: "4px",
              cursor: "pointer",
              outline: "none",
              ":hover": {
                backgroundColor: "#277bd8"
              }
            }}
          >
            Reset Password
          </button>
          {message && <p style={{ textAlign: "center", marginTop: "1em" }}>{message}</p>}
        </div>
      </div>
    );
  }
  
  export default ForgotPassword;
  
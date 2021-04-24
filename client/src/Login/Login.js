import { Button } from "@material-ui/core";
import React from "react";
import "./Login.css";
import { auth, provider } from "../firebase";

function Login() {
  const signin = () => {
    console.log(provider);
    auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };
  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://i.pinimg.com/originals/e3/54/65/e354658df9dd581a078b071adad7a030.png"
          alt="Logo"
        />
      </div>
      <Button onClick={signin}>Sign in</Button>
    </div>
  );
}

export default Login;

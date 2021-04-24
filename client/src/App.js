import React, { useEffect } from "react";
import SideBar from "./SideBar/SideBar";
import "./App.css";
import Chat from "./Chat/Chat";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import Login from "./Login/Login";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/userSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("authUser", authUser);
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            email: authUser.email,
            photo: authUser.photoURL,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      {console.log(user)}
      {user ? (
        <>
          {/* //?SideBar */}
          <SideBar />

          {/* //? Chat */}
          <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  getAuth,
} from "firebase/auth";
import app from "../../firebase/firebase.init";
import { useState } from "react";

const Login = () => {
  const [user, setUser] = useState(null);

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const loggedInUser = result.user;
      console.log("User: ", loggedInUser);
      const token = await loggedInUser.getIdToken(true);
      console.log("Token: ", token);
      localStorage.setItem("token", token);
      setUser(loggedInUser);
    } catch (error) {
      console.error("Error during sign-in", error.message);
    }
  };
  const handleSignOut = async () => {
    try {
      const result = await signOut(auth);
      console.log(result);
      setUser(null);
    } catch (error) {
      console.error("Error during sign-out", error.message);
    }
  };

  const fetchData = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.log("No user is signed in");
        return;
      }
      const token = await currentUser.getIdToken(true);
      localStorage.setItem("token", token);
      const response = await fetch("http://localhost:5001/secureData", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Secure data: ", data);
      } else {
        console.log("Failr to fetch secure data:", response.status);
      }
    } catch (error) {
      console.error("Error during fetching secure data", error.message);
    }
  };

  return (
    <div>
      {user ? (
        <>
          <button onClick={handleSignOut}> Sing Out </button>
          <button onClick={fetchData}> See Data </button>
        </>
      ) : (
        <div>
          <button onClick={handleGoogleSignIn}>Google Sign-In</button>
        </div>
      )}
      {user && (
        <div>
          <h3>User: {user.displayName}</h3>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Login;

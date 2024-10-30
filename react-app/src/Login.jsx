import React, { useState, useEffect } from "react";
import {Link, Outlet} from "react-router-dom";
import { auth } from "./config/firestore.js";
import { createUserWithEmailAndPassword,sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import Button from "./Button.jsx";
import Input from "./Input.jsx";
//import { auth, googleProvider, signInWithPopup, signOut } from "./config/firestore.js";

const Login2 = ({setIsLoggedIn,setUser,user}) => {
    //const [user, setUser] = useState(null);
  
    const handleGoogleSignIn = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        setUser(result.user);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error signing in with Google", error);
      }
    };
  
    const handleSignOut = async () => {
      try {
        await signOut(auth);
        setUser(null);
        setIsLoggedIn(false);
      } catch (error) {
        console.error("Error signing out", error);
      }
    };
  
    return (
      <div style={styles.container}>
        {user ? (
          <div style={styles.userInfo}>
            <img src={user.photoURL} alt="User" style={styles.avatar} />
            <h2>Welcome, {user.displayName}!</h2>
            <button onClick={handleSignOut} style={styles.button}>
              Sign Out
            </button>
          </div>
        ) : (
          <button onClick={handleGoogleSignIn} style={styles.button}>
            Sign in with Google
          </button>
        )}
      </div>
    );
  };
  
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f0f2f5",
    },
    userInfo: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      borderRadius: "50%",
      width: "80px",
      height: "80px",
      marginBottom: "20px",
    },
    button: {
      padding: "10px 20px",
      fontSize: "16px",
      cursor: "pointer",
      borderRadius: "5px",
      border: "none",
      backgroundColor: "#4285F4",
      color: "#fff",
    },
  };

function Login({setIsLoggedIn}) {
    //console.log(auth);
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    //console.log(provider);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("")
    useEffect(() => {
        setIsLoggedIn(false);
    },[])
    const handleSignIn = async () => {
        setError("");
        setMessage('');
        try {
            await signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                //console.log(result);
                setIsLoggedIn(true);
            })
            .catch((error) => {
                if (error.code === 'auth/user-not-found') {
                    setError('There no user exist with that email');
                }
    
                else if (error.code === 'auth/invalid-email') {
                    setError('That email address is invalid!');
                }else if(error.code === 'auth/invalid-credential'){
                    setError("Check your username and password");
                }else if(error.code === "auth/network-request-failed"){
                    setError("Protect ya neck! You ain't connected to the internet");
                }else{
                    setError(error.code);
                }

                
            });
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                setError('There no user exist with that email');
            }

            else if (error.code === 'auth/invalid-email') {
                setError('That email address is invalid!');
            }else if(error.code === 'auth/invalid-credential'){
                setError("Check your username and password")
            }else if(error.code === "auth/network-request-failed"){
                setError("Protect ya neck! You ain't connected to the internet");
            }else{
                setError(error.code);
            }
        }
    };

    const handleSignUp = async () => {
        setError("");
        setMessage('');
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                //console.log(result);
                setIsLoggedIn(true);
            })
            .catch((error) => {
                if (error.code === 'auth/user-not-found') {
                    setError('There no user exist with that email');
                }
    
                else if (error.code === 'auth/invalid-email') {
                    setError('That email address is invalid!');
                }else if(error.code === 'auth/email-already-in-use'){
                    setError("This email address is already registered.")
                }else if(error.code === "auth/network-request-failed"){
                    setError("Protect ya neck! You ain't connected to the internet");
                }else{
                    setError(error.code);
                }

            })
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                setError('There no user exist with that email');
            }

            else if (error.code === 'auth/invalid-email') {
                setError('That email address is invalid!');
            }else if(error.code === 'auth/email-already-in-use'){
                setError("This email address is already registered.")
            }else if(error.code === "auth/network-request-failed"){
                setError("Protect ya neck! You ain't connected to the internet");
            }else{
                setError(error.code);
            }
        }
    };

    const handleReset = async () => {
        try {
          await sendPasswordResetEmail(auth, email);
          setMessage('Password reset email sent!');
        } catch (error) {
          setMessage('Error sending reset email: ' + error.message);
        }
      };


    return (
        <div>
        {error && error != "" && <div><p><font color="red">{error}</font></p><br/></div>}
        {message && message != "" && <div><p><font>{message}</font></p><br/></div>}
        <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div><a onClick={handleReset}>Forgot Password</a></div><br/>
        <div className="button-container">
        <Button onClick={handleSignIn} className="btn-accent">Sign In</Button>|||
        <Button onClick={handleSignUp}>Sign Up</Button>
        </div>
        </div>
    );
}

export default Login;
import React, { useState, useEffect } from "react";
import { auth } from "./config/firestore.js";
import Swal from "sweetalert2";
import { createUserWithEmailAndPassword,sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import Button from "./Button.jsx";
import Input from "./Input.jsx";
import getNVPArray from "./functions/getNVPArray.jsx";
import Dropdown from "./Dropdown.jsx";

function Login({setIsLoggedIn, orgs, setOrgId, orgId}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [orgNVP, setOrgNVP] = useState([]);

    useEffect(() => {
        setIsLoggedIn(false);
    },[]);

    useEffect(() => {
      setOrgNVP(getNVPArray(orgs, "name", "id", "name", "value"));
    },[orgs])
    const handleSignIn = async () => {
      if(!email || !password || !orgId){
          return Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Email and Password and Org are required to sign in.',
              showConfirmButton: true,
          });
      }
        setError("");
        setMessage('');
        try {
          await signInWithEmailAndPassword(auth, email, password)
          .then((result) => {
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: `${email} has been signed in successfully!`,
                showConfirmButton: false,
                timer: 1500,
            });
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

              return;
          });
        }catch (error) {
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
          return;
      }
    };

    const handleSignUp = async () => {
        setError("");
        setMessage('');
        if(!email || !password || !orgId){
          return Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Email and Password and Org are required to sign up.',
              showConfirmButton: true,
          });
      }
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                //console.log(result);
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: `${email} has been signed up successfully!`,
                    showConfirmButton: false,
                    timer: 1500,
                });
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
                return;
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
            return;
        }
    };

    const handleReset = async () => {
      if(!email){
          return Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Email is required to reset password.',
              showConfirmButton: true,
          });
      }
        try {
          await sendPasswordResetEmail(auth, email);
          Swal.fire({
              icon: 'success',
              title: 'Sucess!',
              text: `Password reset sent seccuessfully to ${email}`,
              showConfirmButton: false,
          });
        } catch (error) {
          setMessage('Error sending reset email: ' + error.message);
          return;
        }
      };
    


    return (
      <div className="login-page">
        {error && error != "" && <div><p><font color="red">{error}</font></p><br/></div>}
        {message && message != "" && <div><p><font>{message}</font></p><br/></div>}
        <Dropdown placeholder="Select a Team/Organization" options={orgNVP} initialValue={orgId} onChange={(e) => setOrgId(e.target.value)}/>
        <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="button-container">
        <Button onClick={handleSignIn} className="btn-accent">Sign In</Button>|||
        <Button onClick={handleSignUp}>Sign Up</Button>
        </div>
        <br/>
        <div className="a-link"><a onClick={handleReset}>Reset Password</a></div><br/>
        </div>
    );
}

export default Login;
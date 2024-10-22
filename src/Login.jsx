import Input from "./Input.jsx";
import Button from "./Button.jsx";
import { useState } from "react";
export default function Login({setIsLoggedIn, setIsAdmin}){
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");

    function handleLoginClick(){
        if(user == import.meta.env.VITE_USER_LOGIN_ID && password == import.meta.env.VITE_USER_LOGIN_PASSWORD){
            setIsLoggedIn(true);
        }else if(user == import.meta.env.VITE_ADMIN_LOGIN_ID && password == import.meta.env.VITE_ADMIN_LOGIN_PASSWORD){
            setIsLoggedIn(true);
            setIsAdmin(true);
        }else{
            setPassword("");
            setUser("");
        }
    }

    return (<>
        <div>
            <h1>Enter Login Information:</h1>
            <Input placeholder="User ID" value={user} onChange={(e) => setUser(e.target.value)}/>
            <Input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <Button onClick={handleLoginClick}>Login</Button>
        </div>
    </>)

}
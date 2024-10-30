import Input from "./Input.jsx";
import Dropdown from "./Dropdown.jsx";
import Button from "./Button.jsx";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { db } from "./config/firestore.js";
import {doc, setDoc} from "firebase/firestore";
import Home from "./Home.jsx";

function Profile({profile, players, getProfile}) {
    const [playersNVP, setPlayersNVP] = useState([]);
    const [myPlayerId, setMyPlayerId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");


    useEffect(() => {
        let tempPlayersNVP = players.map((p) => {
            return {
                value: p.id,
                name: (`${p.firstName}  ${p.lastName}`)
            }
        });
        setPlayersNVP(tempPlayersNVP);
    },[]);

    useEffect(() => {
        setEmail((profile && profile.email)?profile.email:"");
        setFirstName((profile && profile.firstName)?profile.firstName:"");
        setLastName((profile && profile.lastName)?profile.lastName:"");
        setMyPlayerId((profile && profile.myPlayerId)?profile.myPlayerId:"");
    },[profile])

    const handleUpdateProfileOnClick = async (e) => {
        const updateProfile = {
            email,
            firstName,
            lastName,
            myPlayerId
        };
        try {
            await setDoc(doc(db, "profiles", profile.id), {
            ...updateProfile
        });
        } catch (error) {
            console.log(error)
        }
        getProfile();
        Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: `Your profile has been Updated.`,
            showConfirmButton: false,
            timer: 1500,
        });
    }

    return (<>
        <Input placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}  value={profile.email} readOnly></Input>
        <Input placeholder="First Name" onChange={(e) => {setFirstName(e.target.value)}} value={firstName}></Input>
        <Input placeholder="Last Name" onChange={(e) => {setLastName(e.target.value)}} value={lastName}></Input>
        <Dropdown placeholder="Who is your player?" onChange={(e) => {setMyPlayerId(e.target.value)}}  value={myPlayerId} options={playersNVP} initialValue={myPlayerId}/ >
        <Button onClick={handleUpdateProfileOnClick} >Update Profile</Button>
    </>)
}

export default Profile
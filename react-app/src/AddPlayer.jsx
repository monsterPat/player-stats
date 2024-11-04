import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import AgeSelector from "./AgeSelector.jsx";
import Swal from "sweetalert2";
import { db } from "./config/firestore.js";
import {collection, addDoc} from "firebase/firestore";

export default function AddPlayer({players, getPlayers}){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState(null);
    const [team, setTeam] = useState("");

    const navigate = useNavigate();

    const handleAddPlayerOnClick = async (e) => {
        if(!firstName || !lastName || !age || !team){
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true,
            });
        }
        const newPlayer = {
            firstName,
            lastName,
            age,
            team, 
            'imgId': players.length+1
        };
        try {
            await addDoc(collection(db, "players"), {
            ...newPlayer
        });
        } catch (error) {
            console.log(error)
        }
        //setPlayers([...players, {...newPlayer}]);
        getPlayers();
        Swal.fire({
            icon: 'success',
            title: 'Added!',
            text: `${firstName} ${lastName} has been Added.`,
            showConfirmButton: false,
            timer: 1500,
        });
        navigate("/players");
    }
    return (
    <div className="container-page">
        <Input placeholder="First Name" onChange={(e) => {setFirstName(e.target.value)}} required></Input>
        <Input placeholder="Last Name" onChange={(e) => {setLastName(e.target.value)}} required></Input>
        <AgeSelector placeholder="Age" onChange={(e) => {setAge(Number.parseInt(e.target.value))}} required></AgeSelector>
        <Input placeholder="Team" onChange={(e) => {setTeam(e.target.value)}} required></Input>
        <br/>
        <Button onClick={handleAddPlayerOnClick} >Add Player</Button><>|||</>
        <Button onClick={() => navigate("/players")} className="btn-accent" >Cancel</Button>
    </div>)
}
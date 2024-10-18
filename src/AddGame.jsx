import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import AgeSelector from "./AgeSelector.jsx";
import Dropdown from "./Dropdown.jsx";
import Swal from "sweetalert2";
import { db } from "./config/firestore.js";
import {collection, addDoc} from "firebase/firestore";

export default function AddGame({leagues, getGames}){
    const [name, setName] = useState("");
    const [leagueId, setLeagueId] = useState("");
    const [gameDate, setGameDate] = useState(new Date());
    const [leaguesNVP, setLeaguesNVP] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let tempLeaguesNVP = leagues.map((l) => {
            return {
                value: l.id,
                name: l.name
            }
        });
    
        setLeaguesNVP(tempLeaguesNVP);
    },[]);
    

    const handleAddGameOnClick = async (e) => {
        if(!name || !leagueId || !gameDate){
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true,
            });
        }
        console.log(gameDate);
        const newGame = {
            name,
            leagueId,
            date: gameDate
        };
        try {
            await addDoc(collection(db, "games"), {
            ...newGame
        });
        } catch (error) {
            console.log(error)
        }
        //setPlayers([...players, {...newPlayer}]);
        getGames();
        Swal.fire({
            icon: 'success',
            title: 'Added!',
            text: `${name} has been Added.`,
            showConfirmButton: false,
            timer: 1500,
        });
        navigate("/games");
    }
    return (
    <div>
        <Dropdown placeholder="Select a League" onChange={(e) => {setLeagueId(e.target.value)}} options={leaguesNVP} initialValue={leagueId}/ >
        <Input placeholder="Name" onChange={(e) => {setName(e.target.value)}} required></Input>
        <Input placeholder="Date"  type="date" onChange={(e) => {setGameDate(new Date(e.target.value))}} required></Input>
        <br/>
        <Button onClick={handleAddGameOnClick} >Add Game</Button><>|||</>
        <Button onClick={() => navigate("/games")} >Cancel</Button>
    </div>)
}
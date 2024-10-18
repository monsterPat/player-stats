import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import Dropdown from "./Dropdown.jsx";
import Swal from "sweetalert2";
import { db } from "./config/firestore.js";
import {doc, setDoc} from "firebase/firestore";

export default function EditGame({leagues, getGames, onGetGame}){
    const params = useParams();
    const game = onGetGame(params.id);
    console.log(game);
    const [name, setName] = useState(game.name);
    const [leagueId, setLeagueId] = useState(game.leagueId);
    const [gameDate, setGameDate] = useState(game.date.toDate().toLocaleDateString('en-CA'));
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
    

    const handleSaveGameOnClick = async (e) => {
        if(!name || !leagueId || !gameDate){
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true,
            });
        }
        const editGame = {
            name,
            leagueId,
            date: new Date(gameDate)
        };
        try {
            await setDoc(doc(db, "games", game.id), {
            ...editGame
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
        <Dropdown placeholder="Select a League" onChange={(e) => {setLeagueId(e.target.value)}}  value={leagueId} options={leaguesNVP} initialValue={leagueId}/ >
        <Input placeholder="Name" onChange={(e) => {setName(e.target.value)}} value={name} required></Input>
        <Input placeholder="Date"  type="date" onChange={(e) => {setGameDate(new Date(e.target.value).toLocaleDateString('en-CA'));}} value={gameDate} required></Input>
        <br/>
        <Button onClick={handleSaveGameOnClick} >Update Game</Button><>|||</>
        <Button onClick={() => navigate("/games")} >Cancel</Button>
    </div>)
}
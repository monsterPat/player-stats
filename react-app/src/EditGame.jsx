import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import Dropdown from "./Dropdown.jsx";
import Swal from "sweetalert2";
import { db } from "./config/firestore.js";
import {doc, setDoc} from "firebase/firestore";
import dayjs from "dayjs";
import MultiSelect2 from "./MultiSelect.jsx";

export default function EditGame({leagues, getGames, onGetGame, players}){
    const params = useParams();
    const game = onGetGame(params.id);
    const [name, setName] = useState(game.name);
    const [leagueId, setLeagueId] = useState(game.leagueId);
    const [gameDate, setGameDate] = useState((new dayjs(game.date.toDate()).toDate()).toLocaleDateString('en-CA'));
    const [leaguesNVP, setLeaguesNVP] = useState([]);
    const [playersNVP, setPlayersNVP] = useState([]);
    const [outcome, setOutcome] = useState(game.outcome? game.outcome:"");
    const [score, setScore] = useState(game.score? game.score:"");
    const [medalWinners, setMedalWinners] = useState(game.medalWinners? game.medalWinners: []);
    const [isLive, setIsLive] = useState((game && game.isLive)? true: false);
    const navigate = useNavigate();
    
    useEffect(() => {
        let tempLeaguesNVP = leagues.map((l) => {
            return {
                value: l.id,
                name: l.name
            }
        });
    
        setLeaguesNVP(tempLeaguesNVP);
        //setMedalWinners(['H2MGjNboF0MjugiuQRjQ','epzcnHukxLfXBw27Us2F'])
        let tempPlayersNVP = players.map((p) => {
            return {
                value: p.id,
                label: (`${p.firstName}  ${p.lastName}`)
            }
        });
    
        setPlayersNVP(tempPlayersNVP);
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
        const tempD = new dayjs(gameDate);
        const editGame = {
            name,
            leagueId,
            outcome,
            score,
            date: tempD.toDate(),
            isLive,
            medalWinners: medalWinners
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
            title: 'Updated!',
            text: `${name} has been Updated.`,
            showConfirmButton: false,
            timer: 1500,
        });
        navigate("/games");
    }

    const handleSelectionChange = (selectedValues) => {
        setMedalWinners(selectedValues);
      };
    const handleIsLiveChange = () => {
        setIsLive(!isLive);
    }
    return (
    <div>
        <Dropdown placeholder="Select a League" onChange={(e) => {setLeagueId(e.target.value)}}  value={leagueId} options={leaguesNVP} initialValue={leagueId}/ >
        <Input placeholder="Name" onChange={(e) => {setName(e.target.value)}} value={name} required></Input>
        <Input placeholder="Date"  type="date" onChange={(e) => {
                const tempDayJS = new dayjs(e.target.value,"MM-DD-YYY")
                setGameDate(tempDayJS.toDate().toLocaleDateString('en-CA'))
                }
            } value={gameDate} required></Input>
        <br/>
        <Input placeholder="Is Live?" type="checkbox" checked={isLive} onChange={handleIsLiveChange}/>
        <Dropdown placeholder="Select Outcome" onChange={(e) => {setOutcome(e.target.value)}}  value={outcome} options={[{name: "Win", value: "Win"},{name:"Loss", value:"Loss"}]} initialValue={outcome}/ >
        <Input placeholder="Score" onChange={(e) => {setScore(e.target.value)}} value={score} required></Input> 
        <MultiSelect2 placeholder="Medal Winners" options={playersNVP} value={medalWinners} onChange={handleSelectionChange}/ >
        <Button onClick={handleSaveGameOnClick} >Update Game</Button><>|||</>
        <Button className="btn-accent" onClick={() => navigate("/games")} >Cancel</Button>
    </div>)
}
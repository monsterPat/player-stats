import {useState, useEffect} from "react";
import getData from "./getData.js";
import Dropdown from "./Dropdown.jsx";
import StatCounter from "./StatCounter.jsx";
import Button from "./Button.jsx";
export default function StatTracker({games, players, leagues}){
    const {getStats} = getData();
    const [stats, setStats] = useState([]);
    const [playerId, setPlayerId] = useState(1);
    const [gameId, setGameId] = useState(1);
    const [leagueId, setLeagueId] = useState(1);
    const [leaguesNVP, setLeaguesNVP] = useState([]);
    const [gamesNVP, setGamesNVP] = useState([]);
    const [playersNVP, setPlayersNVP] = useState([]);
    const [isTracking, setIsTracking] = useState(false);
    //console.log(players);
    useEffect(() => {
        const liveStats = getStats();
        //console.log(liveStats)
        setStats(liveStats.filter((s) => s.playerId == playerId));
    }, [playerId]);

    useEffect(() => {
        let leagueGames = games.filter((g) => g.leagueId == leagueId)
        let tempNVP = leagueGames.map((g) => {
            return {
                value: g.id,
                name: g.name
            }
        });
        setGamesNVP(tempNVP);

    },[leagueId]);

    useEffect(() => {
        let tempPlayersNVP = players.map((p) => {
            return {
                value: p.id,
                name: `${p.firstName} ${p.lastName}`
            }
        });

        let tempLeaguesNVP = leagues.map((l) => {
            return {
                value: l.id,
                name: l.name
            }
        });

        setPlayersNVP(tempPlayersNVP);
        setLeaguesNVP(tempLeaguesNVP);

    },[])

    function handleOnPlayerChange(e){
        setPlayerId(e.target.value);
    }
    function handleOnLeagueChange(e){
        setLeagueId(e.target.value);
    }
    function handleOnGameChange(e){
        setGameId(e.target.value);
    }
    function handleStatTrackOnClick(){
        //console.log("now we are tracking!!!!");
        setIsTracking(true);
    }
    function handleSwitchOnClick(){
        //console.log("now we are tracking!!!!");
        setIsTracking(false);
    }
    

    return (<>

        { !isTracking && (<>
            <Dropdown placeholder="Select a Player" options={playersNVP} initialValue={playerId} onChange={handleOnPlayerChange}/>
            <Dropdown placeholder="Select a League" options={leaguesNVP} initialValue={leagueId} onChange={handleOnLeagueChange}/>
            <Dropdown placeholder="Select a Game" options={gamesNVP} initialValue={gameId} onChange={handleOnGameChange}/>
            <Button onClick={handleStatTrackOnClick}>Start Tracking!</Button>
        </>)}

        {isTracking && (<>
            <h1>Tracking {players.find((p) => p.id == playerId).firstName} {players.find((p) => p.id == playerId).lastName} for {leagues.find((l) => l.id == leagueId).name} - {games.find((g) => g.id == gameId).name}</h1>
            <Button onClick={handleSwitchOnClick}>Switch Player/Game</Button>
            <StatCounter label="Points"/>
            <StatCounter label="Rebounds"/>
            <StatCounter label="Steals"/>
            <StatCounter label="Assists"/>
            <Button onClick={handleSwitchOnClick}>Switch Player/Game</Button>
        </>)}
    </>);
}
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
    const [liveStat, setLiveStat] = useState({})
    
    useEffect(() => {
        setStats(getStats());
    },[])

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
        setIsTracking(true);
        let liveStats = [];
        liveStats = stats.filter((s) => (s.playerId == playerId && s.gameId == gameId ));<q></q>
        if(!liveStats || liveStats.length == 0){
            liveStats = [
                {
                    id: stats.length + 1, 
                    playerId: playerId, 
                    gameId: gameId,
                    points: 0,
                    steals: 0,
                    assists: 0,
                    rebounds: 0
                }
            ]
            setStats([...stats, liveStats[0]]);
        }
        setLiveStat(liveStats[0]);
    }
    function handleSwitchOnClick(){
        //console.log("now we are tracking!!!!");
        setIsTracking(false);
    }
    function handleStatAdd(stat, statType){
        stat[statType]= stat[statType]+1;
        setLiveStat(stat);
        setStats(stats.map((s) => {
            if(s.id == stat.id){
                return stat;
            }
            return s;
        }))
    }
    function handleStatSubtract(stat, statType){
        stat[statType]= stat[statType]-1;
        setLiveStat(stat);
        setStats(stats.map((s) => {
            if(s.id == stat.id){
                return stat;
            }
            return s;
        }))
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
            <StatCounter label="Points" onStatSubtract={handleStatSubtract} onStatAdd={handleStatAdd} initialValue={liveStat.points} stat={liveStat} statType="points"/>
            <StatCounter label="Rebounds" onStatSubtract={handleStatSubtract} onStatAdd={handleStatAdd} initialValue={liveStat.rebounds} stat={liveStat} statType="rebounds"/>
            <StatCounter label="Steals" onStatSubtract={handleStatSubtract} onStatAdd={handleStatAdd} initialValue={liveStat.steals} stat={liveStat} statType="steals"/>
            <StatCounter label="Assists" onStatSubtract={handleStatSubtract} onStatAdd={handleStatAdd} initialValue={liveStat.assists} stat={liveStat} statType="assists"/>
            <Button onClick={handleSwitchOnClick}>Switch Player/Game</Button>
        </>)}
    </>);
}
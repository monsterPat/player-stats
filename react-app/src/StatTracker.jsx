import {useState, useEffect} from "react";
//import getData from "./getData.js";
import Dropdown from "./Dropdown.jsx";
import StatCounter from "./StatCounter.jsx";
import Button from "./Button.jsx";
import { collection, getDocs, setDoc, doc, addDoc} from "firebase/firestore";
import { db } from "./config/firestore.js";
import Swal from "sweetalert2";
import TeamStatTracker from "./TeamStatTracker.jsx";

export default function StatTracker({games, players, leagues, profile}){
    const [stats, setStats] = useState([]);
    const [playerId, setPlayerId] = useState((profile && profile.myPlayerId)?profile.myPlayerId:"");
    const [gameId, setGameId] = useState("");
    const [leagueId, setLeagueId] = useState("");
    const [leaguesNVP, setLeaguesNVP] = useState([]);
    const [gamesNVP, setGamesNVP] = useState([]);
    const [playersNVP, setPlayersNVP] = useState([]);
    const [isTracking, setIsTracking] = useState(false);
    const [liveStat, setLiveStat] = useState({});
    const [liveStats,setLiveStats] = useState([]);
    const [isNewStat, setIsNewStat] = useState(false);
    const [isTeam, setIsTeam] = useState(false);
    const [teamClass, setTeamClass] = useState("div-tab");
    const [singlePlayerClass, setSinglePlayerClass] = useState("tab-active div-tab");


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
        if(leagueId == "" || gameId ==""){
            const liveGame = games.find((g) => g.isLive);
            if(liveGame){
                setLeagueId(liveGame.leagueId);
                setGameId(liveGame.id);
            }
        }

    },[])

    useEffect(() => {
        getStats();
    },[isTracking])

    function handleOnPlayerChange(e){
        setPlayerId(e.target.value);
    }
    function handleOnLeagueChange(e){
        setLeagueId(e.target.value);
    }
    function handleOnGameChange(e){
        setGameId(e.target.value);
    }
    const getStats = async () => {
        try{
            const querySnapshot = await getDocs(collection(db, "stats"));
            const tempStats = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            setStats(tempStats);
        } catch (error){
            console.log(error);
        }
      }
    function handleStatTrackOnClick(){
        if((!playerId || playerId == "" || playerId==1) || (!leagueId || leagueId == ""|| leagueId==1)|| (!gameId || gameId == "" || gameId==1)){
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Make sure you have a player, game and league selected.',
                showConfirmButton: true,
            });
        }
        setIsTracking(true);
        setIsNewStat(false);
        let tempLiveTeamStats = [];
        let tempLivePlayerStats =[];
        tempLivePlayerStats = stats.filter((s) => (s.playerId == playerId && s.gameId == gameId ));
        tempLiveTeamStats = stats.filter((s) => (s.gameId == gameId ));
        if(!tempLivePlayerStats || tempLivePlayerStats.length == 0){
            setIsNewStat(true);
            tempLivePlayerStats = [
                {
                    //id: stats.length + 1, 
                    playerId: playerId, 
                    gameId: gameId,
                    points: 0,
                    steals: 0,
                    assists: 0,
                    rebounds: 0
                }
            ]
        }
        setLiveStat(tempLivePlayerStats[0]);
        setLiveStats(tempLiveTeamStats);
    }
    const handleSwitchOnClick = async() => {
        try {
            if(!isNewStat){
                await setDoc(doc(db, "stats", liveStat.id), {
                    ...liveStat
                })
            }else{
                await addDoc(collection(db, "stats"), {
                    ...liveStat
                })
            }
        } catch (error) {
            console.log(error)
        }
        //setPlayers([...players, {...newPlayer}]);
        getStats();
        Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: `Stats have been Updated.`,
            showConfirmButton: false,
            timer: 1500,
        });
        setIsTracking(false);
    }
    function handleStatAdd(stat, statType, num){
        stat[statType]= stat[statType]+num;
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

    function handleSetLiveGame(){
        const liveGame = games.find((g) => g.isLive);
        if(liveGame){
            setLeagueId(liveGame.leagueId);
            setGameId(liveGame.id);
        }
        setPlayerId((profile && profile.myPlayerId)?profile.myPlayerId:"");
        
    }

    function switchTabs(tab){
        if(tab == "Single"){
          setIsTeam(false);
          setSinglePlayerClass("tab-active div-tab");
          setTeamClass("div-tab");
        }else{
          setIsTeam(true);
          setSinglePlayerClass("div-tab");
          setTeamClass("tab-active div-tab");
        }
      }
    
    return (<div className="container-page">
        <div className="tabs">
          <ul>
        <li>
            <div className={singlePlayerClass} style={{"cursor":"pointer"}} onClick={() => switchTabs("Single")}>
                Single Player
            </div>
            <div className={teamClass} style={{"cursor":"pointer"}} onClick={() => switchTabs("Team")}>
                Full Team
            </div>
            { !isTracking && (<div>
                <br/><br/>
                <Button onClick={handleSetLiveGame}>Set Live Game</Button>
                <br/><br/>
                <Dropdown placeholder="Select a Player" options={playersNVP} initialValue={playerId} onChange={handleOnPlayerChange}/>
                <Dropdown placeholder="Select a League" options={leaguesNVP} initialValue={leagueId} onChange={handleOnLeagueChange}/>
                <Dropdown placeholder="Select a Game" options={gamesNVP} initialValue={gameId} onChange={handleOnGameChange}/>
                <Button onClick={handleStatTrackOnClick}>Start Tracking!</Button>
            </div>)}
            {!isTeam && isTracking && (
                <div>
                    <br/><br/>
                    <h3><b>Tracking:</b> {players.find((p) => p.id == playerId).firstName} {players.find((p) => p.id == playerId).lastName}</h3>
                    <h3><b>League:</b> {leagues.find((l) => l.id == leagueId).name}</h3>
                    <h3><b>Game:</b> {games.find((g) => g.id == gameId).name}</h3>
                    <br/>
                    <hr/>
                    <hr/>
                    <StatCounter label="Points" onStatSubtract={handleStatSubtract} onStatAdd={handleStatAdd} initialValue={liveStat.points} stat={liveStat} statType="points"/>
                    <StatCounter label="Rebounds" onStatSubtract={handleStatSubtract} onStatAdd={handleStatAdd} initialValue={liveStat.rebounds} stat={liveStat} statType="rebounds"/>
                    <StatCounter label="Steals" onStatSubtract={handleStatSubtract} onStatAdd={handleStatAdd} initialValue={liveStat.steals} stat={liveStat} statType="steals"/>
                    <StatCounter label="Assists" onStatSubtract={handleStatSubtract} onStatAdd={handleStatAdd} initialValue={liveStat.assists} stat={liveStat} statType="assists"/>
                    <br/>
                    <Button onClick={handleSwitchOnClick}>Save Stats</Button>|||
                    <Button onClick={() => setIsTracking(false)} className="btn-accent">Cancel</Button>
                </div>)}
                {isTracking && isTeam && (<TeamStatTracker leagues={leagues} players={players} stats={liveStats} leagueId={leagueId} />)}
        </li>
        </ul>
        </div>
    </div>);
}
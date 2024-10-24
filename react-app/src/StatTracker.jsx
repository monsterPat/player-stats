import {useState, useEffect} from "react";
//import getData from "./getData.js";
import Dropdown from "./Dropdown.jsx";
import StatCounter from "./StatCounter.jsx";
import Button from "./Button.jsx";
import { collection, getDocs, setDoc, doc, addDoc} from "firebase/firestore";
import { db } from "./config/firestore.js";
import Swal from "sweetalert2";

export default function StatTracker({games, players, leagues}){
    //const {getStats} = getData();
    const [stats, setStats] = useState([]);
    const [playerId, setPlayerId] = useState(1);
    const [gameId, setGameId] = useState(1);
    const [leagueId, setLeagueId] = useState(1);
    const [leaguesNVP, setLeaguesNVP] = useState([]);
    const [gamesNVP, setGamesNVP] = useState([]);
    const [playersNVP, setPlayersNVP] = useState([]);
    const [isTracking, setIsTracking] = useState(false);
    const [liveStat, setLiveStat] = useState({});
    const [isNewStat, setIsNewStat] = useState(false);
    
    /*useEffect(() => {
        setStats(getStats());
    },[])*/

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
        setIsTracking(true);
        setIsNewStat(false);
        let liveStats = [];
        liveStats = stats.filter((s) => (s.playerId == playerId && s.gameId == gameId ));
        if(!liveStats || liveStats.length == 0){
            setIsNewStat(true);
            liveStats = [
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
        setLiveStat(liveStats[0]);
    }
    const handleSwitchOnClick = async() => {
        //console.log("now we are tracking!!!!");
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
            <StatCounter label="Points" onStatSubtract={handleStatSubtract} onStatAdd={handleStatAdd} initialValue={liveStat.points} stat={liveStat} statType="points"/>
            <StatCounter label="Rebounds" onStatSubtract={handleStatSubtract} onStatAdd={handleStatAdd} initialValue={liveStat.rebounds} stat={liveStat} statType="rebounds"/>
            <StatCounter label="Steals" onStatSubtract={handleStatSubtract} onStatAdd={handleStatAdd} initialValue={liveStat.steals} stat={liveStat} statType="steals"/>
            <StatCounter label="Assists" onStatSubtract={handleStatSubtract} onStatAdd={handleStatAdd} initialValue={liveStat.assists} stat={liveStat} statType="assists"/>
            <Button onClick={handleSwitchOnClick}>Save Stats</Button>|||
            <Button onClick={() => setIsTracking(false)} className="btn-accent">Cancel</Button>
        </>)}
    </>);
}
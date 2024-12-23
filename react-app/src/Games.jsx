import {Link, Outlet} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import ResponsiveTable from "./ResponsiveTable";
import { useState, useEffect } from "react";
import Dropdown from "./Dropdown.jsx";
import sortArray from "./functions/sortArray.jsx";
import { FaArrowRight } from "react-icons/fa";

export default function Games({games, onGetLeague, onGetPlayer, leagues, isAdmin, isManage, title}) {
    const [gameData, setGameData] = useState([]);
    const [leagueId, setLeagueId] = useState("");
    const [leaguesNVP, setLeaguesNVP] = useState([]);
    const gameColumns = [

        {
            name: "Name",
            width: "25%"
        },
        {
            name: "Date",
            width: "25%"
        },
        {
            name: "Other Details",
            width: "40%"
        },
        {
            name: "Actions",
            width: "10%"
        }
    ];


    useEffect(() => {
        let tempLeaguesNVP = leagues.map((l) => {
            return {
                value: l.id,
                name: l.name
            }
        });
        setLeaguesNVP(tempLeaguesNVP);
        const storedLeagueId = localStorage.getItem("leagueId");
        if(storedLeagueId && storedLeagueId != undefined && storedLeagueId !=""){
            setLeagueId(storedLeagueId);
        }else if(!storedLeagueId || !leagueId || leagueId === ""){
            setLeagueId((leagues && leagues[0])? leagues[0].id:"");
            localStorage.setItem("leagueId", (leagues && leagues[0])? leagues[0].id:"");
        }
    },[leagues]);

    useEffect(() => {
        const tempGames = sortArray(games.filter((g)=> g.leagueId === leagueId), [{name: "date"},{name: "name"}]);
        const tempGameData = tempGames.map((g) => {
                return ({
                    name: g.name,
                    date: g.date.toDate().toLocaleDateString("en-US", options),
                    outcome: displayOutcome(g),
                    actions: (
                        <Link to={`/game/${g.id}`} className="btn">
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Link>
                    )
                });
        });
        setGameData(tempGameData);
    },[leagueId]);

    useEffect(() => {
        const storedLeagueId = localStorage.getItem("leagueId");
        if(storedLeagueId && storedLeagueId != undefined && storedLeagueId !=""){
            setLeagueId(storedLeagueId);
        }else if(!storedLeagueId || !leagueId || leagueId === ""){
            setLeagueId((leagues && leagues[0])? leagues[0].id:"");
            localStorage.setItem("leagueId", (leagues && leagues[0])? leagues[0].id:"");
        }
    },[]);

    function handleOnLeagueChange(e){
        setLeagueId(e.target.value);
        localStorage.setItem("leagueId", e.target.value);
    }
    function displayMedalWinners(g){
        games = sortArray(games, [{name: "date"},{name: "name"}]);
        let winnerText = "";
        if(g.medalWinners){
            winnerText = g.medalWinners.reduce((fullText, p)=> {
                const tempPlayer = onGetPlayer(p.value);
                return (`${fullText} ${tempPlayer.firstName} ${tempPlayer.lastName},`)
            },"");
            winnerText = winnerText.substring(0,winnerText.length-1);
        }else{
            winnerText = "No Medals"
        }

        return winnerText;

    }
    function displayOutcome(g){
        if(g && g.outcome && g.outcome != ""){
            const medalWinners = displayMedalWinners(g);
            return (<>
                <b>Outcome:</b> {g.outcome}<br/>
                <b>Score:</b> {g.score}<br/>
                <b>Medal Winners:</b> {medalWinners}

            </>);

        }
        return <>N/A</>;
    }

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return (
    <div className={!isManage?"container-page":""}>
        <>
        {!isManage && <Dropdown placeholder="Select a League" options={leaguesNVP} initialValue={leagueId} onChange={handleOnLeagueChange}/>}
        {isAdmin && !isManage && <div className="a-link"><Link to={`/league/${leagueId}`}>Manage League <FaArrowRight /></Link></div>}
        <ResponsiveTable title={title} data={gameData} columnHeaders={gameColumns}/>
        </>
        <br/>
        {isAdmin && <div className="a-link"><Link to={`/${leagueId}/addGame`}>Add Game <FaArrowRight /></Link></div>}
    </div>
    )
}
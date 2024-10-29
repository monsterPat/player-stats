import {Link, Outlet} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import ResponsiveTable from "./ResponsiveTable";
import { useState, useEffect } from "react";
import Dropdown from "./Dropdown.jsx";

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
        if(!leagueId || leagueId === ""){
            setLeagueId((leagues && leagues[0])? leagues[0].id:"");
        }
    },[leagues]);

    useEffect(() => {
        const tempGames = games.filter((g)=> g.leagueId === leagueId);
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
        })

        setGameData(tempGameData);
    },[leagueId])

    function handleOnLeagueChange(e){
        setLeagueId(e.target.value);
    }
    function displayMedalWinners(g){
        games.sort((a,b) => {
            const tempLeagueA = onGetLeague(a.leagueId);
            const tempLeagueB = onGetLeague(b.leagueId);
            if (tempLeagueA.name !== tempLeagueB.name) {
                return tempLeagueA.name.localeCompare(tempLeagueB.name);
              } else {
                return a.name.localeCompare(b.name);;
              }

        })
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
    <div>
        <div>
        {!isManage && <Dropdown placeholder="Select a League" options={leaguesNVP} initialValue={leagueId} onChange={handleOnLeagueChange}/>}
        {isAdmin && !isManage && <Link to={`/league/${leagueId}`}>Manage League</Link>}
        <ResponsiveTable title={title} data={gameData} columnHeaders={gameColumns}/>
        </div>
        <br/>
        {isAdmin && isManage && <Link to={`/${leagueId}/addGame`}>Add Game</Link>}
    </div>
    )
}
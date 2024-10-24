import {Link, Outlet} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import ResponsiveTable from "./components/table/ResponsiveTable";
import { useState, useEffect } from "react";

export default function Games({games, onGetLeague, onGetPlayer}) {
    const [gameData, setGameData] = useState([]);
    const gameColumns = [
        {
            name: "League",
            width: "20%"
        },
        {
            name: "Name",
            width: "20%"
        },
        {
            name: "Date",
            width: "20%"
        },
        {
            name: "Other Details",
            width: "20%"
        },
        {
            name: "Actions",
            width: "10%"
        }
    ];

    useEffect(() => {
        const tempGameData = games.map((g) => {
            return ({
                league: onGetLeague(g.leagueId).name,
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
    },[]);

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
        <ResponsiveTable title="Your Games" data={gameData} columnHeaders={gameColumns}/>
        </div>
        <br/>
        <Link to="/addGame">Add Game</Link>
    </div>
    )
}
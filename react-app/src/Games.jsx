
import Button from "./Button.jsx";
import {Link, Outlet} from "react-router-dom";
import { config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export default function Games({games, onGetLeague, onGetPlayer}) {

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
    <div className="cart-layout">
        <div>
        <h1>Your Games</h1>
        {games.length === 0 && (
            <p>You do not have any games to display.</p>
        )}
        {games.length > 0 && (
            <>
            <table className="table table-cart">
                <thead>
                <tr>
                    <th width="20%">League</th>
                    <th width="20%">Name</th>
                    <th width="20%">Date</th>
                    <th width="30%">Other Details</th>
                    <th width="10%">Actions</th>
                </tr>
                </thead>
                <tbody>
                {games.map((g) => {
                    return (
                    <tr key={g.id}>
                        <td>{onGetLeague(g.leagueId).name}</td>
                        <td>{g.name}</td>
                        <td>{g.date.toDate().toLocaleDateString("en-US", options)}</td>
                        <td>{displayOutcome(g)}</td>
                        <td>
                            <Link to={`/game/${g.id}`} className="btn">
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </Link>
                            
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
            </>
        )}
        </div>
        <br/>
        <Link to="/addGame">Add Game</Link>
    </div>

    )
}
//new Date(g.date).toLocaleDateString("en-US", options)
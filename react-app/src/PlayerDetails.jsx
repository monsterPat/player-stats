import {useOutletContext, } from "react-router-dom";
import Button from "./Button.jsx";
import {Link} from "react-router-dom";

export default function PlayerDetails({onGetPlayer, playerId}){
    const player = ((!useOutletContext() || useOutletContext() == "" )&&  playerId && playerId != "")?onGetPlayer(playerId):useOutletContext();
    const tempPlayerId= useOutletContext()? useOutletContext().id: playerId;
    const editPlayerNav = `/player/${tempPlayerId}/editPlayer`;
    return (<>

    <div className="playerInfo">
        <h2>Profile</h2>
        <div className="attribute">
            <strong>Name:</strong> {`${player.firstName} ${player.lastName}`}
        </div>
        <div className="attribute">
            <strong>Age:</strong> None of you business
        </div>
        <div className="attribute">
            <strong>Team:</strong> {player.team}
        </div>
        <Link to={editPlayerNav} className="btn">Edit Player Profile</Link>

    </div>


    </>);
}
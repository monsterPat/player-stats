import {useOutletContext} from "react-router-dom";
import Button from "./Button.jsx";
import {Link} from "react-router-dom";

export default function PlayerDetails({onGetPlayer}){
    //const params = useParams();
    //console.log(params.id);
    //console.log(onGetPlayer);
    const player = useOutletContext();
    return (<>

    <div className="playerInfo">

        <h1>Profile</h1>
        <div className="attribute">
            <strong>Name:</strong> {`${player.firstName} ${player.lastName}`}
        </div>
        <div className="attribute">
            <strong>Age:</strong> {player.age}
        </div>
        <div className="attribute">
            <strong>Team:</strong> {player.team}
        </div>
        <Link to="editPlayer" className="btn">Edit Player Profile</Link>

    </div>


    </>);
}
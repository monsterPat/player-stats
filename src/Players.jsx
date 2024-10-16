
import Button from "./Button.jsx";
import {Link, Outlet} from "react-router-dom";
import { config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export default function Players({players}) {
    config.autoAddCss = false;

    //return (<><h1>Hello Team</h1><br/><Button onClick={handleOnClick}>Pay</Button></>);
    //console.log("rerendering players");
    //console.log(players);

    return (
    <div className="cart-layout">
        <div>
        <h1>Your Players</h1>
        {players.length === 0 && (
            <p>You do not have any players to display.</p>
        )}
        {players.length > 0 && (
            <>
            <table className="table table-cart">
                <thead>
                <tr>
                    <th width="20%">First Name</th>
                    <th width="20%">Last Name</th>
                    <th width="15%">Age</th>
                    <th width="15%" >Team</th>
                    <th width="30%" >Actions</th>
                </tr>
                </thead>
                <tbody>
                {players.map((p) => {
                    return (
                    <tr key={p.id}>
                        <td>{p.firstName}</td>
                        <td>{p.lastName}</td>
                        <td>{p.age}</td>
                        <td>
                        <strong>{p.team}</strong>
                        </td>
                        <td>
                            <Link to="/addPlayer" className="btn">
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </Link>
                            <Link to={`/player/${p.id}`} className="btn">
                                <FontAwesomeIcon icon={faCircleInfo} />
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
        <Link to="/addPlayer">Add Player</Link>
    </div>

    )
}

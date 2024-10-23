
import {Link, Outlet} from "react-router-dom";
import Button from "./Button.jsx";
import { config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export default function Players({players, setIsAdding}) {
    config.autoAddCss = false;
    
    players.sort((a,b) => a.firstName.localeCompare(b.firstName));

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
                    <th width="30%">First Name</th>
                    <th width="30%">Last Name</th>
                    <th width="40%" >Actions</th>
                </tr>
                </thead>
                <tbody>
                {players.map((p) => {
                    return (
                    <tr key={p.id}>
                        <td>{p.firstName}</td>
                        <td>{p.lastName}</td>
                        <td>
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
        <Link onClick={() => setIsAdding(true)} to="/addPlayer">Add Player</Link>
    </div>

    )
}

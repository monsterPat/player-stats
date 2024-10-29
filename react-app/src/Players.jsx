
import {Link, Outlet} from "react-router-dom";
import Button from "./Button.jsx";
import { config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faRemove } from '@fortawesome/free-solid-svg-icons';
import {useState, useEffect} from "react";
import ResponsiveTable from "./ResponsiveTable.jsx";

export default function Players({players, setIsAdding, isManage, title, OnRemovePlayer}) {
    config.autoAddCss = false;
    const [playerData, setPlayerData] = useState([]);
    const [playerColumns,setPlayerColumns] = useState([{name: "First Name", width:"30%"},{name: "Last Name", width:"30%"},{name: "Actions", width:"40%"}]);
    
    players.sort((a,b) => a.firstName.localeCompare(b.firstName));

    useEffect(() => {
        const tempPlayerData = players.map((p) => {
            return ({
                firstName: (p.firstName),
                lastName: (p.lastName),
                actions: (<>
                    <Link to={`/player/${p.id}`} className="btn">
                        <FontAwesomeIcon icon={faCircleInfo} />
                    </Link>
                    {isManage && (
                    <Button onClick={() => OnRemovePlayer(p.id)} className="btn">
                        <FontAwesomeIcon icon={faRemove} />
                    </Button>)}
                </>)
            });
        })
        setPlayerData(tempPlayerData);
    },[players]);
    

    return (
    <div>
        <ResponsiveTable title={title} data={playerData} columnHeaders={playerColumns}/>
        <br/>
        {!isManage && <Link onClick={() => setIsAdding(true)} to="/addPlayer">Add Player</Link>}
    </div>

    )
}

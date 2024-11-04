
import {Link, Outlet, useNavigate} from "react-router-dom";
import Button from "./Button.jsx";
import { config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faRemove } from '@fortawesome/free-solid-svg-icons';
import {useState, useEffect} from "react";
import ResponsiveTable from "./ResponsiveTable.jsx";
import Player from "./Player.jsx";
import { FaArrowRight } from "react-icons/fa";

export default function Players({players, setIsAdding, isManage, title, OnRemovePlayer, profile, onGetPlayer, onGetGame, onGetLeague, isAdmin}) {
    config.autoAddCss = false;
    const navigate = useNavigate();
    const [playerData, setPlayerData] = useState([]);
    const [playerColumns,setPlayerColumns] = useState([{name: "First Name", width:"30%"},{name: "Last Name", width:"30%"},{name: "Actions", width:"40%"}]);
    
    function goProfile(){
        navigate("/profile");
      }

    players.sort((a,b) => a.firstName.localeCompare(b.firstName));

    useEffect(() => {
        const tempPlayerData = players.map((p) => {
            return ({
                firstName: (p.firstName),
                lastName: (p.lastName),
                actions: (<>
                    {!isManage && (
                    <Link to={`/player/${p.id}`} className="btn">
                        <FontAwesomeIcon icon={faCircleInfo} />
                    </Link>)}   
                    {isManage && (
                    <Button onClick={() => OnRemovePlayer(p.id)} className="btn-accent">
                        <FontAwesomeIcon style={{"padding":"8px"}} icon={faRemove} />
                    </Button>)}
                </>)
            });
        })
        setPlayerData(tempPlayerData);
    },[players]);
    

    return (
    <div className={isManage?"":"container-page"}>
        {!isManage && (<>
        <h1>My Player</h1>
        {(profile && profile.myPlayerId && profile.myPlayerId !="") && (<Player onGetLeague={onGetLeague} onGetGame={onGetGame} onGetPlayer={onGetPlayer} playerId={profile.myPlayerId} isPlayers={true}/>)}
        {(!profile || !profile.myPlayerId || profile.myPlayerId == "") && (
            <p>
                <br/>
                You have not selected "My Player". Select your player in the <a onClick={goProfile} style={{"cursor":"pointer"}}>Profile</a> to easily follow your guy.
                <br/>
            </p>)}
        </>)}
        <ResponsiveTable title={title} data={playerData} columnHeaders={playerColumns}/>
        <br/>
        {isAdmin && !isManage && <div className="a-link"><Link onClick={() => setIsAdding(true)} to="/addPlayer">Add Player <FaArrowRight/></Link></div>}
        {profile && profile.myPlayerId && <Outlet context={onGetPlayer(profile.myPlayerId)} />}
    </div>

    )
}

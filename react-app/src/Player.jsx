import { useState, useEffect } from "react";
import { NavLink, Routes, Route, useParams, Outlet, Link} from "react-router-dom";
import PlayerDetails from "./PlayerDetails.jsx";
import PlayerStats from "./PlayerStats";
import { FaArrowLeft } from "react-icons/fa";

export default function Player({onGetPlayer, playerId, onGetGame, onGetLeague, isPlayers}) {
  const [isDetails, setIsDetails] = useState(true);
  const [detailsClass, setDetailsClass] = useState("tab-active div-tab");
  const [statsClass, setStatsClass] = useState("div-tab");
  const params = useParams();
  const tempPlayerId=((!params || !params.id )&&playerId && playerId != "")?playerId: params.id;
  const player= onGetPlayer(tempPlayerId);

  function switchTabs(tab){
    if(tab == "Details"){
      setIsDetails(true);
      setDetailsClass("tab-active div-tab");
      setStatsClass("div-tab");
    }else{
      setIsDetails(false);
      setDetailsClass("div-tab");
      setStatsClass("tab-active div-tab");
    }
  }


  return (<div className={isPlayers?"":"container-page"}>
    <div className="product-details-layout">
      <div>
        <h2>{`${player.firstName} ${player.lastName}`}</h2>
        <img
          src={player.imgId == 1?`../images/Player${player.imgId}.JPG`: "../images/Player8.JPG"}
          width={player.imgId == 1?"225":"300"}
          height="300"
          className="product-details-image"
          alt={`${player.firstName} ${player.lastName}`}
        />
      </div>
      <div>
        <div className="tabs">
          <ul>
            { (playerId && playerId !="") && (<>
            <li>
              <div className={detailsClass} style={{"cursor":"pointer"}} onClick={() => switchTabs("Details")}>
                Player Info
                </div>
                <div className={statsClass} style={{"cursor":"pointer"}} onClick={() => switchTabs("Stats")}>
                Player Stats
              </div>
                {isDetails && <PlayerDetails onGetPlayer={onGetPlayer} playerId={playerId}/>}
                {!isDetails && <PlayerStats onGetLeague={onGetLeague} onGetGame={onGetGame} onGetPlayer={onGetPlayer} playerId={playerId}/>}
              
            </li>
            </>)}
            {(!playerId || playerId=="") && (<>
            <li>
              <NavLink className={({isActive}) => isActive ? "tab-active" : ""} to="" end>
                Player Info
              </NavLink>
            </li>
            <li>
              <NavLink className={({isActive}) => isActive ? "tab-active" : ""} to="stats">
                Stats
              </NavLink>
            </li>
            </>)}
          </ul>
        </div>
        {!isPlayers && <div className="a-link"><Link to="/players" ><FaArrowLeft /> Back to Players</Link></div>}
        
        <Outlet context={player} />
      </div>
    </div>
  </div>);
}
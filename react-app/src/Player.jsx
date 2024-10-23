import { useState, useEffect } from "react";
import { NavLink, Routes, Route, useParams, Outlet} from "react-router-dom";

export default function Player({onGetPlayer}) {
  //const { get } = useFetch("https://react-tutorial-demo.firebaseio.com/");
  const params = useParams();
  const player= onGetPlayer(params.id);

  //const p = onGetPlayer(params.id);


  return (
    <div className="product-details-layout">
      <div>
        <h1>{`${player.firstName} ${player.lastName}`}</h1>
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
          </ul>
        </div>
        
        <Outlet context={player} />
      </div>
    </div>
  );
}
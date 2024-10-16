import { useState, useEffect } from 'react';
import './index.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Players from "./Players.jsx";
import Games from "./Games.jsx";
import StatTracker from "./StatTracker.jsx";
import NavBar from "./NavBar.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AddPlayer from "./AddPlayer.jsx";
import Player from "./Player.jsx";
import getData from "./getData.js";
import PlayerDetails from "./PlayerDetails.jsx";
import PlayerStats from "./PlayerStats.jsx";
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

function App() {
  const [players, setPlayers] = useState([]);
  const [games, setGames] = useState([]);
  const [leagues, setLeagues] = useState([])
  const {getPlayers, getGames, getLeagues} = getData();

  useEffect(() => {
    setPlayers(getPlayers());
    setGames(getGames());
    setLeagues(getLeagues());
  }, []);
  
 
  function handlePlayerAdd(newPlayer) {
    setPlayers([...players, {...newPlayer, id: players.length + 1}]);
  }
  function handleGetPlayer(id){
    return players.find((p) => p.id == Number.parseInt(id));
  }
  function handleGetLeague(id){
    return leagues.find((l) => l.id == Number.parseInt(id));
  }

  return (
    <BrowserRouter>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Players players={players}/>}></Route>
          <Route path="/about" element={<p>My name is Pat O'Connell. I am making this app for my son and his team.</p>}></Route>
          <Route path="/players" element={<Players players={players}/>}></Route>
          <Route path="/addPlayer"  element={<AddPlayer onPlayerAdd={handlePlayerAdd} />}></Route>
          <Route path="/player/:id/"   element={<Player onGetPlayer={handleGetPlayer}/>}>
            <Route path="" element={<PlayerDetails />}></Route>
            <Route path="stats" element={<PlayerStats />}></Route>
          </Route>
          <Route path="/games" element={<Games games={games} onGetPlayer={handleGetPlayer} onGetLeague={handleGetLeague}/>}></Route>
          <Route path="/statTracker" element={<StatTracker players={players} games={games} leagues={leagues}/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>

  )
}

export default App;

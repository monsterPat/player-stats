import { useState, useEffect } from 'react';
import './index.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/400.css"; // Specify weight
import "@fontsource/poppins/400-italic.css"; // Specify weight and style
import Players from "./Players.jsx";
import Games from "./Games.jsx";
import AddGame from "./AddGame.jsx";
import EditGame from "./EditGame.jsx";
import StatTracker from "./StatTracker.jsx";
import NavBar from "./components/navbar/Navbar";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AddPlayer from "./AddPlayer.jsx";
import Player from "./Player.jsx";
import PlayerDetails from "./PlayerDetails.jsx";
import PlayerStats from "./PlayerStats.jsx";
import EditPlayer from "./EditPlayer.jsx";
import { config } from '@fortawesome/fontawesome-svg-core';
import { collection, getDocs} from "firebase/firestore";
import { db } from "./config/firestore.js";
import Login from './Login.jsx';
config.autoAddCss = false;

function App() {
  const [players, setPlayers] = useState([]);
  const [games, setGames] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [isAdmin, setIsAdmin]= useState(false);
  const [isAdding, setIsAdding]= useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const getPlayers = async () => {
    try{
      const querySnapshot = await getDocs(collection(db, "players"));
      const tempPlayers = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
      setPlayers(tempPlayers);
    } catch (error){
      console.log(error);
    }
  }

  const getGames = async () => {
    try{
      const querySnapshot = await getDocs(collection(db, "games"));
      const tempGames = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
      setGames(tempGames);
    } catch (error){
      console.log(error);
    }
  }

  const getLeagues = async () => {
    try{
      const querySnapshot = await getDocs(collection(db, "leagues"));
      const tempLeagues = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
      setLeagues(tempLeagues);
    } catch (error){
      console.log(error);
    }
  }

  useEffect(() => {
    if(isLoggedIn){
      console.log("reloading data");
      getPlayers();
      getLeagues();
      getGames();
    }
  }, [isLoggedIn]);
  
  function handleGetPlayer(id){
    return players.find((p) => p.id == id);
  }
  function handleGetLeague(id){
    return leagues.find((l) => l.id == id);
  }
  function handleGetGame(id){
    return games.find((g) => g.id == id);
  }
  return (<>
    {!isLoggedIn && (<div className="container"><Login setIsAdmin={setIsAdmin} setIsLoggedIn={setIsLoggedIn}/></div>)}
    {isLoggedIn && (<BrowserRouter>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Players players={players} setIsAdding={setIsAdding}/>}></Route>
          <Route path="/about" element={<p>My name is Pat O'Connell. I am making this app for my son and his team.</p>}></Route>
          <Route path="/players" element={<Players players={players} setIsAdding={setIsAdding} />}></Route>
          <Route path="/addPlayer"  element={<AddPlayer players={players} setPlayers={setPlayers} getPlayers={getPlayers} />}></Route>
          <Route path="/addGame"  element={<AddGame leagues={leagues} getGames={getGames} />}></Route>
          <Route path="/player/:id/"   element={<Player onGetPlayer={handleGetPlayer}/>}>
            <Route path="" element={<PlayerDetails />}></Route>
            <Route path="stats" element={<PlayerStats onGetLeague={handleGetLeague} onGetGame={handleGetGame} onGetPlayer={handleGetPlayer} />}></Route>
            <Route path="editPlayer" element={<EditPlayer onGetPlayer={handleGetPlayer} getPlayers={getPlayers}/>}></Route>
          </Route>
          
          <Route path="/games" element={<Games games={games} onGetPlayer={handleGetPlayer} onGetLeague={handleGetLeague}/>}></Route>
          <Route path="/game/:id"   element={<EditGame onGetGame={handleGetGame} leagues={leagues} getGames={getGames} players={players}/>}></Route>
          <Route path="/statTracker" element={<StatTracker players={players} games={games} leagues={leagues}/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>)}

  </>)
}

export default App;

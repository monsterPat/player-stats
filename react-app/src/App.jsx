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
import Profile from './Profile.jsx';
import ManageLeague from "./ManageLeague.jsx";
import LiveGame from "./LiveGame.jsx";
import NavBar from "./Navbar.jsx";
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import AddPlayer from "./AddPlayer.jsx";
import Player from "./Player.jsx";
import PlayerDetails from "./PlayerDetails.jsx";
import PlayerStats from "./PlayerStats.jsx";
import EditPlayer from "./EditPlayer.jsx";
import Home from "./Home.jsx";
import { config } from '@fortawesome/fontawesome-svg-core';
import { collection, getDocs, where, query, addDoc} from "firebase/firestore";
import { db, auth } from "./config/firestore.js";
import Login from './Login.jsx';
config.autoAddCss = false;

function App() {
  const [players, setPlayers] = useState([]);
  const [games, setGames] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [isAdmin, setIsAdmin]= useState(false);
  const [isAdding, setIsAdding]= useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [hasProfile, setHasProfile] = useState(false);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    }); 

    return () => unsubscribe();
  }, []);

  auth.On

  useEffect(() => {
    setIsAdmin(false);
    if(user && user.email === import.meta.env.VITE_ADMIN_LOGIN_ID){
      setIsAdmin(true);
    }
  },[user]);

  const getProfile = async () => {
    try{
      const q = query(collection(db, "profiles"), where("email", "==", user.email));
      const querySnapshot = await getDocs(q);
      const tempProfiles = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
      if(tempProfiles && tempProfiles[0]){
        setProfile(tempProfiles[0]);
      }else{
        let newProfile = {email: user.email}
        try {
          await addDoc(collection(db, "profiles"), {
            ...newProfile
          });
          getProfile();
        } catch (error) {
          console.log(error)
        }
      }
      setProfile((tempProfiles && tempProfiles[0])?tempProfiles[0]:{email: user.email, firstName: ""});
    } catch (error){
      console.log(error.message);
    }
  }

  const getPlayers = async () => {
    try{
      const querySnapshot = await getDocs(collection(db, "players"));
      const tempPlayers = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
      setPlayers(tempPlayers);
    } catch (error){
      console.log(error.message);
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
      getProfile();
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
      <NavBar setLoggedIn={setIsLoggedIn} profile={profile}/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/profile" element={<Profile getProfile={getProfile} profile={profile} players={players}/>}></Route>
          <Route path="/players" element={<Players onGetLeague={handleGetLeague} onGetGame={handleGetGame} onGetPlayer={handleGetPlayer} profile={profile} title="All Players" isManage={false} players={players} setIsAdding={setIsAdding} isAdmin={isAdmin} />}></Route>
          <Route path="/addPlayer"  element={<AddPlayer players={players} setPlayers={setPlayers} getPlayers={getPlayers} />}></Route>
          <Route path="/:id/addGame"  element={<AddGame leagues={leagues} getGames={getGames} />}></Route>
          <Route path="/player/:id/"   element={<Player onGetLeague={handleGetLeague} onGetGame={handleGetGame} onGetPlayer={handleGetPlayer} playerId=""/>}>
            <Route path="" element={<PlayerDetails playerId={(profile && profile.myPlayerId)?profile.myPlayerId:""} onGetPlayer={handleGetPlayer} />}></Route>
            <Route path="stats" element={<PlayerStats playerId={(profile && profile.myPlayerId)?profile.myPlayerId:""} onGetLeague={handleGetLeague} onGetGame={handleGetGame} onGetPlayer={handleGetPlayer} />}></Route>
            
          </Route>
          <Route path="/player/:id/editPlayer" element={<EditPlayer  playerId={(profile && profile.myPlayerId)?profile.myPlayerId:""} onGetPlayer={handleGetPlayer} getPlayers={getPlayers}/>}></Route>
          <Route path="/games" element={<Games title="" isManage={false} isAdmin={isAdmin} games={games} onGetPlayer={handleGetPlayer} onGetLeague={handleGetLeague} leagues={leagues}/>}></Route>
          <Route path="/game/:id"   element={<EditGame onGetGame={handleGetGame} leagues={leagues} getGames={getGames} players={players}/>}></Route>
          <Route path="/league/:id"   element={<ManageLeague leagues={leagues} getLeagues={getLeagues} isAdmin={isAdmin} games={games} onGetLeague={handleGetLeague} getGames={getGames} players={players} onGetPlayer={handleGetPlayer}/>}></Route>
          <Route path="/statTracker" element={<StatTracker profile={profile} players={players} games={games} leagues={leagues}/>}></Route>
          <Route path="/liveGame" element={<LiveGame players={players} games={games} leagues={leagues}/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>)}

  </>)
}

export default App;

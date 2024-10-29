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
import ManageLeague from "./ManageLeague.jsx";
import LiveGame from "./LiveGame.jsx";
import NavBar from "./Navbar.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AddPlayer from "./AddPlayer.jsx";
import Player from "./Player.jsx";
import PlayerDetails from "./PlayerDetails.jsx";
import PlayerStats from "./PlayerStats.jsx";
import EditPlayer from "./EditPlayer.jsx";
import Home from "./Home.jsx";
import { config } from '@fortawesome/fontawesome-svg-core';
import { collection, getDocs} from "firebase/firestore";
import { db, auth } from "./config/firestore.js";
import Login from './Login.jsx';
import './wasm_exec.js';
import './wasmTypes.d.js';
//import * as admin from "firebase-admin";
config.autoAddCss = false;

function App() {
  const [players, setPlayers] = useState([]);
  const [games, setGames] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [isAdmin, setIsAdmin]= useState(false);
  const [isAdding, setIsAdding]= useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  //const [isWasmLoaded, setIsWasmLoaded] = useState(false);
  //const [goWasm, setGoWasm] = useState({});

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    }); 

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setIsAdmin(false);
    if(user && user.email === import.meta.env.VITE_ADMIN_LOGIN_ID){
      setIsAdmin(true);
    }
  },[user]);

  /*useEffect(() => {
    console.log(isWasmLoaded);
  },[isWasmLoaded]);

  useEffect(() => {
        // Function to asynchronously load WebAssembly
        async function loadWasm() {
          // Create a new Go object
          const goWasm = new window.Go();  
          setGoWasm(new window.Go()? new window.Go():null)
          if(goWasm){
            const result = await WebAssembly.instantiateStreaming(
                // Fetch and instantiate the main.wasm file
                fetch('main.wasm'),  
                // Provide the import object to Go for communication with JavaScript
                goWasm.importObject  
              );
              // Run the Go program with the WebAssembly instance
              goWasm.run(result.instance);  
              setIsWasmLoaded(true); 
              console.log(result);
            
                  
          }else{
            console.log("go Wasm is dead")
          }
        }

        loadWasm(); 
  },[])*/

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
      console.log(tempLeagues);
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
      <NavBar setLoggedIn={setIsLoggedIn}/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/about" element={<p>My name is Pat O'Connell. I am making this app for my son and his team.</p>}></Route>
          <Route path="/players" element={<Players title="All Players" isManage={false} players={players} setIsAdding={setIsAdding} />}></Route>
          <Route path="/addPlayer"  element={<AddPlayer players={players} setPlayers={setPlayers} getPlayers={getPlayers} />}></Route>
          <Route path="/:id/addGame"  element={<AddGame leagues={leagues} getGames={getGames} />}></Route>
          <Route path="/player/:id/"   element={<Player onGetPlayer={handleGetPlayer}/>}>
            <Route path="" element={<PlayerDetails />}></Route>
            <Route path="stats" element={<PlayerStats onGetLeague={handleGetLeague} onGetGame={handleGetGame} onGetPlayer={handleGetPlayer} />}></Route>
            <Route path="editPlayer" element={<EditPlayer onGetPlayer={handleGetPlayer} getPlayers={getPlayers}/>}></Route>
          </Route>
          
          <Route path="/games" element={<Games title="" isManage={false} isAdmin={isAdmin} games={games} onGetPlayer={handleGetPlayer} onGetLeague={handleGetLeague} leagues={leagues}/>}></Route>
          <Route path="/game/:id"   element={<EditGame onGetGame={handleGetGame} leagues={leagues} getGames={getGames} players={players}/>}></Route>
          <Route path="/league/:id"   element={<ManageLeague leagues={leagues} getLeagues={getLeagues} isAdmin={isAdmin} games={games} onGetLeague={handleGetLeague} getGames={getGames} players={players} onGetPlayer={handleGetPlayer}/>}></Route>
          <Route path="/statTracker" element={<StatTracker players={players} games={games} leagues={leagues}/>}></Route>
          <Route path="/liveGame" element={<LiveGame players={players} games={games} leagues={leagues}/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>)}

  </>)
}

export default App;

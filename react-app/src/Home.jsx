import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  function goProfile(){
    navigate("/profile");
  }
  function goStatTracker(){
    navigate("/statTracker");
  }
  function goPlayers(){
    navigate("/players");
  }
  return (
    <div>
      <p>
        We are the Zilker Bulls!
        <br/>
        <br/>
        This app is designed to reference game details, player history, and allow stat tracking for players.
        <br/>
        <br/>
        Select your player in the <a onClick={goProfile} style={{"cursor":"pointer"}}>Profile</a> to easily follow your guy.
        <br/>
        <br/>
        To track stats for a player, click <a onClick={goStatTracker} style={{"cursor":"pointer"}}>Stat Tracker</a> in the menu. By default the current game will be selected. You just need to choose the player and Start Tracking!
        <br/>
        <br/>
        Feel free to navigate to the <a onClick={goPlayers} style={{"cursor":"pointer"}}>Players</a> menu to view each players stored history.
        <br/>
        <br/>
        Any issues or ideas for this app, just yell at Coach Pat!
      </p>
    </div>
  )
}

export default Home
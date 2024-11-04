import React, {useState, useEffect} from 'react'
import ResponsiveTable from './ResponsiveTable.jsx';

function TeamStatTracker({players, leagueId, stats, leagues}) {
    const [rosterPlayers, setRosterPlayers] = useState([]);
    const [roster, setRoster] = useState([]);
    const [teamStats, setTeamStats] = useState([]);
    const [statColumns, setStatColumns] = useState([])
    useEffect(() => {
        const tempLeague = leagues.find((l) => l.id == leagueId);
        console.log(tempLeague);
        const tempRosterPlayers = players.filter((p) => {
            return tempLeague.roster.find((r) => p.id === r)
          });
          console.log(tempRosterPlayers);
          console.log(leagueId);
          console.log(stats);
    }, [])
    useEffect(() => {
        
    })
  return (
    <div>TeamStatTracker</div>
  )
}

export default TeamStatTracker
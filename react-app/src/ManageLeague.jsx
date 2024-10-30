import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ResponsiveTable from "./ResponsiveTable.jsx";
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import Games from "./Games.jsx";
import dayjs from "dayjs";
import MultiSelect2 from "./MultiSelect.jsx";
import Players from "./Players.jsx";
import Swal from "sweetalert2";
import { db } from "./config/firestore.js";
import {doc, setDoc} from "firebase/firestore";

function ManageLeague({players, leagues, onGetLeague, getGames, getLeagues, games, onGetPlayer, isAdmin}) {
  const params = useParams();
  const [league, setLeague] = useState(onGetLeague(params.id));
  const [leagueGames, setLeagueGames] = useState([]);
  const [rosterPlayers, setRosterPlayers] = useState([]);
  const [queuePlayers, setQueuePlayers] = useState([]);
  const [playersNVP, setPlayersNVP] = useState([]);
  const [name, setName] = useState(league.name);
  const [roster, setRoster] = useState(league.roster? league.roster: []);
  const [startDate, setStartDate] = useState((new dayjs(league.startDate.toDate()).toDate()).toLocaleDateString('en-CA'));
  const [endDate, setEndDate] = useState((new dayjs(league.endDate.toDate()).toDate()).toLocaleDateString('en-CA'));
  const navigate = useNavigate();

  function removeItemsById(arr1, arr2) {
    const idsToRemove = new Set(arr2);
    return arr1.filter(item => !idsToRemove.has(item.value));
  }

  useEffect(() => {
    const tempGames = games.filter((g) => g.leagueId === league.id);
    setLeagueGames(tempGames);
    let tempPlayersNVP = players.map((p) => {
        return {
            value: p.id,
            label: (`${p.firstName}  ${p.lastName}`)
        }
    });
    tempPlayersNVP = removeItemsById(tempPlayersNVP, roster);
    setPlayersNVP(tempPlayersNVP);
    setRoster(league.roster? league.roster: []);
  },[leagues]);

  useEffect(() => {
    const tempRosterPlayers = players.filter((p) => {
      return roster.find((r) => p.id === r)
    });

    let tempPlayersNVP = players.map((p) => {
        return {
            value: p.id,
            label: (`${p.firstName}  ${p.lastName}`)
        }
    });
    tempPlayersNVP = removeItemsById(tempPlayersNVP, roster);
    setPlayersNVP(tempPlayersNVP);

    setRosterPlayers(tempRosterPlayers);

  },[roster])

  const handleUpdateLeagueOnClick = async () => {
    if(!name || !startDate || !endDate){
      return Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Name and dates are required.',
          showConfirmButton: true,
      });
    }
    const tempStart = new dayjs(startDate);
    const tempEnd = new dayjs(endDate)
    const editLeague = {
        name,
        startDate: tempStart.toDate(),
        endDate: tempEnd.toDate(),
        roster: roster
    };
    try {
        await setDoc(doc(db, "leagues", league.id), {
        ...editLeague
    });
    } catch (error) {
        console.log(error)
    }
    //setPlayers([...players, {...newPlayer}]);
    getGames();
    getLeagues();
    Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: `${name} has been Updated.`,
        showConfirmButton: false,
        timer: 1500,
    });
    navigate("/games");
  }

  const handleSelectionChange = (selectedValues) => {
    setQueuePlayers(selectedValues);
  };

  function handleAddPlayers(){
    setRoster([...roster, ...queuePlayers.map((q) => q.value)]);
    setQueuePlayers([]);
  }

  function handleRemovePlayer(id){
    setRoster(roster.filter((r) => r != id));
    setRosterPlayers(rosterPlayers.filter((p) => p.id != id));
  }

  return (<>
    <Input placeholder="Name" onChange={(e) => {setName(e.target.value)}} value={name} required></Input>
    <Input placeholder="Start Date"  type="date" onChange={(e) => {
          const tempDayJS = new dayjs(e.target.value,"MM-DD-YYY")
          setStartDate(tempDayJS.toDate())
          }
      } value={startDate} required></Input>
    <Input placeholder="End Date"  type="date" onChange={(e) => {
          const tempDayJS = new dayjs(e.target.value,"MM-DD-YYY")
          setEndDate(tempDayJS.toDate());
        }
      } value={endDate} required></Input>
      <br/>
    <Players OnRemovePlayer={(id)=> handleRemovePlayer(id)}title="League Roster" isManage={true} players={rosterPlayers} setIsAdding={false} />
    <Button onClick={handleAddPlayers} disabled={(queuePlayers && queuePlayers.length>0?false:true)}>Add Selected Players to Roster</Button>
    <MultiSelect2  options={playersNVP} value={queuePlayers} onChange={handleSelectionChange}/ >
    <Games title="League Games" isManage={true} isAdmin={isAdmin} games={leagueGames} onGetPlayer={onGetPlayer} onGetLeague={() => {
      //console.log(league.id);
      return league.id;
    }} leagues={[league]}/>
    <br/>
    
    <Button onClick={handleUpdateLeagueOnClick} >Update League</Button><>|||</>
    <Button className="btn-accent" onClick={() => navigate("/games")} >Cancel</Button>

    </>);
}

export default ManageLeague;
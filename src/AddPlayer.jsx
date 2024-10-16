import {useState} from "react";
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import {Link} from "react-router-dom";
export default function AddPlayer({onPlayerAdd}){
    const [newPlayer, setNewPlayer] = useState({})
    //console.log(onPlayerAdd);
    function handleAddPlayerOnClick(){
        onPlayerAdd(newPlayer);
        //console.log(newPlayer);
    }
    return (
    <div>
        <Input placeholder="First Name" onChange={(e) => {setNewPlayer({...newPlayer, firstName : e.target.value})}} required></Input>
        <Input placeholder="Last Name" onChange={(e) => {setNewPlayer({...newPlayer, lastName : e.target.value})}} required></Input>
        <Input placeholder="Age" onChange={(e) => {setNewPlayer({...newPlayer, age : e.target.value})}} required></Input>
        <Input placeholder="Team" onChange={(e) => {setNewPlayer({...newPlayer, team : e.target.value})}} required></Input>
        <br/>
        <Link to="/players" onClick={handleAddPlayerOnClick}>Add Player</Link>

    </div>)
}
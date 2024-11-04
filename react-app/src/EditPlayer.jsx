import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import Swal from "sweetalert2";
import { db } from "./config/firestore.js";
import {doc, setDoc} from "firebase/firestore";
import {useParams} from "react-router-dom";
import AgeSelector from "./AgeSelector.jsx";

export default function EditPlayer({getPlayers, onGetPlayer, playerId}){
    const params = useParams();
    const [player, setPlayer] = useState(((!params || !params.id )&&playerId && playerId != "")?onGetPlayer(playerId):onGetPlayer(params.id));
    const [firstName, setFirstName] = useState(player.firstName);
    const [lastName, setLastName] = useState(player.lastName);
    const [age, setAge] = useState(player.age);
    const [team, setTeam] = useState(player.team);
    const [imgSrc, setImgSrc] = useState(player.imgId == 1?`../../../images/Player${player.imgId}.JPG`: "../../../images/Player8.JPG");
    const navigate = useNavigate();

    const handleSavePlayerOnClick = async (e) => {
        if(!firstName || !lastName || !age || !team){
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true,
            });
        }
        const editPlayer = {
            ...player,
            firstName,
            lastName,
            age,
            team
        };
        try {
            await setDoc(doc(db, "players", player.id), {
            ...editPlayer
        });
        } catch (error) {
            console.log(error)
        }
        //setPlayers([...players, {...newPlayer}]);
        getPlayers();
        Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: `${firstName} ${lastName} has been Updated.`,
            showConfirmButton: false,
            timer: 1500,
        });
        navigate(`/player/${params.id}`);
    }
    return (<div className="container-page">
        <div className="product-details-layout">
            <div>
            <h2>{`${player.firstName} ${player.lastName}`}</h2>
            <img
                src={imgSrc}
                width={player.imgId == 1?"225":"300"}
                height="300"
                className="product-details-image"
                alt={`${player.firstName} ${player.lastName}`}
            />
            </div>
            <div>
                <Input placeholder="First Name" onChange={(e) => {setFirstName(e.target.value)}} value={firstName} required></Input>
                <Input placeholder="Last Name" onChange={(e) => {setLastName(e.target.value)}} value={lastName} required></Input>
                <AgeSelector placeholder="Age" onChange={(e) => {setAge(Number.parseInt(e.target.value))}} value={age} required></AgeSelector>
                <Input placeholder="Team" onChange={(e) => {setTeam(e.target.value)}} value={team} required></Input>
                <br/>
                <Button onClick={handleSavePlayerOnClick} className="btn-default">Save</Button><>|||</>
                <Button onClick={() => navigate(`/player/${params.id}`)} className="btn-accent">Cancel</Button>
            </div>
        </div>
    </div>)
}
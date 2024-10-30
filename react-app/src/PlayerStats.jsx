import { collection, getDocs} from "firebase/firestore";
import { db } from "./config/firestore.js";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ResponsiveTable from "./ResponsiveTable.jsx";

export default function PlayerStats({onGetGame, onGetLeague, onGetPlayer, playerId}){
    const [stats, setStats] = useState([]);
    const [statData, setStatData] = useState([]);
    const [footer,setFooter] = useState([]);
    const params = useParams();
    const player = (playerId && playerId != "")?onGetPlayer(playerId):onGetPlayer(params.id);
    const statColumns = [
        {
            name: "Game",
            width: "20%"
        },
        {
            name: "Points",
            width: "20%"
        },
        {
            name: "Rebounds",
            width: "20%"
        },
        {
            name: "Steals",
            width: "20%"
        },
        {
            name: "Assists",
            width: "20%"
        }
    ]
    useEffect(() => {
        const tempStatData = stats.map((s) => {
            return ({
                game: onGetGame(s.gameId).name,
                points: s.points,
                rebounds: s.rebounds,
                steals: s.steals,
                assists: s.assists
            });
        })
        setStatData(tempStatData);
        const tempFooterData = [
            {
                name: "Average",
                points: (stats.reduce((total, s) => total + s.points,0)/stats.length).toFixed(2),
                rebounds: (stats.reduce((total, s) => total + s.rebounds,0)/stats.length).toFixed(2),
                steals: (stats.reduce((total, s) => total + s.steals,0)/stats.length).toFixed(2),
                assists: (stats.reduce((total, s) => total + s.assists,0)/stats.length).toFixed(2)
            },
            {
                name: "Total",
                points: stats.reduce((total, s) => total + s.points,0),
                rebounds: stats.reduce((total, s) => total + s.rebounds,0),
                steals: stats.reduce((total, s) => total + s.steals,0),
                assists: stats.reduce((total, s) => total + s.assists,0)
            }
        ];
        setFooter(tempFooterData);
    },[stats]);

    useEffect(() => {
        getStats();
    },[])
    const getStats = async () => {
        try{
            const querySnapshot = await getDocs(collection(db, "stats"));
            const tempStats = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            const playerStats = tempStats.filter((s) => s.playerId == player.id);
            setStats(playerStats);
        } catch (error){
            console.log(error);
        }
      }

    return (<div>
        <ResponsiveTable title="Player Stats" columnHeaders={statColumns} data={statData} footer={footer}/>
    </div>)
}
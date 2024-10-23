import { collection, getDocs} from "firebase/firestore";
import { db } from "./config/firestore.js";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export default function PlayerStats({onGetGame, onGetLeague, onGetPlayer}){
    const [stats, setStats] = useState([]);
    const params = useParams();
    const player= onGetPlayer(params.id);

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

    return (<>
        <div className="cart-layout">
            <div>
                <h1>{`Stats for ${player.firstName} ${player.lastName}`}</h1>
                {stats.length === 0 && (
                <p>There are no stats saved. Try the Stat Tracker!</p>
                )}
                {stats.length > 0 && (
                <>
                    <table className="table table-cart">
                    <thead>
                        <tr>
                        <th width="25%"> Game</th>
                        <th width="20%">Points</th>
                        <th width="10%">Rebounds</th>
                        <th width="25%">Steals</th>
                        <th width="25%">Assists</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.map((s) => {
                        return (
                            <tr key={s.id}>
                            <td>{onGetGame(s.gameId).name}</td>
                            <td>{s.points}</td>
                            <td>{s.rebounds}</td>
                            <td>{s.steals}</td>
                            <td>{s.assists}</td>
                            </tr>
                        );
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                        <th className="cart-highlight">Avg:</th>
                        <th className="cart-highlight">{stats.reduce((total, s) => total + s.points,0)/stats.length}</th>
                        <th className="cart-highlight">{stats.reduce((total, s) => total + s.rebounds,0)/stats.length}</th>
                        <th className="cart-highlight">{stats.reduce((total, s) => total + s.steals,0)/stats.length}</th>
                        <th className="cart-highlight">{stats.reduce((total, s) => total + s.assists,0)/stats.length}</th>
                        </tr>
                        <tr>
                        <th className="cart-highlight">Total:</th>
                        <th className="cart-highlight">{stats.reduce((total, s) => total + s.points,0)}</th>
                        <th className="cart-highlight">{stats.reduce((total, s) => total + s.rebounds,0)}</th>
                        <th className="cart-highlight">{stats.reduce((total, s) => total + s.steals,0)}</th>
                        <th className="cart-highlight">{stats.reduce((total, s) => total + s.assists,0)}</th>
                        </tr>
                    </tfoot>
                    </table>
                </>
                )}
            </div>
            </div>
    </>)
}
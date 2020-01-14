import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import logodelete from '../../assets/delete.svg';
import './styles.css';

export default function Dashboard() {
    const [spots, setSpots] = useState([]);
    useEffect(() => {
        async function loadSPots() {
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }
            })
            setSpots(response.data);
        }
        loadSPots();
    }, [])

    async function removeSpot(spot_id) {
        const newSpots = spots.filter((spot) => {
            return spot._id !== spot_id;
        });
        setSpots(newSpots);
        await api.delete('/spots', {
            headers: {
                spot_id
            }
        });
    }
    return (
        <>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <div className="show-image">
                            <header style={{ backgroundImage: `url(${spot.url_image})` }}></header>
                            <img className="delete" type="button" src={logodelete} onClick={() => removeSpot(spot._id)} alt="delete" />
                        </div>
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
                    </li>
                ))}
            </ul>

            <Link to="/new">
                <button className="btn">Cadastrar novo spot</button>
            </Link>

        </>
    )
}
import React from 'react';
import AjouterAvis from './AjouterAvis';
import { FaStar } from "react-icons/fa";
import { useState, useEffect } from 'react';
import axios from 'axios';

const Avis = () => {

    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get('http://localhost:3002/avis-verif')
        setData(response.data)
    }

    useEffect(() => {
        loadData();
    }, []);

    console.log('data avis', data)

    return (
        <div className="conteneurAvis">
            <h1>Nos clients parle de nous</h1>
            <div className="listeAvis">
                {data.map((avis, index) => (
                    < div className="avisClient" key={index} >
                        <div className="nomClientNote">
                            <h4>{avis.name}</h4>
                            <div>
                                {[...Array(avis.note)].map(() => {
                                    return (
                                        <div className="positionStarRating">
                                            <input
                                                type="radio"
                                                name="note"
                                                className="radioStar"
                                                id="note"
                                                value={avis.note}
                                            />
                                            <label htmlFor="note" />

                                            <FaStar
                                                value={avis.note}
                                                size={25}
                                                color="#ffc107"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <p>{avis.message}</p>
                    </div>
                ))}
            </div>
            <AjouterAvis />
        </div >
    );
};

export default Avis;
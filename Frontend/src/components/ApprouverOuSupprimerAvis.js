import React from 'react';
import { useState, useEffect } from 'react';
import { FaStar } from "react-icons/fa";
import axios from 'axios';

const ApprouverOuSupprimerAvis = () => {

    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get('http://localhost:3002/avis-non-verif')
        setData(response.data)
    }

    useEffect(() => {
        loadData();
    }, []);

    console.log('data', data)

    const handleDelete = (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer définitivement cet avis ?")) {
            axios.delete(`http://localhost:3002/avis-non-verif/remove/${id}`);
            setTimeout(() => loadData(), 500);
        }
    }

    const handleDeleteAll = () => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer définitivement tout ces avis ?")) {
            axios.delete(`http://localhost:3002/avis-verif/remove`);
            setTimeout(() => loadData(), 500);
        }
    }

    const handleAddAvisVerif = async (id, name, message, note) => {

        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('http://localhost:3002/add-avis-verif', { name, message, note }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            console.log('Succès:', response.data);
            console.log('name, message, note', name, message, note)
            alert('Avis approuvé avec succès')
            if (response.data) {
                axios.delete(`http://localhost:3002/avis-non-verif/remove/${id}`);
                setTimeout(() => loadData(), 500);
                console.log('avis supprimer de la liste non vérifié');
            }
        } catch (error) {
            console.error('Erreur:', error.response ? error.response.data : error.message);
        }
    }

    return (
        <div className="listeAvis">
            <h3>Espace modération des avis</h3>
            <button onClick={() => handleDeleteAll()}>
                Supprime tout avis verif
            </button>
            {data.map((avis, index) => (
                <div className="avisClient" index={index}>
                    <div className="nomClientNote">
                        <h4>
                            {avis.name}
                        </h4>
                        <div>
                            {[...Array(avis.note)].map(() => {
                                return (
                                    <div className="positionStarRating">
                                        <input
                                            type="radio"
                                            name="note"
                                            id="note"
                                            className="radioStar"
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
                    <p>{avis.id}</p>
                    <div>
                        <button
                            type="button"
                            id="buttonSupprimerAvis"
                            name="buttonSupprimerAvis"
                            value={avis.id}
                            onClick={() => handleDelete(avis.id)}
                        >
                            Supprimer
                        </button>
                        <button
                            type="button"
                            id="buttonApprouverAvis"
                            name="buttonApprouverAvis"
                            value={avis.name}
                            onClick={() => handleAddAvisVerif(avis.id, avis.name, avis.message, avis.note)}
                        >
                            Approuver
                        </button>
                    </div>
                </div>
            ))
            }
        </div >
    );
};

export default ApprouverOuSupprimerAvis;
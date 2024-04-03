import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const SupprimerEmploye = () => {

    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get('http://localhost:3002/services')
        setData(response.data);
    }

    useEffect(() => {
        loadData();
    }, []);

    const handleDelete = (name) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer définitivement ce service ?")) {
            axios.delete(`http://localhost:3002/services/remove/${name}`);
            setTimeout(() => loadData(), 500);
        }
    }

    return (
        <div className="elementDashboardAdmin" id="supprimerEmploye">
            <h3>Liste des services</h3>
            <div>
                {data.map((service, index) => (
                    <div index={index} className="employe">
                        <img className="imageSupprimerVoiture" src={`http://localhost:3002/uploads/${service.image}`} />
                        <p>Nom service : {service.name}</p>
                        <p>Explication service : {service.content}</p>
                        <button onClick={() => handleDelete(service.name)}>Supprimer</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SupprimerEmploye;
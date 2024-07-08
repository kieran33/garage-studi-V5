import React from 'react';
import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import axios from 'axios';

const BoutonSupprimerVoitures = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get('http://localhost:3002/voitures')
        setData(response.data);
    }

    useEffect(() => {
        loadData();
    }, []);

    const handleDelete = async (id, marqueVoiture) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer définitivement cette voiture ?")) {
            axios.delete(`http://localhost:3002/voitures/remove/${id}`);

            try {
                await axios.delete(`http://localhost:3002/supprimer-voitures-vues/${marqueVoiture}`);
            } catch (error) {
                console.log(error)
            }

            setTimeout(() => loadData(), 500);
        };
    };

    useEffect(() => {
        ReactModal.setAppElement('body');
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button className="boutonSupprimerVoiture" onClick={openModal}>Supprimer une voiture</button>
            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
            >
                <div className="elementDashboardAdmin" id="supprimerEmploye">
                    <h3>Liste des voitures</h3>
                    <div>
                        {data.map((voiture, index) => (
                            <div index={index} className="employe">
                                <img className="imageSupprimerVoiture" src={`http://localhost:3002/uploads/${voiture.image}`} />
                                <p>id : {voiture.id}</p>
                                <p>marque : {voiture.brand}</p>
                                <button onClick={() => handleDelete(voiture.id, voiture.brand)}>Supprimer</button>
                            </div>
                        ))}
                    </div>
                    <button className="bouttonAnnulerSupre" onClick={closeModal}>Fermer</button>
                </div>
            </ReactModal>
        </div >
    );
};

export default BoutonSupprimerVoitures;
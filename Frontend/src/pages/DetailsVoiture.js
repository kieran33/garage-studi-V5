import React from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import axios from 'axios';

const DetailsVoiture = () => {

    const [data, setData] = useState([]);
    const [dataVoiture, setDataVoiture] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [message, setMessage] = useState("");
    const { id } = useParams();

    const idNumber = Number(id);

    const loadData = async () => {
        const response = await axios.get('http://localhost:3002/voitures')
        setData(response.data);
    }

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            setDataVoiture(data.find(voiture => voiture.id === idNumber))
        }
    }, [data]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openModal2 = () => {
        setIsModalOpen2(true);
        setMessage(`Je serais intéressé par la voiture ${dataVoiture.brand}`);
    };

    const closeModal2 = () => {
        setIsModalOpen2(false);
    };

    useEffect(() => {
        ReactModal.setAppElement('body');
    }, []);

    const envoieMessage = (e) => {
        e.preventDefault();
        console.log('Envoie du message réussis')
    }

    return (
        <div>
            <Navigation />
            <h1 className="titreAnnonce">Annonce pour la voiture {dataVoiture.brand}</h1>
            <div className="conteneurDetailVoiture">
                <img className="imageDetailVoiture" src={`http://localhost:3002/uploads/${dataVoiture.image}`} />
                <div>
                    <p className="infosVoiture">Kilométrage : {dataVoiture.km} km</p>
                    <p className="infosVoiture">Prix : {dataVoiture.price} €</p>
                    <p className="infosVoiture">Mise en circulation en : {dataVoiture.yearsCirculation}</p>
                    <p className="infosVoiture">Intéressé ? Contactez-nous par message ou par téléphone</p>
                    <div className="boutonContactDetailVoiture">
                        <button className="boutonContactDetailVoitureMessage" onClick={openModal}>Par message</button>
                        <ReactModal
                            isOpen={isModalOpen}
                            onRequestClose={closeModal}
                            className="myModal2"
                        >
                            <form id="formulaireContactDetailVoiture" onSubmit={envoieMessage}>
                                <legend>Laissez-nous votre message</legend>
                                <input type="text" size="10" name="nom" className="nomFormulaireContactDetailVoiture" id="nom" placeholder="Votre nom" required></input>
                                <label htmlFor="nom"></label>

                                <input type="text" name="prenom" className="prenomFormulaireContactDetailVoiture" id="prenom" placeholder="Votre prénom" required></input>
                                <label htmlFor="prenom"></label>

                                <input type="email" name="email" className="emailFormulaireContactDetailVoiture" id="email" placeholder="Votre email" required></input>
                                <label htmlFor="email"></label>

                                <input type="tel" name="phone" className="phoneFormulaireContactDetailVoiture" id="phone" placeholder="Votre numéro de téléphone" required></input>
                                <label htmlFor="phone"></label>

                                <textarea name="question" className="questionFormulaireContactDetailVoiture" id="question" cols="50" rows="5" placeholder="Votre message" defaultValue={message} />

                                <div className="boutonformulaireContactDetailVoiture">
                                    <button type="submit" value="Envoyer" onClick={envoieMessage}>Envoyer</button>
                                    <button onClick={closeModal}>Annuler</button>
                                </div>
                            </form>
                        </ReactModal>

                        <button className="boutonContactDetailVoitureTelephone" onClick={openModal2}>Par téléphone</button>
                        <ReactModal
                            isOpen={isModalOpen2}
                            onRequestClose={closeModal2}
                            className="myModal"
                        >
                            <h3>Notre numéro de téléphone : </h3>
                            <p>06 06 06 06 06</p>
                            <button onClick={closeModal2}>Fermer</button>
                        </ReactModal>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );
};

export default DetailsVoiture;
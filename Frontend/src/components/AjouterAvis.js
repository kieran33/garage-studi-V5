import React from 'react';
import { FaStar } from "react-icons/fa";
import { useState } from 'react';
import axios from 'axios';

const AjouterAvis = () => {

    const [newAvis, setNewAvis] = useState(getDefaultAvis());
    const [donnerAvis, setDonnerAvis] = useState(false);
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    function getDefaultAvis() {
        return {
            note: 4,
            name: "Tibo",
            message: "Lorem ipsum"
        };
    };

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        const newValue = type === "radio" ? Number(value) : value;

        setNewAvis({
            ...newAvis,
            [name]: newValue,
        });
    };

    const handleAddAvis = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3002/add-avis-non-verif', newAvis, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Succès:', response.data);
            console.log('newAvis', newAvis)
            setNewAvis(getDefaultAvis());
            setDonnerAvis(false);
            alert('Avis ajouté avec succès, il sera traiter prochainement')
        } catch (error) {
            console.error('Erreur:', error.response ? error.response.data : error.message);
        }
    }

    return (
        <div>
            {donnerAvis === false ?
                <button className="buttonAjoutAvis" onClick={() => setDonnerAvis(true)}>Donner son avis</button>
                :
                <div>
                    <form className="formulaireaAjoutAvis" onSubmit={handleAddAvis}>
                        <div className="EtoileAjoutAvis">
                            {[...Array(5)].map((star, index) => {
                                const ratingValue = index + 1;
                                //console.log(rating)
                                return (
                                    <div className="positionStarRating">
                                        <label>
                                            <input
                                                type="radio"
                                                name="note"
                                                id="note"
                                                className="radioStar"
                                                value={ratingValue}
                                                onChange={handleInputChange}
                                                onClick={() => setRating(ratingValue)}
                                                required="required"
                                            />
                                            <FaStar
                                                className="star"
                                                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                                size={40}
                                                onMouseEnter={() => setHover(ratingValue)}
                                                onMouseLeave={() => setHover(null)}
                                            />
                                        </label>
                                    </div>
                                );
                            })}
                        </div>

                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="inputNameAjoutAvis"
                            placeholder="Votre nom"
                            onChange={handleInputChange}
                            required
                        />
                        <label htmlFor="name"></label>

                        <textarea
                            name="message"
                            id="message"
                            className="messageAjoutAvis"
                            cols="75"
                            rows="5"
                            placeholder="Votre message"
                            onChange={handleInputChange}
                        />
                        <label htmlFor="message"></label>
                        <div>
                            <button className="confimerAjoutAvis" type="submit">Confimer</button>
                            <button className="annulerAjoutAvis" onClick={() => setDonnerAvis(false)}>Annuler</button>
                        </div>
                    </form>
                </div>
            }
        </div >
    );
};

export default AjouterAvis;
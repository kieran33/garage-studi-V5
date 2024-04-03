import React, { useState } from 'react';
import axios from 'axios';

const CreerEmploye = () => {

    const [newUser, setNewUser] = useState(getDefaultUser());

    function getDefaultUser() {
        return {
            email: "",
            password: "",
            role: "Employé",
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setNewUser({
            ...newUser,
            [name]: value,
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const hasNumbers = /\d/.test(newUser.password);

        const testLetters = /[a-zA-Z]/g;
        const hasLetters = testLetters.test(newUser.password);

        if ((hasNumbers === true) && (hasLetters === true)) {
            try {
                const response = await axios.post('http://localhost:3002/create-employe', newUser, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log('Succès:', response.data);
                setNewUser(getDefaultUser());
            } catch (error) {
                console.error('Erreur:', error.response ? error.response.data : error.message);
            }
        }
        else {
            alert('Veuillez choisir un mot de passe contenant des lettres et des chiffres');
        }
    }

    return (
        <div className="elementDashboardAdmin">
            <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleInputChange}
                value={newUser.email}
                required
            />

            <input
                type="password"
                name="password"
                placeholder="Mot de passe"
                onChange={handleInputChange}
                value={newUser.password}
                required
            />

            <button onClick={handleSubmit}>Créer</button>
        </div>
    );
};

export default CreerEmploye;
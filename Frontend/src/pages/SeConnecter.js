import React from 'react';
import Navigation from '../components/Navigation';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import axios from 'axios';

const SeConnecter = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const connexion = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3002/login', {
                email: email,
                password: password
            });
            console.log("response from se connecter", response.data.role)
            if (response.data.role === "Admin" && response.data.success) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.role);
                navigate("/");
                location.reload();
            } else if (response.data.role === "Employé" && response.data.success) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.role);
                navigate("/");
                location.reload();
            } else {
                alert('Identifiants incorrects');
            }
        } catch (error) {
            console.error('Erreur de connexion:', error);
            alert('Erreur lors de la tentative de connexion.');
        }
    };

    // La fonction deconnexion n'est peut-être pas nécessaire si vous gérez les sessions sur le serveur

    return (

        <div>
            <Navigation />
            <h1>Espace professionnel</h1>
            <div className="conteneurConnexion">
                <form className="formulaireConnexion" onSubmit={connexion}>
                    <div>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="votre email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="email"></label>

                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="votre mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="password"></label>

                        <div className="boutonConnexion">
                            <button type="submit">
                                Se connecter
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default SeConnecter;
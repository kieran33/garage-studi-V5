import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from '../image/logo_garave_v_parrot.jpg'

const Navigation = () => {

    const navigate = useNavigate();

    const goConnexion = () => {
        navigate("/connexion");
    }

    const goAccueil = () => {
        navigate("/");
    }

    const ouvertOuFermer = localStorage.getItem('ouvert ou fermer');
    const etatConnexion = localStorage.getItem('etat connexion');
    const admin = localStorage.getItem('compte admin');

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        // Ajoutez d'autres éléments à supprimer si nécessaire, comme 'connected'
        navigate("/connexion");
    };

    return (
        <div>
            {!token && ouvertOuFermer === "fermer" ?
                <div className="navigation">
                    < button className="boutonEspacePro" onClick={goConnexion}>Espace professionnel</button>
                </div>
                :
                <div className="navigation">
                    <div>
                        <img src={logo} className="garageLogo" width="150" height="auto" alt="logo garage v parrot"
                            onClick={goAccueil}
                        />
                    </div>
                    <div className="navigationOnglet">
                        <NavLink to={"/"}>
                            Accueil
                        </NavLink>
                        <NavLink to={"/occasions"}>
                            Nos occasions
                        </NavLink>
                        <NavLink to={"/contact"}>
                            Contact
                        </NavLink>
                        {!token ?
                            null
                            :
                            <div>
                                {role === "Admin" ?
                                    <NavLink to={"/dashboard-admin"}>
                                        Dashboard
                                    </NavLink>
                                    :
                                    null
                                }
                                {role === "Employé" ?
                                    <NavLink to={"/dashboard-employe"}>
                                        Dashboard
                                    </NavLink>
                                    :
                                    null
                                }
                            </div>
                        }
                        {!token ?
                            < button className="boutonEspacePro" onClick={goConnexion}>Espace professionnel</button>
                            :
                            <button className="boutonEspacePro" onClick={handleLogout}>Se deconnecter</button>
                        }
                    </div>
                </div>
            }
        </div >
    );
};

export default Navigation;
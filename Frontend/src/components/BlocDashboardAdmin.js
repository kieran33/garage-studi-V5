import React from 'react';
import { useState } from 'react';
import AjoutServices from '../components/AjoutServices';
import SupprimerServices from './SupprimerServices';
import CreerEmploye from './CreerEmploye';
import SupprimerEmploye from './SupprimerEmploye';
import BoutonFermeOuvert from './BoutonFermeOuvert';
import CheckVoiturePopulaire from './CheckVoiturePopulaire';

const BlocDashboardAdmin = () => {

    const [isOpenAjout, setIsOpenAjout] = useState(false);
    const [isOpenSupprimer, setIsOpenSupprimer] = useState(false);
    const [isOpenCreer, setIsOpenCreer] = useState(false);
    const [isOpenSupprimerEmploye, setIsOpenSupprimerEmploye] = useState(false);
    const [isOpenVoiturePopulaire, setIsOpenVoiturePopulaire] = useState(false);

    const isOpenAjoutServices = () => {
        setIsOpenAjout(true);
    }

    const isCloseAjoutServices = () => {
        setIsOpenAjout(false);
    }

    const isOpenSupprimerService = () => {
        setIsOpenSupprimer(true);
    }

    const isCloseSupprimerService = () => {
        setIsOpenSupprimer(false);
    }

    const isOpenCreerEmploye = () => {
        setIsOpenCreer(true);
    }

    const isCloseCreerEmploye = () => {
        setIsOpenCreer(false);
    }

    const isOpenSupprimerCompteEmploye = () => {
        setIsOpenSupprimerEmploye(true);
    }

    const isCloseSupprimerCompteEmploye = () => {
        setIsOpenSupprimerEmploye(false);
    }

    const isOpenCheckVoiturePopulaire = () => {
        setIsOpenVoiturePopulaire(true);
    }

    const isCloseCheckVoiturePopulaire = () => {
        setIsOpenVoiturePopulaire(false);
    }

    return (
        <div>
            <div className="boutonDashboard">

                {isOpenAjout === false ?
                    <button className="tailleBoutonDashboard" onClick={isOpenAjoutServices}>Ajouter service</button>
                    :
                    <button className="tailleBoutonDashboard" onClick={isCloseAjoutServices}>Fermer</button>
                }

                {isOpenSupprimer === false ?
                    <button className="tailleBoutonDashboard" onClick={isOpenSupprimerService}>Supprimer service</button>
                    :
                    <button className="tailleBoutonDashboard" onClick={isCloseSupprimerService}>Fermer</button>
                }

                {isOpenCreer === false ?
                    <button className="tailleBoutonDashboard" onClick={isOpenCreerEmploye}>Créer compte employé</button>
                    :
                    <button className="tailleBoutonDashboard" onClick={isCloseCreerEmploye}>Fermer</button>
                }

                {isOpenSupprimerEmploye === false ?
                    <button className="tailleBoutonDashboard" onClick={isOpenSupprimerCompteEmploye}>Supprimer compte employé</button>
                    :
                    <button className="tailleBoutonDashboard" onClick={isCloseSupprimerCompteEmploye}>Fermer</button>
                }

                {isOpenVoiturePopulaire === false ?
                    <button className="tailleBoutonDashboard" onClick={isOpenCheckVoiturePopulaire}>Voir voiture populaire</button>
                    :
                    <button className="tailleBoutonDashboard" onClick={isCloseCheckVoiturePopulaire}>Fermer</button>
                }
                <BoutonFermeOuvert />
            </div>

            {isOpenAjout === false ?
                null
                :
                <AjoutServices />
            }


            {isOpenSupprimer === false ?
                null
                :
                <SupprimerServices />
            }

            {isOpenCreer === false ?
                null
                :
                <CreerEmploye />
            }

            {isOpenSupprimerEmploye === false ?
                null
                :
                <SupprimerEmploye />
            }

            {isOpenVoiturePopulaire === false ?
                null
                :
                <CheckVoiturePopulaire />
            }
        </div>
    );
};

export default BlocDashboardAdmin;
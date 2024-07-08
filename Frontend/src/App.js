import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Accueil from './pages/Accueil';
import Contact from './pages/Contact';
import "./App.css";
import DetailsVoiture from './pages/DetailsVoiture';
import SeConnecter from './pages/SeConnecter';
import Occasions from './pages/Occasions';
import DashboardAdmin from './pages/DashboardAdmin';
import Fermeture from './pages/Fermeture';
import DashboardEmploye from './pages/DashboardEmploye';

const App = () => {

  const ouvertOuFermer = localStorage.getItem('ouvert ou fermer');
  const token = localStorage.getItem('token');

  return (
    <>
      <BrowserRouter>
        <Routes>
          {!token && ouvertOuFermer === 'fermer' ?
            <>
              < Route path="/" element={<Fermeture />} />
              <Route path="/connexion" element={<SeConnecter />} />
            </>
            :
            <>
              <Route path="/" element={<Accueil />} />
              <Route path="/voiture/:id" element={<DetailsVoiture />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/voiture/:id/contact" element={<Contact />} />
              <Route path="/occasions" element={<Occasions />} />
              <Route path="/connexion" element={<SeConnecter />} />
              <Route path="/dashboard-admin" element={<DashboardAdmin />} />
              <Route path="/dashboard-employe" element={<DashboardEmploye />} />
            </>
          }
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
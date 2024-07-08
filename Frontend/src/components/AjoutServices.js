import React from 'react';
import { useState } from 'react';
import serviceDefault from '../image/garage-service-default.jpg'
import axios from 'axios';

const AjoutServices = () => {

    const [newServices, setNewServices] = useState(getDefaultService());

    function getDefaultService() {
        return {
            name: "service test",
            content: "lorem ipsum",
            image: serviceDefault,
        };
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newValue = value;

        setNewServices({
            ...newServices,
            [name]: newValue,
        });
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const img = e.target.files[0];
            setNewServices({
                ...newServices,
                image: img // Stocker le fichier lui-même, pas l'URL
            })
        }
    }

    const handleAddService = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        const headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': /*`Bearer ${token}`*/ token // Ajout du token dans l'en-tête Authorization
        };

        const formData = new FormData();

        formData.append('name', newServices.name);
        formData.append('content', newServices.content);
        formData.append('uploadImage', newServices.image);

        axios.post('http://localhost:3002/addService', formData, { headers })
            .then(response => {
                console.log(response.data);
                setNewServices(getDefaultService());

            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <div className="elementDashboardAdmin">
            <form onSubmit={handleAddService} method="POST" encType="multipart/form-data">
                <input
                    type="text"
                    name="name"
                    id="name"
                    className="intituleService"
                    placeholder="L'intitulé du service"
                    onChange={handleInputChange}
                    required
                />
                <label htmlFor="intituleService"></label>

                <textarea
                    name="content"
                    id="content"
                    cols="100"
                    rows="5"
                    placeholder="Explication du service"
                    onChange={handleInputChange}
                    required
                />
                <label htmlFor="content"></label>

                <input
                    type="file"
                    name="uploadImage"
                    id="uploadImage"
                    onChange={handleImageChange}
                />
                <label htmlFor="uploadImage"></label>
                <button className="buttonAjoutService" type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default AjoutServices;
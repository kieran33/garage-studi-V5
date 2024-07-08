import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const CheckVoiturePopulaire = () => {

    const [data, setData] = useState([]);
    const [dataVuesVoitures, setDataVuesVoitures] = useState([]);
    const [dataVuesVoituresTrier, setDataVuesVoituresTrier] = useState([]);

    const loadData = async () => {
        const response = await axios.get('http://localhost:3002/voitures')
        setData(response.data)
    }

    useEffect(() => {
        loadData();
    }, []);


    useEffect(() => {
        axios.get('http://localhost:3002/vues-voitures')
            .then(voitures => setDataVuesVoitures(voitures.data))
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        if (dataVuesVoitures.length > 0) {
            setDataVuesVoituresTrier(dataVuesVoitures.sort(function compare(a, b) {
                if (a.nombreVues > b.nombreVues) {
                    return -1;
                }
                else if (a.nombreVues < b.nombreVues) {
                    return 1;
                }
                else {
                    return 0;
                }
            }));
        }
    }, [dataVuesVoitures]);

    return (
        <div className="listeDeVoitures">
            {dataVuesVoituresTrier.map((vueVoiture, index) => (
                <div index={index} className="voiture">
                    {data.map((voiture, index) => (
                        <div key={index}>
                            {voiture.brand === vueVoiture.marque ?
                                <img className="imageVoiture"
                                    src={`http://localhost:3002/uploads/${voiture.image}`}
                                    alt={voiture.brand}
                                />
                                :
                                null
                            }
                        </div>
                    ))}
                    <p>Voiture {vueVoiture.marque}</p>
                    {vueVoiture.nombreVues === undefined ?
                        <p>0 vues</p>
                        :
                        <p>{vueVoiture.nombreVues} vues</p>
                    }
                </div>
            ))}
        </div>
    );
};

export default CheckVoiturePopulaire;
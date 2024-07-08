import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BlocVoitures = () => {

    const [minKilometrage, setMinKilometrage] = useState();
    const [maxKilometrage, setMaxKilometrage] = useState();
    const [minPrice, setMinPrice] = useState();
    const [maxPrice, setMaxPrice] = useState();
    const [minYear, setMinYear] = useState();
    const [maxYear, setMaxYear] = useState();
    const [data, setData] = useState([]);

    const [marqueVoiture, setMarqueVoiture] = useState("");
    const [id, setId] = useState("");

    const role = localStorage.getItem("role");

    const navigate = useNavigate();

    const loadData = async () => {
        const response = await axios.get('http://localhost:3002/voitures')
        setData(response.data)
    }

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            const filterKilometrage = data.map(voiture => voiture.km);
            const filterPrice = data.map(voiture => voiture.price);
            const filterYears = data.map(voiture => voiture.yearsCirculation);

            setMinKilometrage(Math.min(...filterKilometrage));
            setMaxKilometrage(Math.max(...filterKilometrage));
            setMinPrice(Math.min(...filterPrice));
            setMaxPrice(Math.max(...filterPrice));
            setMinYear(Math.min(...filterYears));
            setMaxYear(Math.max(...filterYears));

            setKilometrage(Math.max(...filterKilometrage));
            setPrice(Math.max(...filterPrice));
            setYear(Math.max(...filterYears));

            document.querySelector('input[name="kilometrage"]').value = maxKilometrage;
            document.querySelector('input[name="price"]').value = maxPrice;
            document.querySelector('input[name="years"]').value = maxYear;
        }
    }, [data]);

    const [kilometrage, setKilometrage] = useState(maxKilometrage);
    const [price, setPrice] = useState(maxPrice);
    const [year, setYear] = useState(maxYear);

    const filterVoiture = data.filter(
        (voiture) => (voiture.km >= minKilometrage && voiture.km <= kilometrage)
            && (voiture.price >= minPrice && voiture.price <= price)
            && (voiture.yearsCirculation >= minYear && voiture.yearsCirculation <= year)
    );

    const augmenterVue = () => {
        try {
            axios.put(`http://localhost:3002/augmenter-vues-voitures`, { marqueVoiture })
        } catch (error) {
            console.log(error);
        }
    };

    const detailsVoiture = () => {
        navigate(`/voiture/${id}`);
    };

    useEffect(() => {
        if (role === null && id !== "") {
            augmenterVue()
        }
        if (id !== "") {
            detailsVoiture()
        }
    }, [marqueVoiture])

    return (
        <>
            <div className="conteneurVoitures">
                <h1>Découvrez nos voitures</h1>
                <div className="filtreVoiture">
                    <div className="filtreKilometrage">
                        <label htmlFor="Kilometrage">Kilométrage</label>
                        <input
                            type="range"
                            name="kilometrage"
                            min={minKilometrage}
                            max={maxKilometrage}
                            defaultValue={maxKilometrage}
                            onChange={(e) => setKilometrage(e.target.value)}
                        />
                        <span>{minKilometrage} - {kilometrage} km </span>
                        <button className="boutonFiltre"
                            onClick={() => {
                                setKilometrage(maxKilometrage),
                                    document.querySelector('input[name="kilometrage"]').value = maxKilometrage;
                            }
                            }
                        >
                            Réinitialiser
                        </button>
                    </div>

                    <div className="filtrePrix">
                        <label htmlFor="price">Prix</label>
                        <input
                            type="range"
                            name="price"
                            min={minPrice}
                            max={maxPrice}
                            defaultValue={maxPrice}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <span>{minPrice} - {price} € </span>
                        <button className="boutonFiltre"
                            onClick={() => {
                                setPrice(maxPrice),
                                    document.querySelector('input[name="price"]').value = maxPrice;
                            }
                            }
                        >
                            Réinitialiser
                        </button>
                    </div>

                    <div className="filtreAnnee">
                        <label htmlFor="years">Année</label>
                        <input
                            type="range"
                            name="years"
                            min={minYear}
                            max={maxYear}
                            defaultValue={maxYear}
                            onChange={(e) => setYear(e.target.value)}
                        />
                        <span>{minYear} - {year} </span>
                        <button className="boutonFiltre"
                            onClick={() => {
                                setYear(maxYear),
                                    document.querySelector('input[name="years"]').value = maxYear;
                            }
                            }
                        >
                            Réinitialiser
                        </button>
                    </div>
                </div>
                <div className="listeDeVoitures">
                    {filterVoiture.map((voiture, index) => (
                        <div className="voiture" key={index}>
                            <div>
                                <img className="imageVoiture"
                                    src={`http://localhost:3002/uploads/${voiture.image}`}
                                    alt={voiture.brand}
                                />
                                <p>source image : {voiture.image}</p>
                                <p>Id : {voiture.id}</p>
                                <p>Marque : {voiture.brand}</p>
                                <p>Kilométrage : {voiture.km} km</p>
                                <p>Prix : {voiture.price} €</p>
                                <p>Mise en circulation en : {voiture.yearsCirculation}</p>
                                <button className="detailsVoiture"
                                    onClick={() => {
                                        setMarqueVoiture(voiture.brand)
                                        setId(voiture.id)
                                    }}>
                                    En savoir plus
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div >
        </>
    );
};

export default BlocVoitures;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddressDropdowns = () => {
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get('https://provinces.open-api.vn/api/?depth=1');
                setCities(response.data);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };

        fetchCities();
    }, []);

    const fetchDistricts = async (cityCode) => {
        try {
            const response = await axios.get(`https://provinces.open-api.vn/api/p/${cityCode}?depth=2`);
            setDistricts(response.data.districts);
        } catch (error) {
            console.error('Error fetching districts:', error);
        }
    };

    const fetchWards = async (districtCode) => {
        try {
            const response = await axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
            setWards(response.data.wards);
        } catch (error) {
            console.error('Error fetching wards:', error);
        }
    };

    const handleCityChange = (event) => {
        const cityCode = event.target.value;
        setSelectedCity(event.target.options[event.target.selectedIndex].text);
        setSelectedDistrict('');
        setSelectedWard('');
        fetchDistricts(cityCode);
    };

    const handleDistrictChange = (event) => {
        const districtCode = event.target.value;
        setSelectedDistrict(event.target.options[event.target.selectedIndex].text);
        setSelectedWard('');
        fetchWards(districtCode);
    };

    const handleWardChange = (event) => {
        setSelectedWard(event.target.options[event.target.selectedIndex].text);
    };

    return (
        <div>
            <h2>Address Dropdowns</h2>

            <div>
                <label>Province:</label>
                <select value={selectedCity} onChange={handleCityChange}>
                    <option value="" disabled>Select Province</option>
                    {cities.map((city) => (
                        <option key={city.code} value={city.code}>
                            {city.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>District:</label>
                <select value={selectedDistrict} onChange={handleDistrictChange}>
                    <option value="" disabled>Select District</option>
                    {districts.map((district) => (
                        <option key={district.code} value={district.code}>
                            {district.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Ward:</label>
                <select value={selectedWard} onChange={handleWardChange}>
                    <option value="" disabled>Select Ward</option>
                    {wards.map((ward) => (
                        <option key={ward.code} value={ward.code}>
                            {ward.name}
                        </option>
                    ))}
                </select>
            </div>

            <h2>
                {selectedCity && `${selectedCity} | `}
                {selectedDistrict && `${selectedDistrict} | `}
                {selectedWard}
            </h2>
        </div>
    );
};

export default AddressDropdowns;
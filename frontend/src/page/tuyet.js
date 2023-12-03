import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Tinhthanh = () => {
  const host = "https://provinces.open-api.vn/api/";

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  useEffect(() => {
    // Gọi API để lấy danh sách tỉnh thành
    callAPI('https://provinces.open-api.vn/api/?depth=1');
  }, []);

  const callAPI = (api, callback) => {
    axios.get(api)
      .then((response) => {
        if (callback) {
          callback(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const callApiDistrict = (provinceCode) => {
    const api = host + `p/${provinceCode}?depth=2`;
    callAPI(api, (data) => {
      setDistricts(data.districts);
    });
  };

  const callApiWard = (districtCode) => {
    const api = host + `d/${districtCode}?depth=2`;
    callAPI(api, (data) => {
      setWards(data.wards);
    });
  };

  const handleProvinceChange = (event) => {
    const provinceCode = event.target.value;
    setSelectedProvince(provinceCode);
    setSelectedDistrict('');
    setSelectedWard('');
    callApiDistrict(provinceCode);
  };

  const handleDistrictChange = (event) => {
    const districtCode = event.target.value;
    setSelectedDistrict(districtCode);
    setSelectedWard('');
    callApiWard(districtCode);
  };

  const handleWardChange = (event) => {
    const wardCode = event.target.value;
    setSelectedWard(wardCode);
    printResult();
  };

  const printResult = () => {
    if (selectedProvince && selectedDistrict && selectedWard) {
      const result =
        `${provinces.find(province => province.code === selectedProvince).name} | ` +
        `${districts.find(district => district.code === selectedDistrict).name} | ` +
        `${wards.find(ward => ward.code === selectedWard).name}`;
      document.querySelector("#result").innerText = result;
    }
  };

  return (
    <div className="container">
      <h1>Chọn danh sách tỉnh</h1>
      <form>
        <select name="" id="province" onChange={handleProvinceChange} value={selectedProvince}>
          {provinces.map((province) => (
            <option key={province.code} value={province.code}>{province.name}</option>
          ))}
        </select>
        <select name="" id="district" onChange={handleDistrictChange} value={selectedDistrict}>
          <option value="">chọn quận</option>
          {districts.map((district) => (
            <option key={district.code} value={district.code}>{district.name}</option>
          ))}
        </select>
        <select name="" id="ward" onChange={handleWardChange} value={selectedWard}>
          <option value="">chọn phường</option>
          {wards.map((ward) => (
            <option key={ward.code} value={ward.code}>{ward.name}</option>
          ))}
        </select>
      </form>
      <h2 id="result"></h2>
    </div>
  );
};

export default Tinhthanh;

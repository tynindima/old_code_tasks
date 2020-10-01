import React, { useState } from 'react'

const Task8_14 = () => {
  const [cities, setCities] = useState([]);
  const [numOfCity, setNumOfCity] = useState(0);
  const [city, setCity] = useState('');

  const handlerChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'city':
        setCity(value);
        break;
      case 'cities':
        setNumOfCity(value);
        break;
      default:
        break;
    }
  };

  const handlerSubmitAddCity = (e) => {
    e.preventDefault();

    setCities([...cities, city]);
  };

  const optionsOfCities = cities.map((city, i) => (
    <option key={i} value={i}>{city}</option>
  ));

  return (
    <div>
      <p>City that was chosen is {cities[numOfCity]}</p>
      <select
        name="cities"
        value={numOfCity}
        onChange={handlerChange}
      >
        {optionsOfCities}
      </select>
      <p>Enter any city</p>
      <form onSubmit={handlerSubmitAddCity}>
        <input
          type="text"
          name="city"
          value={city}
          onChange={handlerChange}
          autoComplete="off"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default Task8_14;

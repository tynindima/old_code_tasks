import React, { useState } from 'react'

const Task8_14 = () => {
  const [cities, setCities] = useState([]);
  const numOfCity = useInputChange(0);
  const city = useInputChange('');

  const handlerSubmitAddCity = (e) => {
    e.preventDefault();

    setCities([...cities, city.value]);
    city.onClear();
  };

  const optionsOfCities = cities.map((city, i) => (
    <option key={i} value={i}>{city}</option>
  ));

  return (
    <div>
      <p>City that was chosen is {cities[numOfCity.value]}</p>
      <select
        name="cities"
        value={numOfCity.value}
        onChange={numOfCity.onChange}
      >
        {optionsOfCities}
      </select>
      <p>Enter any city</p>
      <form onSubmit={handlerSubmitAddCity}>
        <input
          type="text"
          name="city"
          value={city.value}
          onChange={city.onChange}
          autoComplete="off"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

function useInputChange(initialState) {
  const [value, setValue] = useState(initialState);

  const handlerChange = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  const hadnlerClearInput = () => {
    setValue('');
  };

  return {
    value,
    onChange: handlerChange,
    onClear: hadnlerClearInput
  };
}

export default Task8_14;

import React, { useEffect, useState } from 'react'

const cur = [
  {
    base: 'usd',
    ratest: {
      uah: 28.3,
      eur: 0.85,
      usd: 1,
    },
  },
  {
    base: 'eur',
    ratest: {
      uah: 33.1,
      usd: 1.17,
      eur: 1,
    },
  },
  {
    base: 'uah',
    ratest: {
      usd: 0.035,
      eur: 0.03,
      uah: 1,
    },
  },
];

const Task8_15 = () => {
  const [currency, setCurrency] = useState('');
  const [firstCurrency, setFirstCurrency] = useState('usd');
  const [secondCurrency, setSecondCurrency] = useState('usd');
  const [convertedSum, setConvertedSum] = useState(null);

  const handlerChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'currency':
        setCurrency(value.replace(/[^\d]/g, ''));
        break;
      case 'firstCurrency':
        setFirstCurrency(value);
        break;
      case 'secondCurrency':
        setSecondCurrency(value);
        break;
      default:
        break;
    }
  };

  const handlerSubmitConverCur = (e) => {
    e.preventDefault();

    //finds selected currency
    const sol = cur.find(item => item.base === firstCurrency);
    //take value of currency
    const cunvertIndex = sol.ratest[secondCurrency];

    setConvertedSum((currency * cunvertIndex).toFixed(2));
  };

  return (
    <div>
      <form onSubmit={handlerSubmitConverCur}>
        <input
          type="number"
          name="currency"
          value={currency}
          onChange={handlerChange}
          autoComplete="off"
        />
        <CurrencySelect
          name="firstCurrency"
          value={firstCurrency}
          onChange={handlerChange}
        />
        <CurrencySelect
          name="secondCurrency"
          value={secondCurrency}
          onChange={handlerChange}
        />
        <button type="submit">Convert</button>
      </form>
      <p>Converted sum: {convertedSum}</p>
    </div>
  )
}

const CurrencySelect = (props) => {
  const {
    name,
    value,
    onChange
  } = props;

  return (
    <select
          name={name}
          value={value}
          onChange={onChange}
        >
          {cur.map((option) => (
            <option key={option.base} value={option.base}>{option.base}</option>
          ))}
        </select>
  );
}

export default Task8_15;

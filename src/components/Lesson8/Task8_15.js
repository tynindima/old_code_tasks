import React, { useRef, useState } from 'react';

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
  const currensies = useRef(cur);
  const currency = useChangeInput('');
  const firstCurrency = useChangeInput('usd');
  const secondCurrency = useChangeInput('usd');
  const convertedSum = useSumbitConvertCurrency(currensies.current, currency.value, firstCurrency.value, secondCurrency.value);

  return (
    <div>
      <form onSubmit={convertedSum.onSubmit}>
        <input
          type="number"
          name="currency"
          autoComplete="off"
          value={currency.value}
          onChange={currency.onChange}
        />
        <CurrencySelect
          name="firstCurrency"
          value={firstCurrency.value}
          onChange={firstCurrency.onChange}
        />
        <CurrencySelect
          name="secondCurrency"
          value={secondCurrency.value}
          onChange={secondCurrency.onChange}
        />
        <button type="submit">Convert</button>
      </form>
      <p>Converted sum: {convertedSum.value}</p>
    </div>
  )
}

function useChangeInput(initialState) {
  const [value, setValue] = useState(initialState);

  const handlerChange = (e) => {
      e.target.name === 'currency' ? setValue(e.target.value.replace(/[^\d]/g, '')) : setValue(e.target.value)
      setValue(e.target.value);
  }

  return {
    value,
    onChange: handlerChange,
  };
};

function useSumbitConvertCurrency(arrayOfCurrencies, currency, first, second) {
  const [value, setValue] = useState(null);


  const handlerSubmitConverCur = (e) => {
    e.preventDefault();

    //finds selected currency
    const sol = arrayOfCurrencies.find(item => item.base === first);
    //take value of currency
    const cunvertIndex = sol.ratest[second];

    setValue((currency * cunvertIndex).toFixed(2));
  };

  return {
    value,
    onSubmit: handlerSubmitConverCur
  };
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

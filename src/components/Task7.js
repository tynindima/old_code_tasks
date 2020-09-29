import React, { useState } from 'react';

//variables
const sities = ['Kyiv', 'Odessa', 'Kharkiv', 'Lviv', 'Kherson', 'Hola Prystan'];
const cssColors = ['black', 'yellow', 'green', 'red', 'blue', 'orange'];
const paragraphs = ['text 1', 'text 2', 'text 3'];
const initialOptions = ['option 1', 'option 2', 'option 3', 'option 4'];
const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
const months = [1,2,3,4,5,6,7,8,9,10,11,12];
const years = [2018, 2020, 2021, 2022, 2023, 2024];
const initDay = (new Date()).getDate();
const initMonth = (new Date()).getMonth();
const initYear = (new Date()).getFullYear();

const Task7 = () => {
  const [text1, setText1] = useState('');
  const [isChecked, setIsChecked] = useState(true);
  const [city, setCity] = useState(0);
  const [isRadio, setIsRadio] = useState('1');
  const [textarea1, setTextarea1] = useState('');
  const [texts, setTexts] = useState([]);
  const [indexColor, setIndexColor] = useState(0);
  const [mark, setMark] = useState('0');
  const [isParagraph, setIsParagraph] = useState(0);
  const [options, setOptions] = useState(initialOptions);
  const [cheangeableSelect, setCheangeableSelect] = useState(0);
  const [newOption, setNewOption] = useState('');
  const [isInput, setIsInput] = useState(true);
  const [day, setDay] = useState(initDay);
  const [month, setMonth] = useState(initMonth);
  const [year, setYear] = useState(initYear);

  const handlerChange = (e) => {
    const {name, value} = e.target;
    switch (name) {
      case 'text1':
        setText1(value);
        break;
      case 'cities':
        setCity(value);
        break
      case 'textarea1':
        setTextarea1(value);
        break;
      case 'indexColor':
        setIndexColor(value);
        break;
      case 'isMarked':
        setMark(value);
        break;
      case 'isParagraph':
        setIsParagraph(+value);
        break;
      case 'cheangeableSelect':
        setCheangeableSelect(+value);
        break;
      case 'newOption':
        setNewOption(value);
        break;
      case 'day':
        setDay(value);
        break;
      case 'month':
        setMonth(value);
        break;
      case 'year':
        setYear(value);
        break;
      default:
          break;
    }
  };

  const handlerCheck = () => {
    setIsChecked(!isChecked);
  }

  const handleRadioSet = (e) => {
    const {value} = e.target;

    setIsRadio(value);
  };

  const handleSubmitTexts = (e) => {
    e.preventDefault();

    setTexts([...texts, textarea1]);
  };

  const handleMarkedCheck = () => {
    setMark(mark === '0' ? '1' : '0');
  };

  const handleSumbitAddNewOption = (e) => {
    e.preventDefault();

    setOptions([...options, newOption]);
  };

  const handlerIsBlockInput = () => {
    setIsInput(!isInput);
  };

  //paragraph is hidden or visible depends of checked
  const paragraph = isChecked ? <p>Hiden paragraph</p> : null;

  //option of cities
  const optionsOfCities = sities.map((item, i) => (
    <option key={i} value={i}>{item}</option>
  ));

  //paragraphs with text from textarea
  const paragraphsOfTexts = texts.map((item, i) => (
    <p key={i}>{item}</p>
  ));

  //option of paragraphs
  const optionsOfParagraphs = paragraphs.map((item, i) => (
    <option key={i} value={i}>{item}</option>
  ));

  //option of css colors
  const optionCssColors = cssColors.map((item, i) => (
    <option key={i} value={i}>{item}</option>
  ));

  //changeable options of select
  const changeableOptions = options.map((item, i) => (
    <option key={i} value={i}>{item}</option>
  ));

  // options of days
  const optionsOfDays = days.map((item, i) => (
    <option key={i} value={item}>{item}</option>
  ));

  // options of month
  const optionsOfMonths = months.map((item, i) => (
    <option key={i} value={i}>{item}</option>
  ));

  // options of years
  const optionsOfYears = years.map((item, i) => (
    <option key={i} value={item}>{item}</option>
  ));

  //get day of week
  const currentDay = day < 10 ? `0${day}` : `${day}`;
  const currentMonth = month < 10 ? `0${+month + 1}` : `${+month + 1}`;
  const dayOfTheWeek = (new Date(`${year}-${currentMonth}-${currentDay}`)).getDay();


  let selectedParagraph = <p></p>;
  switch(isParagraph) {
    case 0:
      selectedParagraph = <p>Paragraph number one</p>;
      break;
    case 1:
      selectedParagraph = <p>Paragraph number two</p>;
      break;
    case 2:
      selectedParagraph = <p>Paragraph number three</p>;
      break;
    default:
      break;
  }

  return (
    <div>
      <div>
        <p>1. Text of textarea: {text1}</p>
        <textarea
          name="text1"
          value={text1}
          onChange={handlerChange}
        />

        <p>2. State of checkbox: {isChecked ? 'Checked' : 'Not checked'}</p>
        {paragraph}
        <input
          type="checkbox"
          name="isChecked"
          checked={isChecked}
          onChange={handlerCheck}
        />

        <p>3. A selected city: {sities[city]}</p>
        <select
          name="cities"
          value={city}
          onChange={handlerChange}
        >
          {optionsOfCities}
        </select>

        <p>4. Selected radio is: {isRadio}</p>
        <input
          type="radio"
          value="1"
          checked={isRadio === "1"}
          onChange={handleRadioSet}
        />
        <input
          type="radio"
          value="2"
          checked={isRadio === "2"}
          onChange={handleRadioSet}
        />
        <input
          type="radio"
          value="3"
          checked={isRadio === "3"}
          onChange={handleRadioSet}
        />
      </div>

      <div>
        <h3>Practic</h3>

        <div>
          <p>Practic task 7</p>
          <form onSubmit={handleSubmitTexts}>
            <textarea
              name="textarea1"
              value={textarea1}
              onChange={handlerChange}
            />
            <button type="submit">Add text</button>
          </form>
          <div>
            {paragraphsOfTexts}
          </div>
        </div>

        <div>
          <p style={{color: cssColors[indexColor]}}>Practic task8</p>
          <select
            name="indexColor"
            value={indexColor}
            onChange={handlerChange}
          >
            {optionCssColors}
          </select>
        </div>

        <div>
          <p>Practic task9</p>
          <select
            name="isMarked"
            value={mark}
            onChange={handlerChange}
          >
            <option value="0">marked</option>
            <option value="1">not marked</option>
          </select>
          <input
            type="checkbox"
            checked={mark === '0'}
            onChange={handleMarkedCheck}
          />
        </div>

        <div>
          <p>Particle task10</p>
          <select
            name="isParagraph"
            value={isParagraph}
            onChange={handlerChange}
          >
            {optionsOfParagraphs}
          </select>
          {selectedParagraph}
        </div>

        <div>
          <p>Particle task 11</p>
          <select
            name="cheangeableSelect"
            value={cheangeableSelect}
            onChange={handlerChange}
          >
            {changeableOptions}
          </select>
          <form onSubmit={handleSumbitAddNewOption}>
            <input
              type="text"
              name="newOption"
              value={newOption}
              onChange={handlerChange}
            />
            <button type="submit">Add new option</button>
          </form>
        </div>

        <div>
          <p>Praticle task 12</p>
          <input
            type="text"
            disabled={!isInput}
          />
          <input
            type="checkbox"
            name="isInput"
            checked={isInput}
            onChange={handlerIsBlockInput}
          />
        </div>

        <div>
          <p>Practicle task 13</p>
          <p>Selected day of the week is {dayOfTheWeek}</p>
          <select
            name="day"
            value={day}
            onChange={handlerChange}
          >
            {optionsOfDays}
          </select>
          <select
            name="month"
            value={month}
            onChange={handlerChange}
          >
            {optionsOfMonths}
          </select>
          <select
            name="year"
            value={year}
            onChange={handlerChange}
          >
            {optionsOfYears}
          </select>
        </div>
      </div>
    </div>
  )
}

export default Task7;


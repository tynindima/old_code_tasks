import React, { useState } from 'react';

const engDaysOfTheWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const rusDaysOfTheWeek = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресение'];
const Task8_10 = () => {
  const [lang, setLang] = useState('rus');

  //changes language
  const handleChangeSelectLang = (e) => {
    const { value } = e.target;

    setLang(value);
  };

  const optionsOfRusDays = rusDaysOfTheWeek.map((day, i) => (
    <option key={i} value={i}>{day}</option>
  ));

  const optionsOfEngDays = engDaysOfTheWeek.map((day, i) => (
    <option key={i} value={i}>{day}</option>
  ));

  return (
    <div>
      <select
        name="lang"
        value={lang}
        onChange={handleChangeSelectLang}
      >
        <option value="rus">rus</option>
        <option value="eng">eng</option>
      </select>
      <select name="days">
        {lang === 'rus' ? optionsOfRusDays : optionsOfEngDays}
      </select>
    </div>
  )
}

export default Task8_10;

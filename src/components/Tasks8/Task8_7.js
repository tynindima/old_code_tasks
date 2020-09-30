import React, { useState } from 'react';

const routes = ['Kyiv-Odessa', 'Lviv-Kyiv', 'Kherson-Cherkasy', 'Kharkiv-Odessa'];

const Task8_7 = () => {
  const [currentRoute, setCurrentRoute] = useState(routes[0]);

  const handlerRadioChange = (e) => {
    const {value} = e.target;

    setCurrentRoute(value);
  };

  const list = routes.map((route, i) => (
    <li>
      {route}
      <input
        type="radio"
        name="route"
        value={route}
        checked={route === currentRoute}
        onChange={handlerRadioChange}
      />
    </li>
  ));
  return (
    <div>
      <ul>
        {list}
      </ul>
      <p>Selected route is {currentRoute}</p>
    </div>
  )
}

export default Task8_7;


import React from 'react';

import './task9_1.css';

const users = [
  {name: 'Kolya', surname: 'Smith', age: 30},
  {name: 'Dima', surname: 'Kravchenko', age: 25},
  {name: 'Vanya', surname: 'Fedorovich', age: 23},
  {name: 'Pasha', surname: 'Balbot', age: 32},
  {name: 'Vova', surname: 'Galchenko', age: 18},
  {name: 'Nikita', surname: 'Panfilenko', age: 40}
];

const Task9_1 = () => {

  const usersList = users.map((user, i) => (
    <User key={i} user={user}/>
  ));

  return (
    <>
      <ul className="list">
        {usersList}
      </ul>
    </>
  )
};

const User = ({user}) => {
  const {
    name,
    surname,
    age
  } = user;

  return (
    <li className="item">
      <p>Name: {name}</p>
      <p>Surname: {surname}</p>
      <p>Age: {age}</p>
    </li>
  );
};

export default Task9_1;

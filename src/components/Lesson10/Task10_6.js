import React, { useState } from 'react';
import { useCallback } from 'react';

import './task10_6.css';

const initialUsers = [
  {name: 'Kolya', age: 30},
  {name: 'Dima', age: 25},
  {name: 'Vanya', age: 23},
  {name: 'Pasha', age: 32},
  {name: 'Vova', age: 18},
  {name: 'Nikita', age: 40}
];

const Task10_6 = () => {
  const [users, setUsers] = useState(initialUsers);

  const handlerChangeUserName = (index, name) => {
    setUsers(users.map((user, i) => {
      if (i === index) {
        return {
          ...user,
          name
        };
      }

      return user;
    }));
  };

  const listOfUsers = users.map((user, i) => (
    <User
      key={i}
      user={user}
      number={i}
      toChangeName={handlerChangeUserName}
    />
  ));

  return (
    <ul>
      {listOfUsers}
    </ul>
  )
}

const User = (props) => {
  const { user, number, toChangeName } = props;
  const {
    name,
    age
     } = user;
  const [text, setText] = useState(name);
  const [isEdit, setIsEdit] = useState(false);

  const handlerOnBlur = () => {
    toChangeName(number, text);
    setIsEdit(false);
  };

  const handleEditClick = useCallback(
    () => setIsEdit(true),
    [],
  )

  return (
    <li className="item">
      <form>
        <p>{name}</p>
        <p>{age}</p>
        <a
          href="!#"
          style={{display: isEdit ? 'none' : 'inline'}}
          onClick={handleEditClick}
        >
          edit
        </a>
        <input
          type="text"
          style={{display: isEdit ? 'block' : 'none'}}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handlerOnBlur}
        />
      </form>
    </li>
  );
};

export default Task10_6;

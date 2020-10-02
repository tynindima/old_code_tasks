import React, { useState } from 'react';

const initialNames = [
  {id: 1, name: 'Kolya', isFocus: false},
  {id: 2, name: 'Dima', isFocus: false},
  {id: 3, name: 'Vanya', isFocus: false},
  {id: 4, name: 'Pasha', isFocus: false},
  {id: 5, name: 'Vova', isFocus: false},
  {id: 6, name: 'Nikita', isFocus: false}
];

const Task8_5 = () => {
  const [users, setUsers] = useState(initialNames);

  const handlerChangeUserName = (id, name) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        console.log(user.name, name);
        return {
          ...user,
          name: name,
          isFocus: false
        };
      }

      return user;
    }));
  };

  // On focus
  const handlerOnFocus = (id) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        return {
          ...user,
          isFocus: true
        };
      }

      return user;
    }));
  };

  const linstOfUsers = users.map(user => (
    <li
      key={user.id}
      onClick={() => handlerOnFocus(user.id)}
    >
      {user.isFocus ? '' : user.name}
      <UserInput
        id={user.id}
        name={user.name}
        isFocus={user.isFocus}
        handlerChangeUserName={handlerChangeUserName}
      />
    </li>
  ));

  return (
    <div>
      <h3>task 5</h3>
      <ul>
        {linstOfUsers}
      </ul>
    </div>
  )
}


//Component UserInput for chaging its own state
function UserInput(props) {
  const {
    id,
    name,
    isFocus,
    handlerChangeUserName,
  } = props;

  const [user, setUser] = useState(name);

  const handlerInputChange = (e) => {
    const { value } = e.target;

    setUser(value);

  };

  const handlerOnBlur = () => {
    handlerChangeUserName(id, user);
  };

  return (
    <>
      <input
        type="text"
        value={user}
        onChange={handlerInputChange}
        onBlur={handlerOnBlur}
        style={{display: isFocus ? 'block' : 'none'}}
      />
    </>
  );
};

export default Task8_5;

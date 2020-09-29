import React, { useState } from 'react';

const initialNames = [
  {id: 1, name: 'Kolya', isChecked: true},
  {id: 2, name: 'Dima', isChecked: true},
  {id: 3, name: 'Vanya', isChecked: true},
  {id: 4, name: 'Pasha', isChecked: true},
  {id: 5, name: 'Vova', isChecked: true},
  {id: 6, name: 'Nikita', isChecked: true}
];

const initialUsers = [
    {name: 'Коля', surname: 'Иванов', age: 30, isChecked: true},
		{name: 'Вася', surname: 'Петров', age: 40, isChecked: true},
		{name: 'Петя', surname: 'Сидоров', age: 50, isChecked: true},
];

const Task8_3_4 = () => {
  const [names, setNames] = useState(initialNames);
  const [users, setUsers] = useState(initialUsers);

  const handlerNamesCheck = (id) => {
    setNames(names.map(item => {
      if (item.id === id) {
        return {
          ...item,
          isChecked: !item.isChecked
        }
      }

      return item;
    }));
  };

  const handleUserCheck = (index) => {
    setUsers(users.map((user, i) => {
      if (i === index) {
        return {
          ...user,
          isChecked: !user.isChecked
        }
      }

      return user;
    }));
  };

  //paragraphs with inputs
  const paragraphOfNames = names.map(item => (
    <div>
      <input
        type="checkbox"
        name="isChecked"
        checked={item.isChecked}
        onChange={() => handlerNamesCheck(item.id)}
      />
      <p key={item.id} style={{display: item.isChecked ? 'block' : 'none'}}>
        {item.name}
      </p>
    </div>
  ));

  //list of users with checkboxs
  const listOfUsers = users.map((user, i) => (
    <li key={i}>
      {
        `${user.name}
        ${user.isChecked ? user.surname : ''}
        ${user.isChecked ? user.age: ''}`
      }
      <input
        type="checkbox"
        name="isUser"
        checked={user.isChecked}
        onChange={() => handleUserCheck(i)}
      />
    </li>
  ));

  return (
    <div>
      <h3>checkbox + ifs</h3>
      <p>3.</p>
      {paragraphOfNames}

      <p>4.</p>
      <ul>
        {listOfUsers}
      </ul>
    </div>
  )
}

export default Task8_3_4;


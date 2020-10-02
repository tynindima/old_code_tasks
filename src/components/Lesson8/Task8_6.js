import React, { useState } from 'react';
import './task8_6.css';

const initialUsers = [
  {name: 'Коля', age: 30},
  {name: 'Вася', age: 40},
  {name: 'Петя', age: 50},
];

const initialUsersChecks = initialUsers.map((item) => {
  return {name: false, age: false};
});

const Task8_6 = () => {
  const [users, setUsers] = useState(initialUsers);
  const [usersChecks, setUsersChecks] = useState(initialUsersChecks);

  const handlerUserChange = (index, name, value) => {
    setUsers(users.map((user, i) => {
      if (i === index) {
        return {
          ...user,
          [name]: value
        };
      }

      return user;
    }));

    setUsersChecks(usersChecks.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          [name]: false
        }
      }

      return item;
    }));
  };

  const handlerOnEdit = (index, name) => {
    setUsersChecks(usersChecks.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          [name]: true
        }
      }

      return item;
    }));
  };

  const rowsOfUsers = users.map((user, i) => (
    <tr key={i} className="row">
      <td className="col">
        <div className="box">
          {usersChecks[i].name ? '' : user.name}
          <Input
            name="name"
            value={user.name}
            index={i}
            isCheck={usersChecks[i].name}
            onChange={handlerUserChange}
          />
          <button
            type="button"
            onClick={() => handlerOnEdit(i, "name")}
          >
            Редактировать
          </button>
        </div>
      </td>
      <td className="col">
        <div className="box">
          {usersChecks[i].age ? '' : user.age}
          <Input
            name="age"
            value={user.age}
            index={i}
            isCheck={usersChecks[i].age}
            onChange={handlerUserChange}
          />
          <button
            type="button"
            onClick={() => handlerOnEdit(i, "age")}
          >
            Редактировать
          </button>
        </div>
      </td>
    </tr>
  ));

  return (
    <>
      <table className="table">
        <thead>
          <tr className="row">
            <th className="col">Name</th>
            <th className="col">Age</th>
          </tr>
        </thead>
        <tbody>
          {rowsOfUsers}
        </tbody>
      </table>
    </>
  )
}

function Input(props) {
  const {
    name,
    value,
    index,
    isCheck,
    onChange
  } = props;

  const [text, setText] = useState(value);

  const handleChange = (e) => {
    const { value } = e.target;

    setText(value);
  };

  const handlerOnBlur = () => {
    onChange(index, name, text);
  }

  return (
    <>
      <input
        name={name}
        type="text"
        value={text}
        onChange={handleChange}
        onBlur={handlerOnBlur}
        style={{display: isCheck ? 'block' : 'none'}}
        autoComplete="off"
      />
    </>
  );
};

export default Task8_6;

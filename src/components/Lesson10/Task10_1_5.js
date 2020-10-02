import React, { useState } from 'react';

const initialUsers = [
  {name: 'Kolya', surname: 'Smith', age: 30},
  {name: 'Dima', surname: 'Kravchenko', age: 25},
  {name: 'Vanya', surname: 'Fedorovich', age: 23},
  {name: 'Pasha', surname: 'Balbot', age: 32},
  {name: 'Vova', surname: 'Galchenko', age: 18},
  {name: 'Nikita', surname: 'Panfilenko', age: 40}
];

const Task10_1_5 = () => {
  const [users, setUsers] = useState(initialUsers);

  const deleteUser = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  const rowsOfUsers = users.map((user, i) => (
    <User
      key={i}
      user={user}
      deleteUser={deleteUser}
      number={i}
    />
  ));

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Age</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
        {rowsOfUsers}
      </tbody>
    </table>
  )
}

const User = (props) => {
  const {
    user,
    deleteUser,
    number
  } = props;
  const {
    name,
    surname,
    age
  } = user;
  return (
    <tr>
      <td>{name}</td>
      <td>{surname}</td>
      <td>{age}</td>
      <td><a href="!#" onClick={() => deleteUser(number)}>Delete</a></td>
    </tr>
  );
};

export default Task10_1_5;

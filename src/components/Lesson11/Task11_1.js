import React, { useState, } from 'react';

import './task11_1.css';

const initialUsers = [
  {name: 'Kolya', surname: 'Smith', days: 24, salaryPerDay: 300},
  {name: 'Dima', surname: 'Kravchenko', days: 23, salaryPerDay: 200},
  {name: 'Vanya', surname: 'Fedorovich', days: 18, salaryPerDay: 150},
  {name: 'Pasha', surname: 'Balbot', days: 16, salaryPerDay: 180},
  {name: 'Vova', surname: 'Galchenko', days: 21, salaryPerDay: 220},
  {name: 'Nikita', surname: 'Panfilenko', days: 20, salaryPerDay: 140}
];

const Task11_1 = () => {
  const users = useUsersChange(initialUsers);

  return (
    <div>
      <WorksTable
        users={users.value}
        onChangeSum={users.onChange}
      />
      <SumOfSalaries users={users.value}/>
    </div>
  )
}

const WorksTable = (props) => {
  const {
    users,
    onChangeSum
  } = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <th className="col">Name</th>
          <th className="col">Surname</th>
          <th className="col">Days</th>
          <th className="col">Salary per day</th>
          <th className="col">Total salary</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, i) => (
          <User
            key={user.name}
            user={user}
            onChangeSum={onChangeSum}
          />
        ))}
      </tbody>
    </table>
  );
};

const User = ({user, onChangeSum}) => {
  const {
    name,
    surname,
    days,
    salaryPerDay
  } = user;

  const usersDay = useInputChange(days, name, onChangeSum);
  const userSalary = useInputChange(salaryPerDay, name, onChangeSum);

  const sum = days * salaryPerDay;

  return (
    <tr>
      <td className="col">{name}</td>
      <td className="col">{surname}</td>
      <td className="col">
        <Input
          name="days"
          value={usersDay.value}
          onChange={usersDay.onChange}
        />
      </td>
      <td className="col">
          <Input
            name="salaryPerDay"
            value={userSalary.value}
            onChange={userSalary.onChange}
          />
      </td>
      <td className="col">{sum}</td>
    </tr>
  );
};

const Input = (props) => {
  const {
    name,
    value,
    onChange
  } = props;

  const handlerSumbit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handlerSumbit}>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
      />
    </form>
  );
};

const SumOfSalaries = (props) => {
  const { users } = props;

  const totalSum = users.reduce((acc, user) => {
    const sum = user.days * user.salaryPerDay;
    return acc + sum;
  }, 0);

  return (
    <div>
      <p>Sum of all salaries: {totalSum}</p>
    </div>
  );
};

function useUsersChange(initialState) {
  const [value, setValue] = useState(initialState);

  const handlerChangeSum = (id, name, sum) => {
    setValue(value.map((user) => {
      if (user.name === id) {
        return {
          ...user,
          [name]: sum
        };
      }

      return user;
    }));
  };

  return {
    value,
    onChange: handlerChangeSum
  };
}

function useInputChange(initialState, name, onChangeMainValue) {
  const [value, setValue] = useState(initialState);

  const handleChange = ({ target }) => {
    setValue(target.value);
    onChangeMainValue(name, target.name, target.value);
  };

  return {
    value,
    onChange: handleChange
  };
}

export default Task11_1;

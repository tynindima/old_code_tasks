import React, { useState } from 'react';

import './task8_12.css';

const initialWorkers = [
  {name: 'Kolya', surname: 'Smith', salary: 5000, gender: 'male'},
  {name: 'Dima', surname: 'Kravchenko', salary: 7000, gender: 'male'},
  {name: 'Nastya', surname: 'Fedorovich', salary: 3000, gender: 'female'},
  {name: 'Pasha', surname: 'Balbot', salary: 2000, gender: 'male'},
  {name: 'Lina', surname: 'Galchenko', salary: 4000, gender: 'female'},
  {name: 'Vika', surname: 'Panfilenko', salary: 1000, gender: 'female'}
];

const Task8_12 = () => {
  const [workers, setWorkers] = useState(initialWorkers);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [salary, setSalary] = useState('');
  const [gender, setGender] = useState('male');


  //Changeng state for ever input field
  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'surname':
        setSurname(value);
        break;
      case 'salary':
        setSalary(value);
        break;
      case 'gender':
        setGender(value);
        break;
      default:
        break;
    }
  };

  //Adding new worker to all workers table
  const handleSubmitAddNewWorker = (e) => {
    e.preventDefault();

    const newWorker = { name, surname, salary, gender };

    setWorkers([...workers, newWorker]);
  }

  // Rows of workers
  const rowsOfWorkers = workers.map((worker, i) => (
    <Worker key={i} worker={worker} />
  ));

  //arr for using Input components
  const arrForInputs = [
    { name: 'name', value: name },
    { name: 'surname', value: surname },
    { name: 'salary', value: salary }
  ];

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th className="col">Name</th>
            <th className="col">Surname</th>
            <th className="col">Salary</th>
            <th className="col">Gender</th>
          </tr>
        </thead>
        <tbody>
          {rowsOfWorkers }
        </tbody>
      </table>

      <form onSubmit={handleSubmitAddNewWorker}>
        {arrForInputs.map((item, i) => (
          <Input
          key={i}
          name={item.name}
          value={item.value}
          onChange={handleChange}
        />
        ))}
        <select
          name="gender"
          value={gender}
          onChange={handleChange}
        >
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

const Worker = ({worker}) => {
  const {
    name,
    surname,
    salary,
    gender
  } = worker;

  return (
    <>
      <tr>
        <td className="col">{name}</td>
        <td className="col">{surname}</td>
        <td className="col">{salary}</td>
        <td className="col">{gender}</td>
      </tr>
    </>
  );
};

const Input = (props) => {
  const {
    name,
    value,
    onChange,
  } = props;

  return (
    <div className="box">
      <label htmlFor={name} className="label">{name}</label>
      <input
        className="input"
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
    </div>
  );
};

export default Task8_12;

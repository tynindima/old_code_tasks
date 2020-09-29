import React, { useState } from 'react';

//variable
const initialNames = [
  {id: 1, name: 'Kolya', isChecked: false},
  {id: 2, name: 'Dima', isChecked: false},
  {id: 3, name: 'Vanya', isChecked: false},
  {id: 4, name: 'Pasha', isChecked: false},
  {id: 5, name: 'Vova', isChecked: false},
  {id: 6, name: 'Nikita', isChecked: false}
];

const initialWorkers = [
  {id: 1, name: 'Kolya', surname: 'Tynin', salary: 5000, isMarked: true},
  {id: 2, name: 'Dima', surname: 'Tynin', salary: 10000, isMarked: true},
  {id: 3, name: 'Vanya', surname: 'Fedorovich', salary: 3000, isMarked: true},
  {id: 4, name: 'Pasha', surname: 'Balbot', salary: 2000, isMarked: true},
  {id: 5, name: 'Vova', surname: 'Galchenko', salary: 4000, isMarked: true},
  {id: 6, name: 'Nikita', surname: 'Panfilenko', salary: 1000, isMarked: true}
];

const Task8_1_2 = () => {
  const [arrOfNames, setArrOfNames] = useState(initialNames);
  const [workers, setWorkers] = useState(initialWorkers);

  const handleCheckBox = (id) => {
    setArrOfNames(arrOfNames.map(item => {
      if (item.id === id) {
        return {
          ...item,
          isChecked: !item.isChecked
        };
      }

      return item;
    }));
  };

  const handleCheckWorkersSalary = (id) => {
    setWorkers(workers.map(worker => {
      if (worker.id === id) {
        return {
          ...worker,
          isMarked: !worker.isMarked,
        };
      }

      return worker;
    }));
  };

  //list on names with conditions isChecked
  const list = arrOfNames.map((item) => (
    <li key={item.id} style={{ textDecoration: item.isChecked ? 'line-through' : 'none' }}>
      {item.name}
      <input
        type="checkbox"
        name="line"
        checked={item.isChecked}
        onChange={() => handleCheckBox(item.id)}
      />
    </li>
  ));

  //list of workers with their data
  const listOfWorkers = workers.map(item => (
    <tr key={item.id}>
      <td>{item.name}</td>
      <td>{item.surname}</td>
      <td>{item.salary}</td>
      <td>
        <input
          type="checkbox"
          name="isMarked"
          checked={item.isMarked}
          onChange={() => handleCheckWorkersSalary(item.id)}
        />
      </td>
    </tr>
  ));

  // salary all marked workers
  const allSalary = workers.reduce((acc, worker) => {
    if (worker.isMarked) {
      return acc + worker.salary
    }

    return acc;
  }, 0);

  return (
    <div>
      <div>
        <h3>Checkbox + arrays</h3>
        <p>1.</p>
        <ul>
          {list}
        </ul>

        <p>2.</p>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Salary</th>
              <th>Marks</th>
            </tr>
            {listOfWorkers}
          </tbody>
        </table>
        <p>Slalry all merked workers is {allSalary}</p>
      </div>

    </div>
  )
}

export default Task8_1_2;


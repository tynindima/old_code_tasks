import React, { useState } from 'react';

const initialWorkers = [
  {id: 1, name: 'Kolya', surname: 'Smith', salary: 5000},
  {id: 2, name: 'Dima', surname: 'Kravchenko', salary: 7000},
  {id: 3, name: 'Vanya', surname: 'Fedorovich', salary: 3000},
  {id: 4, name: 'Pasha', surname: 'Balbot', salary: 2000},
  {id: 5, name: 'Vova', surname: 'Galchenko', salary: 4000},
  {id: 6, name: 'Nikita', surname: 'Panfilenko', salary: 1000}
];

const Task8_9 = () => {
  const [workers, setWorkers] = useState(initialWorkers);

  //sorts workers depending of values
  const handlerWorkerSort = (value) => {
    switch (value) {
      case 'name':
      case 'surname':
        setWorkers([...workers].sort((a,b) => a[value].localeCompare(b[value])));
        break;
      case 'salary':
        setWorkers([...workers].sort((a,b) => a.salary - b.salary));
        break;
      default:
        break;
    }

  };

  //creates table rows of worker
  const rowsOfWorkers = workers.map((worker) => (
    <tr>
      <td>{worker.name}</td>
      <td>{worker.surname}</td>
      <td>{worker.salary}</td>
    </tr>
  ));

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>
              <button
                type="button"
                onClick={() => handlerWorkerSort("name")}
              >
                Name
              </button>
            </th>
            <th>
            <button
                type="button"
                onClick={() => handlerWorkerSort("surname")}
              >
                Surname
              </button>
            </th>
            <th>
            <button
                type="button"
                onClick={() => handlerWorkerSort("salary")}
              >
                Salary
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {rowsOfWorkers}
        </tbody>
      </table>
    </>
  )
}

export default Task8_9;


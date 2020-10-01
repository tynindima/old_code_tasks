import React, { useState } from 'react';

import './task8_13.css';

import { initialWorkers } from './workers';

const Task8_13 = () => {
  const [workers] = useState(initialWorkers);
  const [currentPage, setCurrentPage] = useState(1);
  const [worksPerPage] = useState(10);

  const handlerSelectPagese = (index) => setCurrentPage(index);

  const indexOfLastWorker = currentPage * worksPerPage;
  const indexOfFirstWorker = indexOfLastWorker - worksPerPage;
  const currentWorkers = workers.slice(indexOfFirstWorker, indexOfLastWorker);

  const rowsOfWorkers = currentWorkers.map((worker, i) => (
    <Worker key={i} worker={worker} />
  ));

  return (
    <div>
      <Pagination
        workers={workers}
        worksPerPage={worksPerPage}
        handlerSelectPagese={handlerSelectPagese}
      />
      <table className="table">
        <thead>
          <tr>
            <th className="col">Name</th>
            <th className="col">Surname</th>
            <th className="col">Salary</th>
          </tr>
        </thead>
        <tbody>
          {rowsOfWorkers }
        </tbody>
      </table>
    </div>
  )
}

const Pagination = (props) => {
  const {
    workers,
    worksPerPage,
    handlerSelectPagese,
  } = props;

  const buttons = [];

  for (let i = 1; i <= Math.ceil(workers.length / worksPerPage); i++) {
    buttons.push(i);
  }
  console.log(buttons);

  const listOfButtons = buttons.map((item) => (
    <li
      className="item"
      key={item}
      onClick={() => handlerSelectPagese(item)}>
        <a href="!#">{item}</a>
    </li>
  ));

  return (
      <ul className="list">
        {listOfButtons}
      </ul>
  );
};

const Worker = ({worker}) => {
  const {
    name,
    surname,
    salary,
  } = worker;

  return (
    <>
      <tr>
        <td className="col">{name}</td>
        <td className="col">{surname}</td>
        <td className="col">{salary}</td>
      </tr>
    </>
  );
};

export default Task8_13;

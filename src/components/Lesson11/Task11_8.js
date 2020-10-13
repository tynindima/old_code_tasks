import React, { useState } from 'react';

import './task11_8.css';
import cross from '../../images/times-solid2.svg';
import circle from '../../images/circle-regular.svg';
import { useEffect } from 'react';

const box = [
  [0,0,0],
  [0,0,0],
  [0,0,0]
];

const Task11_8 = () => {
  const count= useCounting(0);
  const cells = useCells(box, count.value);
  const [isWinner, setIsWinner] = useState(true);
  const [isGame, setIsGame] = useState(true);

  useEffect(() => {
    if (cells.value.every((items, i) => items[i] === 1)
      || cells.value.every((items, i) => items[2 - i] === 1)) {
      setIsGame(false);
    }

    if (cells.value.every((items, i) => items[i] === 2)
      || cells.value.every((items, i) => items[2 - i] === 2)) {
      setIsGame(false);
      setIsWinner(false);
    }

    for(let i = 0; i < 3; i++) {
      if (cells.value[i].every(num => num === 1)
      || cells.value.every(nums => nums[i] === 1)) {
        setIsGame(false);
        break;
      }
      if (cells.value[i].every(num => num === 2)
      || cells.value.every(nums => nums[i] === 2)) {
        setIsGame(false);
        setIsWinner(false);
        break;
      }
    }

  }, [cells.value]);

  const handlerNewGame = () => {
    cells.onNewGame(box);
    setIsGame(true);
    setIsWinner(true);
    count.onZero();


  };

  const winner = isGame ? null : isWinner
    ? <h1 style={{color: 'red'}}>Circle is winner</h1>
    : <h1 style={{color: 'red'}}>Cross is winner</h1>


  return (
    <div className="container">
      <div className="winner" style={{display: isGame ? 'none' : 'flex'}}>
        {winner}
      </div>

      <div className="box">
        {cells.value.map((row, i) => (
          <div key={i} className="row">
            {row.map((cell, j) => (
              <Cell
                key={j}
                indexR={i}
                indexC={j}
                cell={cell}
                onChange={cells.onChange}
                onCount={count.onChange}
              />
            ))}
          </div>
        ))}
      </div>
      <button
      className="btn btn-position"
      onClick={handlerNewGame}
      >
        new game
      </button>
    </div>

  )
};

const Cell = (props) => {
  const {
    cell,
    onChange,
    indexR,
    indexC,
    onCount,
  } = props;

  const handlerChangeNum = () => {
    onChange(indexR, indexC);
    onCount();
  };

  const content = !cell
    ? null
    : cell === 1 ? <img src={circle} alt="o"/> : <img src={cross} alt="+"/>

  return (
    <div
      className="item"
    >
      <button
        className="button-sell"
        onClick={handlerChangeNum}
        disabled={cell}
      >
        {content}
      </button>
    </div>
  );
};

const useCells = (initialState, count) => {
  const [value, setValue] = useState(initialState);

  const handlerChange = (indexR, indexC) => {
    setValue(value.map((row, i) => {
      if (i === indexR) {
        return row.map((cell, i) => {
          if (i === indexC) {
            return count%2 ? 2 : 1;
          }
          return cell;
        });
      }

      return row;
    }));
  }

  const handlerNewGame = (newCells) => {
    setValue(newCells);
  }

  return {
    value,
    onChange: handlerChange,
    onNewGame: handlerNewGame
  };
};

const useCounting = (initialState) => {
  const [value, setValue] = useState(initialState);

  const handlerIncrease = () => {
    setValue(prev => prev + 1);
  }

  const handlerSetToZero = () => {
    setValue(0);
  };

  return {
    value,
    onChange: handlerIncrease,
    onZero: handlerSetToZero
  }
};

export default Task11_8;

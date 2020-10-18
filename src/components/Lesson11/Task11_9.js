import React, { useCallback, useState } from 'react';

import './task11_9.css';

const SIZE_GRID = 10;

function createGrid(size) {
  let grid = [];
  for (let i = 0; i < size; i++) {
    grid[i] = [];
    for(let j = 0; j < size; j++) {
      grid[i][j] = 0;
    }
  }
  return grid;
}

const initialGrid = createGrid(SIZE_GRID)

const Task11_9 = () => {
  const grid = useGrid(initialGrid);
  const anamyGrid = useGrid(initialGrid);

  const getRandomDirection = () => {
    return Math.floor(Math.random() * 2);
  };

  const hadnlerShipsRandopPring = () => {
    grid.onClear(initialGrid);
    //draw the biggest one
    grid.createChip(4, getRandomDirection());
    for (let i = 0; i < 2; i++) {
      grid.createChip(3, getRandomDirection());
    };
    for (let i = 0; i < 3; i++) {
      grid.createChip(2, getRandomDirection());
    };
    for (let i = 0; i < 4; i++) {
      grid.createChip(1, getRandomDirection());
    };
  };

  return (
    <div>
      <div className="container">
        <Map
          grid={grid.value}
          onChange={grid.onUserClick}
        />
        <Map
          grid={anamyGrid.value}
          onChange={anamyGrid.onPutShip}
        />
      </div>
      <div className="box">
      <button className="btn" type="button" onClick={hadnlerShipsRandopPring}>Create Ships</button>
      </div>


    </div>
  )
}

const Map = React.memo((props) => {
  const {
    grid,
    onChange
  } = props;


  function header() {
    let header = [];
    for (let i = 0; i <= grid.length; i++ ) {
    header.push(<td key={i} className="numbers">{i}</td>);
    }
    return header
  };

  return (
    <table className="table">
      <tbody>
        <tr>
          {header()}
        </tr>
        {grid.map((row, i) => (
          <tr key={i}>
            <td className="numbers">{i + 1}</td>
            {row.map((cell, j) => (
              <Cell
                key={j}
                x={j}
                y={i}
                cell={cell}
                onChange={onChange}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
});

const Cell = React.memo((props) => {
  const {
    cell,
    x,
    y,
    onChange
  } = props;
  console.log('dfdf');

  const handlerChange = () => {
    onChange(x, y, cell);
  }

  const getColor = (num) => {
    switch (num) {
      case 2: return '#5cb85c';
      case -1: return '#d9534f';
      case 3: return 'blue';
      case -2: return 'yellow';
      default: return '#fff';
    }
  };

  const style = {backgroundColor: getColor(cell)}

  return (
    <td
      className="cell"
    >
      <button
        type="button"
        className="btn-cell"
        disabled={cell !== 0 && cell !== 1}
        onClick={handlerChange}
        style={style}
      >
        {cell}
      </button>
    </td>
  );
});

const useGrid = (initialState) => {
  const [grid, setGrig] = useState(initialState);

  const handlerToClearGrid = (newGird) => {
    setGrig(newGird);
  };

  const handlerChangeContent = useCallback((x, y, newContent) => {
    setGrig(prev => prev.map((axisY, i) => {
      if (i === y) {
        return axisY.map((axisX, j) => {
          if (j === x) {
            return newContent;
          }
          return axisX;
        })
      }

      return axisY;
    }));
  }, []);

  const handlerChange = useCallback((x, y, cell) => {
    switch (cell) {
      case 1:
        handlerChangeContent(x, y, 2);
        break;
      case 0:
        handlerChangeContent(x, y, -1);
        break;
      default:
        break;
    }
  }, [handlerChangeContent]);

  const handlerPutShips = useCallback((x, y) => {
    handlerChangeContent(x, y, 3);

  }, [handlerChangeContent]);

  const getRandomCordinate = () => {
    const x = Math.floor(Math.random() * SIZE_GRID);
    const y = Math.floor(Math.random() * SIZE_GRID);

    return {x, y};
  };

  const createChip = (length, direction) => {
    let axis = getRandomCordinate();

    if (direction) {
      while (grid[axis.y][axis.x] !== 0
            || axis.y + length > SIZE_GRID - 1
            || grid[axis.y + length - 1][axis.x] !== 0) {
        axis = getRandomCordinate();
      }
    } else {
      while (grid[axis.y][axis.x] !== 0
            || axis.x + length > SIZE_GRID - 1
            || grid[axis.y][axis.x + length - 1] !== 0) {
        axis = getRandomCordinate();
      }
    }

    for (let i = 0; i < length; i++) {
      direction
        ? handlerChangeContent(axis.x, axis.y + i, 1)
        : handlerChangeContent(axis.x + i, axis.y, 1);
    }
  };

  return {
    value: grid,
    onChange: handlerChangeContent,
    createChip,
    onClear: handlerToClearGrid,
    onUserClick: handlerChange,
    onPutShip: handlerPutShips
  };
};

export default Task11_9;

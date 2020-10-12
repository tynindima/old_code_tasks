import React, { useCallback, useContext, useReducer, useRef, useState } from 'react';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './task11_7.scss';

const countDayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const currentMonth = new Date().getMonth();

const initialState = {
  calendar: countDayInMonth.map((month, i) => {
    const days = Array.from({length: month}, (_, i) => i + 1);

    const newMonth = {
      id: i,
      days: days.map((day) => ({dayId: day, tasks: []})),
    }

    return newMonth;
  }),
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        calendar: state.calendar.map(month => {
          if (month.id === action.id) {
            return {
              ...month,
              days: month.days.map(day => {
                if (day.dayId === action.dayId) {
                  return {
                    ...day,
                    tasks: action.newTask
                  }
                }

                return day;
              })
            };
          }

          return month;
        })
      };
    case 'DELETE_TASK':
      return {
        ...state,
        calendar: state.calendar.map(month => {
          if (month.id === action.id) {
            return {
              ...month,
              days: month.days.map(day => {
                if (day.dayId === action.dayId) {
                  return {
                    ...day,
                    tasks: day.tasks.filter((task, i) => i !== action.index)
                  }
                }

                return day;
              })
            };
          }

          return month;
        })
      };
    case 'CHANGE_TASK':
      return {
        ...state,
        calendar: state.calendar.map(month => {
          if (month.id === action.id) {
            return {
              ...month,
              days: month.days.map(day => {
                if (day.dayId === action.dayId) {
                  const index = day.tasks.findIndex((task, i) => i === action.index);
                  const changedTask = day.tasks.splice(index, 1, action.changedTask);

                  return {
                    ...day,
                    tasks: changedTask
                  }
                }

                return day;
              })
            };
          }

          return month;
        })
      };
    default: return state;
  }
};

const DispatchContext = React.createContext(null);

const Task11_7 = () => {
  const data = useSelectMonth(currentMonth, countDayInMonth);
  const [{ calendar }, dispatch] = useReducer(reducer, initialState);
  const todos = useTodosList(null, calendar[data.month].days);
  const isTodos = useBooleanTaggler(false);

  return (
    <DispatchContext.Provider value={dispatch}>
      <div>
      <h1>Organaiser</h1>
      <p>{monthNames[data.month]}</p>
      <button onClick={data.goBack} className="btn btn-success">Back</button>
      <button onClick={data.goForward} className="btn btn-success">Forward</button>

      <Month
        month={calendar[data.month]}
        day={data.day}
        onSelectDay={todos.onSelectDay}
        onTodoOpen={isTodos.onChange}
      />
      <TodosList
        todos={todos.value}
        isTodos={isTodos.value}
        monthId={data.month}
      />
    </div>
    </DispatchContext.Provider>
  )
};

const Month = (props) => {
  const {
    month,
    day,
    onSelectDay,
    onTodoOpen
  } = props;

  return (
    <div className={`month month-${day}`}>
        {month.days.map((day, i) => (
          <Day
            key={day.dayId}
            id={day.dayId}
            index={i}
            onSelectDay={onSelectDay}
            onTodoOpen={onTodoOpen}
          />
        ))}
      </div>
  );
};

const Day = (props) => {
  const {
    id,
    index,
    onSelectDay,
    onTodoOpen
  } = props;

  const handlerOpenTodo = () => {
    onSelectDay(index);
    onTodoOpen(true);
  };

  return (
    <div
      className="day"
      onClick={handlerOpenTodo}
    >
      {id}
    </div>
  );
};

//List of todos opening when user click on selected day
const TodosList = (props) => {
  const {
    todos,
    isTodos,
    monthId
  } = props;


  const dispatch = useContext(DispatchContext);
  const taskRef = useRef();
  const currentTodos = useTodos(todos);

  useEffect(() => {
    currentTodos.onUpdate(todos);
  }, [todos]);

  const handleSumbit = (e) => {
    e.preventDefault();

    currentTodos.onAdd(taskRef.current.value);
    taskRef.current.value = '';
  };

  const handlerSaveToCalender = () => {
    dispatch({type: 'ADD_TASK', id: monthId, dayId: todos.dayId, newTask: currentTodos.value.tasks});
  };

  const Todos = currentTodos.value && currentTodos.value.tasks.map((todo, i) => (
    <Todo
      key={todo}
      number={i}
      todo={todo}
      onDelete={currentTodos.onDelete}
      onChange={currentTodos.onChange}
    />
  ));

  return (
    <div style={{display: isTodos ? 'block' : 'none'}} className="todos">
      <h2>Todos</h2>
      <form onSubmit={handleSumbit}>
        <input
          type="text" ref={taskRef}
          className="todos__input"
        />
        <button className="btn btn-success" type="submit">Add todo</button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th className="table__col">№</th>
            <th className="table__col table__col_2">Name Task</th>
            <th className="table__col">Change</th>
            <th className="table__col">Delete</th>
            <th className="table__col">Done</th>
          </tr>
        </thead>
        <tbody>
          {Todos}
        </tbody>
      </table>
      <button
        type="button"
        onClick={handlerSaveToCalender}
        className="btn btn-success"
      >
        Save to Calender
      </button>
    </div>
  );
};

//every todo of todoslist
const Todo = (props) => {
  const {
    todo,
    number,
    onDelete,
    onChange
  } = props;

  const inputRef = useRef();
  const isEdit = useBooleanTaggler(false);
  const isChecked = useToggler(false);

  const handleDelete = () => {
    onDelete(number);
  };

  const handlerOnEdit = () => {
    isEdit.onChange(true);
  };

  const handlerOnApply = () => {
    onChange(number, inputRef.current.value);
    isEdit.onChange(false);
  };

  const buttons = isEdit.value
    ? <button type="button" className="btn btn-success" onClick={handlerOnApply}>Apply</button>
    : <button type="button" className="btn btn-warning" onClick={handlerOnEdit}>Edit</button>;

  const todoContent = isEdit.value
    ? <input type="text" ref={inputRef}/>
    : <span style={{textDecoration: isChecked.value ? 'line-through' : 'none'}}>{todo}</span>;


  return (
    <tr>
      <td className="table__col">{number + 1}</td>
      <td className="table__col table__col_2">
        {todoContent}
      </td>
      <td className="table__col">
        {buttons}
      </td>
      <td className="table__col">
        <button type='button' className="btn" onClick={handleDelete}>Delete</button>
      </td>
      <td className="table__col">
        <input
          type="checkbox"
          checked={isChecked.value}
          onChange={isChecked.onChange}
        />
      </td>
    </tr>
  );
};

const useSelectMonth = (initialState) => {
  const [value, setValue] = useState(initialState);
  const day = useRef();


  day.current = new Date(2020, value, 1).getDay();

  const handlerGoBack = () => {
    value === 0 ? setValue(11) : setValue(prev => prev - 1);
  };

  const handlerGoForward = () => {
    value === 11 ? setValue(0) : setValue(prev => prev + 1);
  };

  return {
    month: value,
    day: day.current,
    goBack: handlerGoBack,
    goForward: handlerGoForward
  };
};

const useTodosList = (initialState, currentMonth) => {
  const [todos, setTodos] = useState(initialState);

  const handlerSelectDay = (index) => {
    setTodos(currentMonth[index]);
  };

  const handlerAddNewTask = (newTask) => {
    setTodos([...todos, newTask]);
  };

  const handlerDeletedTask = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handlerChangeTodo = (index, newTask) => {
    todos.splice(index, 1, newTask);
    setTodos(todos);
  };

  return {
    value: todos,
    onSelectDay: handlerSelectDay,
    onAdd: handlerAddNewTask,
    onDelete: handlerDeletedTask,
    onChange: handlerChangeTodo
  };
};

const useBooleanTaggler = (initialState) => {
  const [value, setValue] = useState(initialState);

  const handlerChange = (newValue) => {
    setValue(newValue);
  };

  return {
    value,
    onChange: handlerChange
  };
};

const useTodos = (initialState) => {
  const [todo, setTodo] = useState(initialState);

  const handlerAddTodo = (newTask) => {
    setTodo(prev => ({...prev, tasks: [...prev.tasks, newTask]}));
  };

  const handlerDeleteTodo = useCallback((index) => {
    setTodo(prev => ({...prev, tasks: prev.tasks.filter((_, i) => i !== index)}));
  }, [todo]);

  const hadnlerChange = (index, newTask) => {
    const tempTask = [...todo.tasks];
    tempTask.splice(index, 1, newTask);
    setTodo(prev => ({...prev, tasks: tempTask}));
  };

  const handleUpdate = (newTodo) => {
    setTodo(newTodo);
  };

  return {
    value: todo,
    onAdd: handlerAddTodo,
    onUpdate: handleUpdate,
    onDelete: handlerDeleteTodo,
    onChange: hadnlerChange
  };
};

const useToggler = (initialState) => {
  const [value, setValue] = useState(initialState);

  const handlerChange = () => {
    setValue(prev => !prev);
  };

  return {
    value,
    onChange: handlerChange
  };
};

export default Task11_7;

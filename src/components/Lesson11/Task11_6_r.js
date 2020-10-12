import React, { useRef, useState, useReducer, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './task11_1.css';

const initialTodos = [
  {id: 1, task: 'Make morning exersise'},
  {id: 2, task: 'Prepare breakfast'},
  {id: 3, task: 'Read the book'},
];
const initialState = {
  todos: initialTodos
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.newTodo]
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id)
      };
    case 'CHANGE_TODO':
      const {todos} = state;
      const {id, task} = action;
      const index = todos.findIndex(item => item.id === id);
      todos.splice(index, 1, {id, task});
      return {
        ...state,
        todos,
        }


    default: return state;
  }
};

const TodoDispatch = React.createContext(null);

const Task11_6_r = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log('Task');

  return (
    <TodoDispatch.Provider value={dispatch}>
      <div>
        <AddingNewTodo />
        <ListOfTodos todos={state.todos} />
      </div>
    </TodoDispatch.Provider>
  )
};

const ListOfTodos = React.memo((props) => {
  const { todos } = props;

  console.log('ListOfTodos');

  return (
    <table className="table">
      <thead>
        <tr>
          <th className="col">Task</th>
          <th className="col">Change</th>
          <th className="col">Delete</th>
          <th className="col">Done</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
          />
        ))}
      </tbody>
    </table>
  );
});

const Todo = React.memo((props) => {
  const {
    todo,
  } = props;
  const { id, task } = todo;

  const dispatch = useContext(TodoDispatch);

  console.log('Todo');

  const isCheck = useBoolChange(false);
  const isEdit = useBoolChange(false);
  const taskInput = useChangeValue(task);

  const handlerChangeTask = () => {
    dispatch({type: 'CHANGE_TODO', id, newTask: taskInput.value});
    isEdit.onChange();
  };

  const handlerDeleteTask = () => {
    dispatch({type: 'DELETE_TODO', id});
  }

  const editBtn = isEdit.value
    ? <button className="btn btn-warning" onClick={isEdit.onChange}>Edit</button>
    : <button className="btn btn-warning" onClick={handlerChangeTask}>Apply</button>

  return (
    <tr>
      <td className="col w-200" style={{textDecoration: isCheck.value ? 'none' : 'line-through'}}>
        <input
          type="text"
          style={{display: isEdit.value ? 'none' : 'inline'}}
          {...taskInput}
        />
        <span style={{display: isEdit.value ? 'inline' : 'none'}}>{task}</span>
      </td>
      <td className="col">
        {editBtn}
      </td>
      <td className="col">
        <button className="btn" onClick={handlerDeleteTask}>
          Delete
        </button>
      </td>
      <td className="col">
        <input type="checkbox" {...isCheck}/>
      </td>
    </tr>
  );
});

const AddingNewTodo = React.memo(() => {
  const dispatch = useContext(TodoDispatch);

  console.log('Adding Todo');

  const inputRef = useRef();

  const handerSumbit = (e) => {
    e.preventDefault();

    if (inputRef.current.value) {
      const newTodo = {
        id: uuidv4(),
        task: inputRef.current.value
      };

      inputRef.current.value = '';
      dispatch({type: 'ADD_TODO', newTodo});
    }

  };

  return (
    <form onSubmit={handerSumbit}>
      <input type="text" ref={inputRef}/>
      <button className="btn btn-success ml-50" type="submit">Add</button>
    </form>
  );
});

const useBoolChange = (initialState) => {
  const [value, setValue] = useState(initialTodos);

  const handleChange = () => {
    setValue(value => !value);
  };

  return {
    value,
    onChange: handleChange
  };
};

const useChangeValue = (initialState) => {
  const [value, setValue] = useState(initialState);

  const handleChange = ({target}) => {
    setValue(target.value);
  };

  return {
    value,
    onChange: handleChange
  };
};

export default Task11_6_r;

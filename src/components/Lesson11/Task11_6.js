import React, { useRef, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './task11_1.css';

const initialTodos = [
  {id: 1, task: 'Make morning exersise'},
  {id: 2, task: 'Prepare breakfast'},
  {id: 3, task: 'Read the book'},
];

const Task11_6 = () => {
  const todos = useTaskManager(initialTodos);

  console.log('Task');

  return (
    <div>
      <AddingNewTodo onAdd={todos.onAdd} />
      <ListOfTodos
        todos={todos.value}
        onDelete={todos.onDelete}
        onChange={todos.onChange}
      />
    </div>
  )
};

const ListOfTodos = React.memo((props) => {
  const {
    todos,
    onDelete,
    onChange
  } = props;

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
            onDelete={onDelete}
            onChange={onChange}
          />
        ))}
      </tbody>
    </table>
  );
});

const Todo = React.memo((props) => {
  const {
    todo,
    onDelete,
    onChange
  } = props;
  const { id, task } = todo;

  console.log('Todo');

  const isCheck = useBoolChange(false);
  const isEdit = useBoolChange(false);
  const taskInput = useChangeValue(task);

  const handlerChangeTask = () => {
    onChange(id, taskInput.value);
    isEdit.onChange();
  };

  const handlerDeleteTask = () => {
    onDelete(id);
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

const AddingNewTodo = React.memo((props) => {
  const {
    onAdd
  } = props;

  console.log('Adding Todo');

  const inputRef = useRef();

  const handerSumbit = (e) => {
    e.preventDefault();

    if (inputRef.current.value) {
      const newTodo = {
        id: uuidv4(),
        task: inputRef.current.value
      };

      onAdd(newTodo);
    }

  };

  return (
    <form onSubmit={handerSumbit}>
      <input type="text" ref={inputRef}/>
      <button className="btn btn-success ml-50" type="submit">Add</button>
    </form>
  );
});

const useTaskManager = (initialState) => {
  const [value, setValue] = useState(initialState);

  const handlerAddValue = useCallback((newValue) => {
    setValue([...value, newValue]);
  }, [value]);

  const handlerDeleteValue = (id) => {
    setValue(value.filter(item => item.id !== id));
  };

  const handlerChangeValue = (id, changeItem) => {
    setValue(value.map(item => {
      if (item.id === id) {
        return {
          ...item,
          task: changeItem
        }
      }

      return item;
    }));
  };

  return {
    value,
    onAdd: handlerAddValue,
    onDelete: handlerDeleteValue,
    onChange: handlerChangeValue
  };
};

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

export default Task11_6;

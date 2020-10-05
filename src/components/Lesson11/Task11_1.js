import React, { useEffect, useRef, useState } from "react";

const Task11_1 = () => {
  const [value, setValue] = useState(0);
  const inputRef = useRef();
  console.log('Hello');

  function handleSumbit(e) {
    e.preventDefault();
    setValue(value + +inputRef.current.value);
    inputRef.current.value = '';
  }

  const handleChange = () => {
    let temp = inputRef.current.value
    console.log(temp);
  };



  return (
    <div>
      <form onSubmit={handleSumbit}>
        <Input
          inputRef={inputRef}
          onChange={handleChange}
        />
        <button type="submit">Focus</button>
        <p>count of render: {value}</p>
      </form>

    </div>
  );
};

const Input = (props) => {
  const {
    inputRef,
    onChange
  } = props;

  return (
    <input
      type="text"
      ref={inputRef}
      onChange={onChange}
    />
  );
};

export default Task11_1;

import React, { useEffect, useRef, useState } from "react";

const Task11_1 = () => {
  const [value, setValue] = useState(0);
  const inputRef = useRef();

  function handleSumbit(e) {
    e.preventDefault();
    setValue(value + +inputRef.current.value);
    inputRef.current.value = '';
  }



  return (
    <div>
      <form onSubmit={handleSumbit}>
        <input
          type="text"
          ref={inputRef}
        />
        <button type="submit">Focus</button>
        <p>count of render: {value}</p>
      </form>

    </div>
  );
};

export default Task11_1;

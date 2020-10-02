import React, { useEffect, useState } from 'react';
import './task8_11.css';

const Task8_11 = () => {
  const [text, setText] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isChanging, setIsChanging] = useState(true);

  const handlerChange = (e) => {
    const { value } = e.target;

    setText(value);
    setIsChanging(false);
  };

  useEffect(() => {
    if (text.length >= 4 && text.length < 10) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  },[text, setText]);

  return (

    <div>
      <input
        className="input"
        type="text"
        value={text}
        onChange={handlerChange}
        style={{borderColor: isChanging ? 'grey' : isValid ? 'green' : 'red'}}
      />
    </div>
  )
}

export default Task8_11;

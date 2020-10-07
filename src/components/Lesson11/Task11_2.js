import React, { useRef, useState } from 'react';

const initialTests = [
  {
    question: 'Какая река длинее?',
    right: 'Нил',
  },
  {
    question: 'Сколько планет в солнечной системе?',
    right: '8',
  },
  {
    question: 'Сколько в JavaScript основных типов данных?',
    right: '8',
  },
];

const Task11_2 = () => {
  const tests = useRef(initialTests);

  console.log('All tests');

  return (
    <ul>
      {tests.current.map((test, i) => (
        <Test
          key={test.question}
          test={test}
          number={i + 1}
        />
      ))}
    </ul>
  );
}

const Test = ({test, number}) => {
  const {
    question,
    right
  } = test;
  console.log('test');

  const answer = useInputChange(right);

  const message = answer.isChecked
    ? <p style={{color: answer.isRight ? 'green' : 'red'}}>
        Ваш ответ {answer.ref.current.value}: {answer.isRight ? 'правильно' : 'неправильно'}
      </p>
    : null;

  return (
    <li>
      <p>{number}. {question}</p>
      <form onSubmit={answer.onSubmit}>
        <div style={{display: answer.isChecked ? 'none' : 'display'}}>
          <input
            type="text"
            ref={answer.ref}
          />
        </div>
        {message}
        <button type="submit">Сдать тест</button>
      </form>
    </li>
  );
};

const useInputChange = (rightAnswer) => {
  const ref = useRef();
  const [isChecked, setIsChecked] = useState(false);
  const [isRight, setIsRight] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsChecked(true);

    ref.current.value === rightAnswer
    ? setIsRight(true)
    : setIsRight(false);
  }

  return {
    ref,
    isChecked,
    isRight,
    onSubmit: handleSubmit
  }
};
export default Task11_2;

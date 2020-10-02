import React, { useState } from 'react';

const tests = [
  {
    question: 'Какая река длинее?',
    answers: [
      'Дунай',
      'Амазонка',
      'Янзцы',
      'Нил',
      'Миссисипи',
    ],
    right: 'Нил',
  },
  {
    question: 'Сколько планет в солнечной системе?',
    answers: [
      '6',
      '9',
      '10',
      '8',
      '7',
    ],
    right: '8',
  },
  {
    question: 'Сколько в JavaScript основных типов данных?',
    answers: [
      '6',
      '9',
      '5',
      '7',
      '8',
    ],
    right: '8',
  },
];

const Task8_16 = () => {
  return (
    <div>
      {tests.map((test, i) => (
        <Test key={i} number={i + 1} test={test} />
      ))}
    </div>
  )
}

const Test = ({number, test}) => {
  const {
    question,
    answers,
    right
  } = test;

  const [currentAnswer, setCurrnetAnswer] = useState();
  const [isDefaultColor, setIsDefaultColor] = useState(true);

  const handlerCurAnswer = ({target}) => {

    setCurrnetAnswer(target.value);
    setIsDefaultColor(false);
  };

  const color = isDefaultColor ? 'grey' : right === currentAnswer ? 'forestgreen' : 'red';


  return (
    <div>
      <p style={{color}}>{`${number}. ${question}`}</p>
      <form>
        <ul>
          {answers.map((answer, i) => (
            <li key={i} style={{listStyle: 'none'}}>
              <input
                type="radio"
                name="answer"
                value={answer}
                checked={currentAnswer === answer}
                onChange={handlerCurAnswer}
              />
              {answer}
          </li>
          ))}
        </ul>
      </form>

    </div>
  );
};

export default Task8_16;

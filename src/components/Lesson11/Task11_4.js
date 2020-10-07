import React, { useRef, useState } from "react";

import "./task11_3.css";

const initialTests = [
  {
    question: "Какая река длинее?",
    right: "Нил",
    answers: [
      'Дунай',
      'Амазонка',
      'Янзцы',
      'Нил',
    ],
  },
  {
    question: "Сколько планет в солнечной системе?",
    right: "8",
    answers: [
      '9',
      '10',
      '8',
      '7',
    ],
  },
  {
    question: "Сколько в JavaScript основных типов данных?",
    right: "8",
    answers: [
      '9',
      '5',
      '7',
      '8',
    ],
  },
];

const Task11_4 = () => {
  const tests = useRef(initialTests);
  const answers = useAnswers([]);
  const showAnswer = useChangeBoolean(false);

  const isOnBtn = answers.value.length === tests.current.length;

  return (
    <div>
      <Tests tests={tests.current} addAnswer={answers.addValue} />
      <button
        style={{ display: isOnBtn ? "block" : "none" }}
        onClick={showAnswer.onClick}
      >
        Проверить ответы
      </button>
      <Answers answers={answers.value} isShowAnswer={showAnswer.value} />
    </div>
  );
};

const Tests = React.memo((props) => {
  const { tests, addAnswer } = props;
  const x = useMoveX(0, tests);

  return (
    <div>
      <ul className="tests-list">
        {tests.map((test, i) => (
          <Test
            key={test.question}
            test={test}
            number={i + 1}
            x={x.value}
            addAnswer={addAnswer}
          />
        ))}
      </ul>
      <button type="button" onClick={x.goLeft}>
        назад
      </button>
      <button type="button" onClick={x.goRight}>
        вперед
      </button>
    </div>
  );
});

const Test = React.memo((props) => {
  const { test, number, x, addAnswer } = props;
  const { question, right, answers } = test;

  const currentAnswer = useChangeInput(null);

  const { isCheck, onSubmit } = useTestAnswer(
    addAnswer,
    question,
    right,
    currentAnswer.value
  );

  const paragraph = isCheck ? <p>Вопрос засчитан</p> : null;
  const isButtonOn = currentAnswer.value === null;

  return (
    <li className="item" style={{ transform: `translateX(${x}%)` }}>
      <p>
        {number}. {question}
      </p>
      {paragraph}
      <form
        onSubmit={onSubmit}
      >
        <ul className="list-answers" style={{display: isCheck ? 'none' : 'display'}}>
          {answers.map((answer) => (
            <li key={answer} className="item-answers">
              <input
                type="radio"
                value={answer}
                checked={answer === currentAnswer.value}
                onChange={currentAnswer.onChange}
              />
              {` ${answer}`}
            </li>

          ))}
        </ul>
        <button
          type="submit"
          disabled={isButtonOn}
          style={{display: isCheck ? 'none' : 'display'}}
        >
          Подтвердить
        </button>
      </form>
    </li>
  );
});

const Answers = (props) => {
  const { answers, isShowAnswer } = props;

  return (
    <ul style={{ display: isShowAnswer ? "block" : "none" }}>
      {answers.map((answer, i) => (
        <Answer
          key={answer.question}
          answer={answer}
          number={i + 1}
        />
      ))}
    </ul>
  );
};

const Answer = (props) => {
  const {
    answer,
    number
  } = props;
  const {
    question,
    right,
    myAnswer
  } = answer;

  const message = right.toLowerCase() === myAnswer.toLowerCase()
    ? <p style={{color: '#5cb85c'}}>Ваш ответ {myAnswer} - правильно</p>
    : <p style={{color: '#d9534f'}}> Ваш ответ {myAnswer} - не правильно, правильный ответ - {right}</p>;

  return (
    <li key={question}>
      <h3>
        {number}. {question}
      </h3>
      {message}
    </li>
  );
};

const useMoveX = (initialState, tests) => {
  const [x, setX] = useState(initialState);
  const goLeft = () => {
    x < 0 && setX(x + 100);
  };
  const goRight = () => {
    x > -100 * (tests.length - 1) && setX(x - 100);
  };

  return {
    value: x,
    goLeft,
    goRight,
  };
};

const useAnswers = (initialState) => {
  const [value, setValue] = useState(initialState);

  const handlerAddValue = (newValue) => {
    setValue([...value, newValue]);
  };

  return {
    value,
    addValue: handlerAddValue,
  };
};

const useTestAnswer = (addAnswer, question, right, answer) => {
  const [isCheck, setIsCheck] = useState(false);

  const handleSumbit = (e) => {
    e.preventDefault();

    setIsCheck(true);

    const newAnswer = {
      question: question,
      right: right,
      myAnswer: answer,
    };

    addAnswer(newAnswer);
  };

  return {
    isCheck,
    onSubmit: handleSumbit,
  };
};

const useChangeBoolean = (initialState) => {
  const [value, setValue] = useState(initialState);

  const handlerChange = () => {
    setValue(!value);
  };

  return {
    value,
    onClick: handlerChange,
  };
};

const useChangeInput = (initialState) => {
  const [value, setValue] = useState(initialState);

  const handleChange = ({ target }) => {
    setValue(target.value);
  };

  return {
    value,
    onChange: handleChange
  }
};

export default Task11_4;

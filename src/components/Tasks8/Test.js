import React, { useState } from 'react';

const Test = ({number, test}) => {
  const {
    question,
    answers,
    right
  } = test;

  const [currentAnswer, setCurrnetAnswer] = useState();
  console.log(number, currentAnswer);

  const handlerCurAnswer = ({target}) => {

    setCurrnetAnswer(target.value);
    console.log(target.value);
  };


  return (
    <div>
      <p style={{color: right === currentAnswer ? 'green' : 'red'}}>{`${number}. ${question}`}</p>
      <form>
        <ul>
          {answers.map((answer, i) => (
            <li key={i}>
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

export default Test;

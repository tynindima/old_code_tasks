import React, { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

const Task8_8 = () => {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState('');

  //changes text throught textarea
  const handleChangeTextarea = (e) => {
    const { value } = e.target;

    setText(value);
  };

  // adds new note to notes
  const handlerSubmitAddNote = (e) => {
    e.preventDefault();

    const currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();

    //format to two digits
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    const newNote = {
      id: uuidv4(),
      header: text,
      time: `${hours}:${minutes}:${seconds}`,
      isEdit: false
    };

    setNotes([...notes, newNote]);
    setText('');
  };

  //delete selected note
  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  }

  // edit header in selected note
  const handleEditNote = (id, text) => {
    setNotes(notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          header: text,
          isEdit: false
        };
      }

      return note;
    }));
  };

  // if button was pressed show edit input
  const handleShowEdit = (id) => {
    setNotes(notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          isEdit: true
        };
      }

      return note;
    }));
  };


  //list of notes
  const listOfNotes = notes.map((note) => (
    <div key={note.id}>
      <h3>{note.isEdit ? '' : note.header}</h3>
      <Input
        value={note.header}
        id={note.id}
        onChange={handleEditNote}
        isEdit={note.isEdit}
      />
      <p>time is {note.time}</p>
      <button
        type="button"
        onClick={() => handleDeleteNote(note.id)}
      >
        удалить
      </button>
      <button
        type="button"
        onClick={() => handleShowEdit(note.id)}
      >
        редактировать
      </button>
    </div>
  ));

  return (
    <div>
      <form onSubmit={handlerSubmitAddNote}>
        <textarea
          name="note"
          value={text}
          onChange={handleChangeTextarea}
        />
        <button type="submit">Add</button>
        <article>
          {listOfNotes}
        </article>
      </form>
    </div>
  )
}

const Input = (props) => {
  const {
    value,
    id,
    onChange,
    isEdit
  } = props;

  const [text, setText] = useState(value);

  const handleChange = (e) => {
    const { value } = e.target;

    setText(value);
  };

  const handleOnBlure = () => {
    onChange(id, text);
  };

  return (
    <>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        onBlur={handleOnBlure}
        style={{ display: isEdit ? 'block' : 'none'}}
      />
    </>
  );
};

export default Task8_8;


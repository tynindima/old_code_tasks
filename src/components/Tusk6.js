import React, { useState } from 'react';

const initialNames = ['Kolya', 'Dima', 'Vova', 'Nikita', 'Egor'];

const initialRefs = [
  {href: '1.html', text: 'ссылка 1'},
  {href: '2.html', text: 'ссылка 2'},
  {href: '3.html', text: 'ссылка 3'},
];
const initialNumbers = [1,2,3,4,5,6];

const ititialUsers = [
  {name: 'Коля', age: 30},
  {name: 'Вася', age: 40},
  {name: 'Петя', age: 50},
];

const Tusk6 = () => {
  const [date, setDate] = useState('');
  const [fullName, setfullName] = useState('');
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [totalSum, setTotalSum] = useState('');
  const [firstname2, setFirstname2] = useState('');
  const [secondname2, setSecondname2] = useState('');
  const [surname2, setSurname2] = useState('');
  const [allNames, setAllNames] = useState('');
  const [newName, setNewName] = useState('');
  const [names, setNames] = useState(initialNames);
  const [hrefs, setHrefs] = useState(initialRefs);
  const [href, setHref] = useState('');
  const [nameHref, setNameHref] = useState('');
  const [numbers, setNumbers] = useState(initialNumbers);
  const [deletedNum, setDeletedNum] = useState('');
  const [users, setUsers] = useState(ititialUsers);
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState('');

  const handleChange = (e) => {
    const { value, name } = e.target;
    switch (name) {
      case 'date':
        setDate(value);
        break;
      case 'name':
        setfullName(value);
        break;
      case 'num1':
        setNum1(value);
        break;
      case 'num2':
        setNum2(value);
        break;
      case 'firstname2':
        setFirstname2(value);
        break;
      case 'secondname2':
        setSecondname2(value);
        break;
      case 'surname2':
        setSurname2(value);
        break;
      case 'newName':
        setNewName(value);
        break;
      case 'href':
        setHref(value);
        break;
      case 'nameHref':
        setNameHref(value);
        break;
      case 'deletedNum':
        setDeletedNum(value);
        break;
      case 'userName':
        setUserName(value);
        break;
      case 'userAge':
        setUserAge(value);
        break;
        default:
          break;
    }
  };

  // find out the year of birth
  const birthData = new Date().getFullYear() - date;

  // take saparately every name of full name
  const [name, secondname, surname] = fullName.split(' ');

  const handleSumbit = (e) => {
    e.preventDefault();
    let sum = Number(num1) + Number(num2)
    setTotalSum(sum);
  };

  const handleSumbitMergeNames = (e) => {
    e.preventDefault();
    const names = `${firstname2} ${secondname2} ${surname2}`;
    setAllNames(names);
  }

  const handleSubmitFormNames = (e) => {
    e.preventDefault();

    setNames([...names, newName]);
    setNewName('');
  };

  const deleteCurrentName = (index) => {
    const tempNames = [...names];
    tempNames.splice(index, 1);
    setNames(tempNames);
  };

  const handleSumbitFormHrefs = (e) => {
    e.preventDefault();

    const newHref = {href, text: nameHref};

    setHrefs([...hrefs, newHref]);
    setHref('');
    setNameHref('');
  };

  const handleSumbitDeleteSelectedNum = (e) => {
    e.preventDefault();

    setNumbers(numbers.filter(item => item !== Number(deletedNum)));
    setDeletedNum('');
  };

  const handlerSumbitTableAddUser = (e) => {
    e.preventDefault();

    const newUser = { name: userName, age: userAge };

    setUsers([...users, newUser]);
    setUserName('');
    setUserAge('');
  };

  //list of names
  const list = names.map((item, i) => (
    <li key={i}>
      {item}
      <button type="button" onClick={() => deleteCurrentName(i)}>delete</button>
    </li>
  ));

  //list of refs
  const listOfRefs = hrefs.map((item, i) => (
    <li key={i}>
      <a href={item.href}>{item.text}</a>
    </li>
  ));

  //list of numbers
  const listOfNumbers = numbers.map((item, i) => (
    <li key={i}>{item}</li>
  ));

  //users table rows
  const rowsOfUsers = users.map((item, i) => (
    <tr>
      <td>{item.name}</td>
      <td>{item.age}</td>
    </tr>
  ));


  return (
    <div>

      <form>
        <input
          name="date"
          onChange ={handleChange}
          value={date}
          type="text"
        />
      </form>
      <p>{birthData}</p>

      <h3>Enter your all name</h3>
      <form>
        <input
          name="name"
          type="text"
          value={fullName}
          onChange={handleChange}
        />
      </form>
      <p>Name: {name}</p>
      <p>Secondname: {secondname}</p>
      <p>Surname: {surname}</p>

      <h3>Sum of two numbers</h3>
      <form onSubmit={handleSumbit}>
        <input
          name="num1"
          type="text"
          value={num1}
          onChange={handleChange}
          />
          <input
          name="num2"
          type="text"
          value={num2}
          onChange={handleChange}
          />
        <button type="submit">Sumbit</button>
      </form>
      <p>{totalSum}</p>

      <h3>Enter your all name separately</h3>
      <form onSubmit={handleSumbitMergeNames}>
        <input
          name="firstname2"
          type="text"
          onChange={handleChange}
        />
        <input
          name="secondname2"
          type="text"
          onChange={handleChange}
        />
        <input
          name="surname2"
          type="text"
          onChange={handleChange}
        />
        <button type="submit">merge names</button>
      </form>
      <p>{allNames}</p>


      <h3>Adding new name to list</h3>
      <form onSubmit={handleSubmitFormNames}>
        <input
          type="text"
          name="newName"
          value={newName}
          onChange ={handleChange}
          autoComplete="off"
        />
        <button type="submit">Add name</button>
      </form>
      <ul>
        {list}
      </ul>

      <h3>Enter href and name it</h3>
      <form onSubmit={handleSumbitFormHrefs}>
        <input
          name="href"
          type="text"
          value={href}
          onChange ={handleChange}
          autoComplete="off"
        />
        <input
          name="nameHref"
          type="text"
          value={nameHref}
          onChange ={handleChange}
          autoComplete="off"
        />
        <button type="submit">Add new link</button>
      </form>
      <ul>
        {listOfRefs}
      </ul>

      <h3>Delete number from list of numbers</h3>
      <form onSubmit={handleSumbitDeleteSelectedNum}>
        <input
          name="deletedNum"
          type="text"
          value={deletedNum}
          onChange ={handleChange}
          autoComplete="off"
        />
        <button type="submit">delete number</button>
      </form>
      <ul>
        {listOfNumbers}
      </ul>

      <h3>Table of users</h3>
      <form onSubmit={handlerSumbitTableAddUser}>
        <input
          name="userName"
          type="text"
          value={userName}
          onChange ={handleChange}
          autoComplete="off"
        />
        <input
          name="userAge"
          type="text"
          value={userAge}
          onChange ={handleChange}
          autoComplete="off"
        />
        <button type="submit">Add user</button>
      </form>
      <table>
        {rowsOfUsers}
      </table>
    </div>
  )
}

export default Tusk6;



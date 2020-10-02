import React, { useState } from 'react';

import './task10_7.css';

const initialProducts = [
  { name: 'apples', price: 10, count: 12 },
  { name: 'grapes', price: 25, count: 15 },
  { name: 'tomates', price: 8, count: 27 },
  { name: 'pineapples', price: 18, count: 9 },
  { name: 'lemon', price: 15, count: 23 },
  { name: 'plums', price: 14, count: 10 },
];

const Task10_7 = () => {
  const [products, setProducts] = useState(initialProducts);
  const [checkets, setCheckets] = useState(initialProducts.map(_ => true));

  const deleteProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const addNewProduct = (product) => {
    setProducts([...products, product]);
    setCheckets([...checkets, true]);
  };

  const handlerCheckProduct = (index) => {
    setCheckets(checkets.map((check, i) => {
      if (i === index) {
        return !check;
      }

      return check;
    }));
  };

  const rowsOfProduct = products.map((product, i) => (
    <Product
      key={i}
      product={product}
      number={i}
      deleteProduct={deleteProduct}
      isChecked={checkets[i]}
      onCheck={handlerCheckProduct}
    />
  ));

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th className="col">Name</th>
            <th className="col">Price</th>
            <th className="col">Count</th>
            <th className="col">Total Price</th>
            <th className="col">Delete</th>
            <th className="col">Checked</th>
          </tr>
        </thead>
        <tbody>
          {rowsOfProduct}
        </tbody>
      </table>
      <AddingProduct addNewProduct={addNewProduct}/>
      <AllCosts products={products} checkets={checkets}/>
    </>

  );
};

const Product = (props) => {
  const {
    product,
    deleteProduct,
    number,
    isChecked,
    onCheck
  } = props;
  const {
    name,
    price,
    count
  } = product;

  const totalPrice = price * count;

  return (
    <tr>
      <td className="col">{name}</td>
      <td className="col">{price}</td>
      <td className="col">{count}</td>
      <td className="col">{totalPrice}</td>
      <td className="col">
        <button
          className="btn"
          type="button"
          onClick={() => deleteProduct(number)}
        >
          Delete
        </button>
      </td>
      <td className="col">
        <input
          type="checkbox"
          name=""
          checked={isChecked}
          onChange={() => onCheck(number)}
        />
      </td>
    </tr>
  );
};

const AddingProduct = (props) => {
  const { addNewProduct } = props;

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [count, setCount] = useState('');

  const handleChange = (e) => {
    const {name, value} = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'price':
        setPrice(value.replace(/[^\d]/g, ''));
        break;
      case 'count':
        setCount(value.replace(/[^\d]/g, ''));
        break;
      default:
        break;
    }
  };

  const handlerSumbitAddProduct = (e) => {
    e.preventDefault();

    const newProduct = {name, price, count}

    addNewProduct(newProduct);
    clearAllStates();
  };

  const clearAllStates = () => {
    setName('');
    setPrice('');
    setCount('');
  };

  return (
    <form onSubmit={handlerSumbitAddProduct}>
      <Input
        name="name"
        value={name}
        onChange={handleChange}
      />
      <Input
        name="price"
        value={price}
        onChange={handleChange}
      />
      <Input
        name="count"
        value={count}
        onChange={handleChange}
      />
      <button className="btn btn-success" type="submit">Add product</button>
    </form>
  );
};

const Input = (props) => {
  const {
    name,
    value,
    onChange,
  } = props;

  return (
    <div className="form-box">
      <label htmlFor={name} className="label">{name}:</label>
      <input
        className="input"
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
    </div>
  );
};

const AllCosts = (props) => {
  const {
    products,
    checkets
  } = props;

  const totalCosts = products.reduce((acc, product, i) => {
    if (checkets[i]) {
      const costOfProduct = product.price * product.count;

      return acc + costOfProduct;
    }

    return acc;
  }, 0);

  return (
  <p>The cost of all products: {totalCosts}</p>
  );
};

export default Task10_7;

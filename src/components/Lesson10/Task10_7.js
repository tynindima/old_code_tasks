import React, { useState, useRef } from 'react';

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
  const products = useProducts(initialProducts);
  const checkets = useCheckeds(initialProducts.map(product => product.name));

  const handleDeleteValue = (name) => {
    products.deleteValue(name);
    checkets.deleteValue(name)
  };

  const addNewProduct = (product) => {
    products.addNewValue(product);
    checkets.addNewValue(product.name);
  };


  const rowsOfProduct = products.value.map((product, i) => (
    <Product
      key={product.name}
      product={product}
      number={i}
      deleteProduct={handleDeleteValue}
      isChecked={checkets.value[i]}
      onCheck={checkets.onCheck}
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
      <AllCosts products={products.value} checkets={checkets.value}/>
    </>

  );
};

const useProducts = (initialState) => {
  const [value, setValue] = useState(initialState);

  const handlerAddNewValue = (newValue) => {
    setValue([...value, newValue])
  };

  const handlerDeleteValue = (name) => {
    setValue(value.filter((product) => product.name !== name));
  };

  return {
    value,
    addNewValue: handlerAddNewValue,
    deleteValue: handlerDeleteValue
  }
};

const useCheckeds = (initialState) => {
  const [value, setValue] = useState(initialState);

  const handlerAddNewValue = (newValue) => {
    setValue([...value, newValue])
  };

  const handlerDeleteValue = (name) => {
    setValue(value.filter((product) => product !== name));
  };

  const handlerCheck = (index, name) => {
    setValue(value.map((check, i) => {
      if (i === index) {
        return check ? '' : name;
      }

      return check;
    }));
  };

  return {
    value,
    addNewValue: handlerAddNewValue,
    deleteValue: handlerDeleteValue,
    onCheck: handlerCheck
  }
};

const useSumbitAddNewProduct = (name, price, count, addProduct) => {

  const handlerSumbitAddProduct = (e) => {
    e.preventDefault();

    const pattern = /^\d+$/;

    const newProduct = {
      name: name.current.value,
      price: price.current.value,
      count: count.current.value
    };

    if (pattern.test(newProduct.price) && pattern.test(newProduct.count)) {
      addProduct(newProduct);
      name.current.value = '';
      price.current.value = '';
      count.current.value = '';
    }
  };

  return {
    onSubmit: handlerSumbitAddProduct
  }
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
          onClick={() => deleteProduct(name)}
        >
          Delete
        </button>
      </td>
      <td className="col">
        <input
          type="checkbox"
          name=""
          checked={isChecked}
          onChange={() => onCheck(number, name)}
        />
      </td>
    </tr>
  );
};

const Input = (props) => {
  const {
    name,
    inputRef
  } = props;

  return (
    <div className="form-box">
      <label htmlFor={name} className="label">{name}:</label>
      <input
        className="input"
        type="text"
        name={name}
        ref={inputRef}
        autoComplete="off"
      />
    </div>
  );
};

const AddingProduct = (props) => {
  const { addNewProduct } = props;

  const name = useRef();
  const price = useRef();
  const count = useRef();
  const submitNewProduct = useSumbitAddNewProduct(name, price, count, addNewProduct);

  return (
    <form onSubmit={submitNewProduct.onSubmit}>
      <Input
        name="name"
        inputRef={name}
      />
      <Input
        name="price"
        inputRef={price}
      />
      <Input
        name="count"
        inputRef={count}
      />
      <button className="btn btn-success" type="submit">Add product</button>
    </form>
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

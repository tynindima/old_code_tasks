import React, { Component } from 'react'

export default class Tusk extends Component {
  state = {
    items: ['Kolya', 'Valya', 'Petya', 'Ivan', 'Dima']
  }

  addItem = () => {
    this.setState(prev => ({
      items: [...prev.items, 'punkt'],
    }));
  };

  delLastItem = () => {
    this.state.items.pop();
    this.setState({items: this.state.items});
  }

  delCurrentItem = (num) => {
    this.state.items.splice(num ,1);
    this.setState({items: this.state.items});
  }


  render() {
    const list = this.state.items.map((item, i) => (
      <li key={i}>
        {item}
        <button onClick={() => this.delCurrentItem(i)}>del</button>
      </li>
    ));
  
    return (
      <div>
        <ul>
          {list}
        </ul>
        <button onClick={this.addItem}>Add</button>
        <button onClick={this.delLastItem}>Del last item</button>
      </div>
    );
  };
}

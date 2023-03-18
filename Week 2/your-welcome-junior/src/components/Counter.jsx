import React from 'react';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    // Bind method to the component;
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  handleIncrement() {
    // Grab our input's value
    const input = document.querySelector('#input');
    const inputValue = input.value;
    // Check if input value is numerical
    if (isNaN(Number(inputValue)))
      return window.alert('bruh enter a number wth');
    this.props.incrementCounter(Number(inputValue));
  }

  handleDecrement() {
    // Grab our input's value
    const input = document.querySelector('#input');
    const inputValue = input.value;
    // Check if input value is numerical
    if (isNaN(Number(inputValue)))
      return window.alert('bruh enter a number wth');
    this.props.decrementCounter(Number(inputValue));
  }

  render() {
    return (
      <div>
        <h3>Counter: {this.props.counter}</h3>
        <div>
          <input type="text" id="input"></input>
          <button onClick={this.handleIncrement}>+</button>
          <button onClick={this.handleDecrement}>-</button>
        </div>
      </div>
    );
  }
}

export default Counter;

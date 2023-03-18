import React from 'react';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import * as actions from '../actions/actions';

// -----------------MAP STATE & DISPATCH METHODS TO COMPONENT PROPS-------------
/**
 * A helper function to map SELECTED DATA from the state object to the props of the component
 * @param {*} state - state object from Redux store
 * @returns A object with only SELECTED DATA
 * @example For this instance, we are mapping counter DATA from the state object to
 */
const mapStateToProps = (state) => {
  /* we return an object with a key value pair, it is given the value our the counter in the state, in the reducers/index.js folder, remember these key-value pairs are given to the props of the component we connect to */
  return { counter: state.counter };
};

/**
 * A helper function to map dispatch function to the props of the component
 * @param {*} dispatch - a function that accepts an action (with type, payload, etc properties).
 *
 * When invoked:
 * => dispatch will send the action to the reducer
 * => update state object.
 *
 * @returns A object with only SELECTED DATA
 * @example For this instance, we are mapping 2 dispatches function to incrementCounter & decrementCounter props.
 */
const mapDispatchToProps = (dispatch) => ({
  // keep in mind we pass an action into dispatch which is created by our action creators
  incrementCounter: (num) =>
    dispatch(actions.incrementCounterActionCreator(num)),
  decrementCounter: (num) =>
    dispatch(actions.decrementCounterActionCreator(num)),
});

// -------------------------------REACT COMPONENT-------------------------------
class MainContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main-container">
        Main Container:
        <hr />
        you will never understand what we do for you
        <hr />
        <Counter
          counter={this.props.counter}
          incrementCounter={(num) => this.props.incrementCounter(num)}
          decrementCounter={(num) => this.props.decrementCounter(num)}
        />
      </div>
    );
  }
}

// ---------------CONNECT THE MAPS TO REACT COMPONENT---------------------------
// Connect `mapStateToProps` and `mapDispatchToProps` to the specified component
// For this instance, we are mapping counter, incrementCounter, and decrementCounter to MainContainer Component.
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

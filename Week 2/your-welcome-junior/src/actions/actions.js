// Import our action types from constants
import * as types from '../constants/actionTypes';

// Export our action creators
export const incrementCounterActionCreator = (num) => {
  return {
    type: types.INCREMENT_COUNTER,
    payload: num,
  };
};

export const decrementCounterActionCreator = (num) => {
  return {
    type: types.DECREMENT_COUNTER,
    payload: num,
  };
};

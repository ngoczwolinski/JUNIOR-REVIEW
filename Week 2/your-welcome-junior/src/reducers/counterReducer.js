import * as types from '../constants/actionTypes.js';

// -------------------------INITIAL STATE-----------------------------
/** Initial state of the React Application
 */
const initialState = {
  counter: 0,
};

// -----------------------------REDUCER-------------------------------
/**
 * A reducer function that executes functionality depending on action.type. Reducer perform based on the following logic:
 * 1. Create a clone of current state object
 * 2. Update the cloned state object based on action type
 * 3. Return the updated state object
 * 4. React Application will re-render where there is a state update => refect the change on the browser
 * @param {*} state - the current state of the React Application
 * @param {*} action - the action object the will contain type, payload, etc propterites
 * @returns updated state => trigger re-render of the React Application
 */
const counterReducer = (state = initialState, action) => {
  // create a clone of our state; keep in mind it would need to be a deep clone if we have nested objects
  const newState = { ...state };
  // switch case the type from action provided to the arg
  switch (action.type) {
    case types.INCREMENT_COUNTER: {
      // increment counter by payload
      newState.counter += action.payload;
      // Return the updated State
      return newState;
    }

    case types.DECREMENT_COUNTER: {
      // decrement counter by payload
      newState.counter -= action.payload;
      // Return the updated State
      return newState;
    }
    // remember switch cases need a default
    default: {
      return state;
    }
  }
};

export default counterReducer;

// Option 2 for Reducer: in this example we destructure the state
/**
 * A reducer function that executes functionality depending on action.type. Reducer perform based on the following logic:
 * 1. Detructure the current state object to obtain its properties
 * 2. Update the state properties based on action type
 * 3. Return the updated state object
 * 4. React Application will re-render where there is a state update => refect the change on the browser
 * @param {*} state - the current state of the React Application
 * @param {*} action - the action object the will contain type, payload, etc propterites
 * @returns updated state => trigger re-render of the React Application
 */
// const counterReducer = (state = initialState, action) => {
//   const { counter } = state;
//   // switch case the type from action provided to the arg
//   switch (action.type) {
//     case types.INCREMENT_COUNTER: {
//       // increment counter by payload
//       counter += action.payload;
//       // Return the updated State
//       return {
//         ...state,
//         counter,
//       };
//     }

//     case types.DECREMENT_COUNTER: {
//       // decrement counter by payload
//       counter -= action.payload;
// Return the updated State

//       return {
//         ...state,
//         counter,
//       };
//     }
//     // remember switch cases need a default
//     default: {
//       return state;
//     }
//   }
// };

import { createStore } from 'redux';
import counterReducer from './reducers/counterReducer';

// we create the redux store with createStore passing in our reducers
const store = createStore(counterReducer);

export default store;
import React, { Component } from 'react';
import MainContainer from './containers/MainContainer.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  } 

  // render a div and create a new instance of our MainContainer
  render() {
    return(
      <div>
        <MainContainer/>
      </div>
    );
  }
}

export default App;
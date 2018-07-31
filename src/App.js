import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <SomeComponent string='something else'/>
      </div>
    );
  }
}

class SomeComponent extends Component{
  constructor(props) {
    super(props);
    this.state = {
      value: 'something',
    }
  }

    render() {
    return (
      <div>
        This is just the output of some random component writing {this.state.value} from the state <br/>
        and {this.props.string} from the props!
      </div>
    );
    }
}


export default App;

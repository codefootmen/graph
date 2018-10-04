import React, { Component } from 'react';
import Home from './containers/Home';
import 'bulma';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Home>
                </Home>
            </div>
        );
    }
}

export default App;

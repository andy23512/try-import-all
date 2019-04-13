import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// Reference: https://stackoverflow.com/questions/42118296/dynamically-import-images-from-a-directory-using-webpack
function importAll(r) {
  let data = {};
  r.keys().map((item, index) => { data[item.replace('./', '')] = r(item); });
  return data;
}

const data = importAll(require.context('./data', false, /\.feature$/));

console.log(data)
// Will get a structure like
// {data1.feature: "/static/media/data1.ab3c103d.feature", data2.feature: "/static/media/data2.edc3d379.feature"}
// With this structure, you can use the URLs to fetch the data

class App extends Component {
  componentDidMount() {
    Promise.all(
      Object.values(data).map(url => window.fetch(url).then(response.text()))
    )
    .then(console.log)
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;

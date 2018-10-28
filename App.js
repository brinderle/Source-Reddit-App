import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";

const mapResults = result => {
  return result.map(row => <div>post title: {row.data.title}</div>);
};

class App extends Component {
  state = {
    result: null,
    userInput: ""
  };
//   router.get('/', function(req, res) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
//     res.setHeader('Access-Control-Allow-Credentials', true); // If needed

//     res.send('cors problem fixed:)');
// });
  updateUserQuote = quote => {
    this.setState({
      userInput: quote
    });
  };
  componentDidMount() {
    // https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=animal
    axios.get("https://www.reddit.com/r/nba.json").then(response => {
      console.log(response);
      const data = response.data.data.children;
      // const data = response.query.pages.extract;
      this.setState({ result: data });
    });
  }
  render() {
    return (
      <div className="App">
      <h1>Enter the Reddit page you want to see the titles for</h1>
      <p>{this.state.userInput}</p>
      <input
          value={this.state.userInput}
          onChange={e => {
            this.updateUserQuote(e.target.value);
          }}
        />
        {/* {this.state.result} */}
        {this.state.result !== null && mapResults(this.state.result)}
      </div>
    );
  // render() {
  //   return (
  //     <div className="App">
  //       <header className="App-header">
  //         <img src={logo} className="App-logo" alt="logo" />
  //         <p>
  //           Edit <code>src/App.js</code> and save to reload.
  //         </p>
  //         <a
  //           className="App-link"
  //           href="https://reactjs.org"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           Learn React
  //         </a>
  //       </header>
  //     </div>
  //   );
  }
}

export default App;

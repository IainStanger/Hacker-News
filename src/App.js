import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
}

 handleClick() {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(res) {
      let output = '<h2 class="posts">Posts</h2>';

      function getPosts(id) 
      {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          output +=
          `<div className="output">
          <h3><a href=${data.url}>${data.title}</a></h3>
          <p>by: ${data.by}             <a href="">comments</a></p>
          </div>`;
          document.getElementById('output').innerHTML = output;
        });
        };
    
      for(let i = 0; i < res.length; i++) {
        getPosts(res[i])
      };
    });
  }

  render() {
    return (
      <div className="App">
        <header className="header">
          <h1 className="title">Welcome to your Hacker News Client!</h1>
        </header>
        <div className="container">
          <h1 className="display">Click here to get the latest stories</h1>
        <div className="results">
          <button className="button" onClick={this.handleClick}>Top Stories</button>
        </div>
          <div id="output"></div>
        </div>
      </div>
      );
    }
  }

export default App;
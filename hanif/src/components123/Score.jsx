import React, { Component } from 'react';
import '../App.css';

class Score extends Component {
  render() {
    const { score, onRestart } = this.props;

    return (
      <div>
        <h2>Results</h2>
        <h4>Your score: {score}</h4>
        <button onClick={onRestart}>Restart Quiz</button>
      </div>
    );
  }
}

export default Score;




import React, { Component } from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';
import { Link } from 'react-router-dom';


export default class Dashboard extends Component {
  state = {
     language: '',
     words: []
  }
  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/language`, {
      method: 'GET',
      headers: {
        'authorization':`bearer ${TokenService.getAuthToken()}`
      }
    })
    .then (res =>
      (!res.ok) 
        ? res.json().then(e => Promise.reject(e)) 
        : res.json()  
    )
    .then(res => {
      this.setState({
        language: res.language,
        words: res.words
      });
    })
    .catch(error => {
      console.error({error})
    })
  }
  render() {
    return (
      <div className="dashboard">
        <h2> {this.state.language.name} </h2>
        <section className="user-score"> {this.state.language.total_score} </section>
        <Link to="/learn" className="user-practice-link"> Practice some Spanish </Link>
        <h3 className="word-list-title"> Words to Know </h3>
          <ul className="word-list">
            {this.state.words.map((word, idx) => {
              return (
                <li key={idx} className="word">
                  <h4> {word.original} </h4>
                  <span className="correct-answers"> Your Correct Answers: {word.correct_count} </span>
                  <span className="incorrect-answers"> Incorrect Answers: {word.incorrect_count} </span>
                </li>
              )
            })}
          </ul>
      </div>
    )
  }
};

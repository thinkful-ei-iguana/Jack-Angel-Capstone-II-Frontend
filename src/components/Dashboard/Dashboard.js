import React, { Component } from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';
import { Link } from 'react-router-dom';
import '../../Styles/Dashboard.css'

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
        <h3 className="word-list-title"> Word Flash Cards </h3>
          <ul className="word-list">
            {this.state.words.map((word, idx) => {
              return (
                <div className="card-container">
                  
                  <div className="theCard"> 
                    <div class="lines"></div>
                    <div className="card-front">
                      <li key={idx} className="word">
                        <span> {word.original} </span>
                      </li> 
                    </div>
            
                    <div className="card-back">
                      <li> 
                        <span className="translation"> {word.translation} </span> 
                      </li>
                      <li>
                        <span className="correct-answers"> 
                          Your Correct Answers: {word.correct_count} 
                        </span>
                      </li>
                      <li>
                        <span className="incorrect-answers"> 
                          Incorrect Answers: {word.incorrect_count} 
                        </span>
                      </li>
                    </div>
                  </div>
                </div>
              )
            })}
          </ul>
      </div>
    )
  }
};

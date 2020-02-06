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
        <section className="user-score"> Your Total Score: {this.state.language.total_score} </section>
        <Link to="/learn" className="user-practice-link"> {this.state.language.name} Quiz </Link>
        <h4 className="word-list-title"> {this.state.language.name} Vocabulary Flash Cards </h4>
          <ul className="word-list">
            {this.state.words.map((word, idx) => {
              return (
                <div className="card-container">
                  
                  <div className="theCard"> 
                    <div class="lines"></div>
                    <div className="card-front">
                      <li key={idx} className="word">
                        <h3 className="theWord"> {word.original} </h3>
                      </li> 
                    </div>
            
                    <div className="card-back">
                      <li> 
                        <h3 className="translation"> {word.translation} </h3> 
                      </li>
                      <li>
                        <p className="answers"> 
                          Your Correct Answers: {word.correct_count} 
                        </p>
                      </li>
                      <li>
                        <p className="answers"> 
                          Incorrect Answers: {word.incorrect_count} 
                        </p>
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

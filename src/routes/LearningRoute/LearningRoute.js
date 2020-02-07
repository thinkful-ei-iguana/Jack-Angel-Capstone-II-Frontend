import React, { Component } from 'react'
import TokenService from '../../services/token-service';
import config from '../../config';
import { Input, Label } from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import '../../Styles/Learn.css'
export default class LearningRoute extends Component {
  state = {
    head:'',
    total:'',
    correctWords:'',
    incorrectWords:'',
    guess:'',
    answer:'',
    correct: null,
    currentWord: ''
  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/language/head`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res=>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()  
    )
    .then(data => {

      this.setState({ 
        head: data.nextWord, 
        total: data.totalScore, 
        correctWords: data.wordCorrectCount, 
        incorrectWords: data.wordIncorrectCount, 
        currentWord: data.nextWord 
      });
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${config.API_ENDPOINT}/language/guess`,{
      method: 'POST',
      headers : {
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
        'content-type' : 'application/json'
      },
      body: JSON.stringify({guess: this.state.guess})
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
    .then(data => {

      this.setState({
        head: data.nextWord,
        answer: data.answer, 
        correct: data.isCorrect,
        currentWord: this.state.head,
        correctWords: data.wordCorrectCount,
        incorrectWords: data.wordIncorrectCount,
        total: data.totalScore
      });
    });
  };

  handleInput = (e) => {
    const guess = e.target.value;
    let str = guess.toLowerCase();
    this.setState({
      guess: str
    });
  };

  handleNext = () => {
    console.log('im fired up')
    this.setState({
      answer:'',
      guess:''
    })
  }

  render() {
    let result;
    if(this.state.correct === true) {
      result = <> <h3 className="feedback-title"> Correct! </h3>
        <p className="correct-translation-feedback"> The correct translation for <b>{this.state.currentWord}</b> was <b>{this.state.answer}</b>, you chose <b>{this.state.guess}</b>. Way to go! </p>
      </>
    } else if (this.state.correct === false) {
      result = (
        <>
          <h3 className="feedback-title"> Good try but your answer is incorrect! </h3>
            <p className="correct-translation-feedback"> The correct translation for <b>{this.state.currentWord}</b> was <b>{this.state.answer}</b>, you chose <b>{this.state.guess}</b>. </p>
        </>
      );
    };
    return (
      <div> 
        <section>
          <p className="total-score"> {`Your total score is: ${this.state.total}`} </p>
          <div className="main-container">
            {!this.state.answer
              ?(
                <div className="container"> 
                <div class="lines-q"></div>
                  <h3 className="question"> Translate the word: </h3>
                  <div className="form-container">
                  
                    <form className="guess-word-form" onSubmit={e => this.handleSubmit(e)}>
                      
                      <p className="word-to-translate"> {this.state.head} </p>
                      <Input 
                        placeholder="Translation"
                        type="text"
                        value={this.state.guess}
                        onChange={e => this.handleInput(e)}
                        name="question"
                        className="question-input"
                        recquired
                      /><br/>
                      <Button 
                        type="submit" 
                        className="submit-guess-btn"
                      > 
                        Submit 
                      </Button>
                    </form> 
                  </div> 
                <div>
                  <p className="feedback-correct"> Times you've answered correctly : {this.state.correctWords} </p>
                  <p className="feedback"> Times you've answered incorrectly : {this.state.incorrectWords} </p>
                </div>
              </div>
            )
            :(
              <div className="results-page"> 
              <div className="lines-r"></div>
                 { this.state.correct ? result:result } 
                  <Button 
                    className="next-question-btn" 
                    onClick={() => this.handleNext()}
                  > 
                  Next Word 
                </Button>
            <p className="result-text"> Keep practicing, youre doing so well! </p>
               </div>
            )}
          </div>
        </section>
      </div>
    );
  }
}
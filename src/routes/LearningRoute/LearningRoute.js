import React, { Component } from 'react'
import TokenService from '../../services/token-service';
import config from '../../config';
import { Input, Label } from '../../components/Form/Form';
import Button from '../../components/Button/Button';

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
        correct: data.correct,
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
      result = <> <h2> Correct! </h2>
        <p> The correct translation for {this.state.currentWord} was {this.state.answer} you chose {this.state.guess}. Way to go! </p>
      </>
    } else if (this.state.correct === false) {
      result = (
        <>
          <h2> Good try but your answer is incorrect! </h2>
            <p> The correct translation is for {this.state.currentWord} was {this.state.answer}, you chose {this.state.guess}. </p>
        </>
      );
    };
    return (
      <div> 
        <section>
          <p> {`Your total score is: ${this.state.total}`} </p>
          <div>
            {!this.state.answer
              ?(
                <> 
                  <h3> Translate the word: </h3>
                  <span> {this.state.head} </span> 
                  <form className="guess-word-form" onSubmit={e => this.handleSubmit(e)}>
                  <Label> What is the translation for this word ? </Label>
                    <Input 
                      type="text"
                      value={this.state.guess}
                      onChange={e => this.handleInput(e)}
                      name="question"
                      recquired
                    />
                  <Button type="submit" className="submit-guess-btn"> Submit </Button>
                </form> 
                <div>
                  <p> Times you've answered correctly: {this.state.correctWords}. </p>
                  <p> Times you've answered incorrectly: {this.state.incorrectWords}. </p>
                </div>
                </>)
              :(<> 
              <h3> { this.state.correct ? result:result } </h3>
              <Button className="next-question-btn" onClick={() => this.handleNext()}> Next </Button>
              <p> Keep practicing, youre doing so well! </p>
               </>)
            }
          </div>
        </section>
      </div>
    );
  }
}
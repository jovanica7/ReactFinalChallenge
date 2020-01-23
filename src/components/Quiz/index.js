import React, { PureComponent } from 'react';
import './index.css';

class QuizComponent extends PureComponent {

constructor (props) {
    super (props)
    this.state = {
        data: [],
        current: 0,
        question: '',
        answer: '',
        wrongAnswers: [],
        options: [],
        started: false,
        userAnswer: null,
        score: 0,
        disabled: true,
        finished: false,
        counter: 0,
    }
}
async componentDidMount() {
    const response = await fetch('https://opentdb.com/api.php?amount=10&category=19&difficulty=medium&type=multiple');
    const json = await response.json();
    this.setState(() => {
        return {
            data: json.results,
            question: json.results[this.state.current].question,
            answer: json.results[this.state.current].correct_answer,
            wrongAnswers: json.results[this.state.current].incorrect_answers,
            
        }     
    });
    let options = this.shuffle([...json.results[this.state.current].incorrect_answers, json.results[this.state.current].correct_answer])
    this.setState({
      options: options
    })
    let counter = 0;
        const interval = setInterval(() => {
        counter += 1;
        this.setState({
            counter: counter
        })
            if (this.state.finished) {
                clearInterval(interval);
            }
        }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate(prevProps, prevState) {
    const { data } = this.state;
    if (this.state.current !== prevState.current) {
      this.setState(() => {
        return {
            disabled: true,
            question: data[this.state.current].question,
            answer: data[this.state.current].correct_answer,
            wrongAnswers: data[this.state.current].incorrect_answers
        };
      });
      let options = this.shuffle([...data[this.state.current].incorrect_answers, data[this.state.current].correct_answer])
      this.setState({
        options: options
      })
    }
  } 

startQuiz = () => {
      this.setState({
          started: true
      })
}

setUserAnswer = (answer) => {
    this.setState({
        userAnswer: answer,
        disabled: false
    })
}

goToNextQuestion = () => {
    this.setState({
      current: this.state.current + 1
    });

    const { userAnswer, answer, score } = this.state;

    if (userAnswer === answer) {
      this.setState({
        score: score + 1
      });
    }
}

shuffle(array) {
  let length = array.length, temp, index;
  while (length > 0) {
      index = Math.floor(Math.random() * length);
      length--;
      temp = array[length];
      array[length] = array[index];
      array[index] = temp;
  }
  return array
}
  
finishQuiz = () => {
    this.setState({
      finished: true
    });
} 

playAgain = () => {
    this.setState({
      started: false,
      finished: false
    })
    window.location.reload();
}

render () {
    const { data, current, started, options, userAnswer, finished } = this.state;

if (started === false) {
return (
        
        <div className="container">
        <div className="title">Welcome to Math quiz!</div>
        <button className="startBtn" onClick={this.startQuiz}>Start!</button>
        </div>        
    )
}

else  if (finished) {
    return (
      <div className="container">
        <h2>Game Over! You scored {this.state.score} {this.state.score === 1? 'point' : 'points'} and {this.state.score > 5 ? 'succeded' : 'failed'} to solve the quiz.</h2>
        <h2>Time needed for taking the quiz was {this.state.counter} seconds. </h2>
          <h2>Correct answers:</h2>
          <div className="correctAnswers">
            {data.map((item, index) => (
              <div className="correctAnwer" key={index}>
                {item.correct_answer}
              </div>
            ))}
        </div>
        <button className="playAgainBtn" onClick={this.playAgain}>Play again</button>
      </div>
    );
  } 

 else {
      return (
        <div className="container">
          <h1>{this.state.question} </h1>
          <h3>{`Question ${current + 1} out of ${data.length}`}</h3>       

            {options.map((option, index) => (
              <p key={index} onClick={() => this.setUserAnswer(option)} className={`options ${userAnswer === option ? "selected" : null}`}>
                {option}
              </p>
            ))}
          
          {current < 9 && (
            <button className="nextBtn" disabled={this.state.disabled} onClick={this.goToNextQuestion}>
              Next
            </button>
          )}
          {current === 9 && (
            <button className="nextBtn" onClick={this.finishQuiz} disabled={this.state.disabled}>
              Finish
            </button>
          )}
          </div>
      );
    }

}

}

export default QuizComponent;
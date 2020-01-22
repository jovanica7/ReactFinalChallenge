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
        finished: false
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

    console.log(options);
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
  
      console.log(options);
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
  console.log(array);
  return array
}
  
finishQuiz = () => {
    this.setState({
      finished: true
    });
} 

playAgain = () => {
    this.setState({
      started: false
    })
}

render () {
    const { data, current, started, options, userAnswer, finished } = this.state;

if (started === false) {
return (
        
        <div className="container">
        <div className="title">Quiz</div>
        <button className="startBtn" onClick={this.startQuiz}>Start!</button>
        </div>        
    )
}

else  if (finished) {
    return (
      <div className="container">
        <h1>Game Over! You scored {this.state.score} {this.state.score === 1? 'point' : 'points'}. </h1>
          <h2>Correct answers:</h2>
          <div>
            {data.map((item, index) => (
              <p key={index}>
                {item.correct_answer}
              </p>
            ))}
        </div>
        <button className="nextBtn" onClick={this.playAgain}>Play again</button>
      </div>
    );
  } 

 else {
      return (
        <div className="container">
          <h1>{this.state.question} </h1>
          <span>{`Question ${current + 1} out of ${data.length}`}</span>       

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
import React, { PureComponent } from 'react';
import '../index.css';
import WelcomeComponent from '../Welcome';
import ResultComponent from '../Result';
import ReactHtmlParser from 'react-html-parser'

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
        counter: 0
    }
}
async componentDidMount() {
  const response = await fetch('https://opentdb.com/api.php?amount=10&category=' + this.props.category + '&difficulty=medium&type=multiple');
  const json = await response.json();
  this.setState(() => {
        return {
            data: json.results,
            question: ReactHtmlParser(json.results[this.state.current].question),
            answer: json.results[this.state.current].correct_answer,
            wrongAnswers: json.results[this.state.current].incorrect_answers,        
        }     
  });
  let options = this.shuffle([...json.results[this.state.current].incorrect_answers, json.results[this.state.current].correct_answer])
  this.setState({
        options: options
  });

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
            question: ReactHtmlParser(data[this.state.current].question),
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

   // this.forceUpdate();
    window.location.reload();

}

render () {
    const { data, current, started, options, userAnswer, finished } = this.state;

if (started === false) {
return (
        <WelcomeComponent start={this.startQuiz} category={this.props.categoryName}/>             
    )
}

else  if (finished) {
    return (
      <ResultComponent score={this.state.score} counter={this.state.counter} answers={data} play={this.playAgain}/>
    )
  } 

 else {
    return (
      <div className="container">
      <h1>{this.state.question} </h1>
      <h3>{`Question ${current + 1} out of ${data.length}`}</h3>       
      <div className="allOptions">
        {options.map((option, index) => (
          <p key={index} onClick={() => this.setUserAnswer(option)} className={`options ${userAnswer === option ? "selected" : null}`}>
            {option}
          </p>
          
        ))}
      </div>
      
      {current < data.length - 1 && (
        <button className="nextBtn" disabled={this.state.disabled} onClick={this.goToNextQuestion}>
          Next
        </button>
      )}
      {current === data.length - 1 && (
        <button className="finishBtn" onClick={this.finishQuiz} disabled={this.state.disabled}>
          Finish
        </button>
      )}
      </div>
    )
  }

}

}

export default QuizComponent;
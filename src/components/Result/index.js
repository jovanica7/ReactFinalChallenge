import React from 'react';
import '../index.css';

const ResultComponent = props => {
    return (
        <div className="container">
        <h2 className={props.score > 5 ? "passed" : "failed"}>Game Over! You scored {props.score} {props.score === 1? 'point' : 'points'} and {props.score > 5 ? 'succeded' : 'failed'} to solve the quiz.</h2>
        <h3>Time needed for taking the quiz was {props.counter} seconds. </h3>
          <h2>Correct answers:</h2>      
            {props.answers.map((item, index) => (
              <p className="correctAnwer" key={index}>
                {item.correct_answer}
              </p>
            ))}
        <button className="playAgainBtn" onClick={props.play}>Play again</button>
        </div>
       )
}


export default ResultComponent;
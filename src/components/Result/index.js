import React from 'react';
import '../index.css';

const ResultComponent = props => {
    return (
      <div className="quizBackground">
          <div className="container">
            <h2 className={props.score > 5 ? "passed" : "failed"}>Game Over! You scored {props.score} {props.score === 1? 'point' : 'points'} and {props.score > 5 ? 'succeded' : 'failed'} to solve the quiz.</h2>
            <h3>Time needed for taking the quiz was {props.counter} seconds. </h3>
              <h3>Correct answers:</h3>      
                {props.answers.map((item, index) => (
                  <p className="correctAnwer" key={index}>
                    {item.correct_answer}
                  </p>
                ))}
            <div id="buttons">
            <button className="playAgainBtn" onClick={props.play}>Play again</button>
            <button className="shareBtn">Share</button>
            </div>
          </div>
        </div>
       )
}


export default ResultComponent;
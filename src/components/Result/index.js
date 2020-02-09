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
            <button className="shareBtn" data-href="https://quiz-3002b.firebaseapp.com/" data-layout="button"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fquiz-3002b.firebaseapp.com%2F&amp;src=sdkpreparse">Share</a></button>
            </div>
          </div>
        </div>
       )
}


export default ResultComponent;
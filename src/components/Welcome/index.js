import React from 'react';
import '../index.css';


const WelcomeComponent = props => {
    return (
        <div className="container">
        <div className="title">Welcome to Math quiz!</div>
        <h3>You need at least 6 out of 10 correct answers to pass.</h3>
        <button className="startBtn" onClick={props.start}>Start!</button>
        </div> 
       )

}


export default WelcomeComponent;
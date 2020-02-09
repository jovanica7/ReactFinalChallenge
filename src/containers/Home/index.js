import React, { PureComponent } from 'react';
import './index.css';
import QuizComponent from './../../components/Quiz/index';
import NavComponent from '../../components/Nav';

class HomeComponent extends PureComponent {

    constructor (props) {
        super (props)
        this.state = {
            selected: false,
            category: '',
            categoryName: ''
        }
    }

    render () {

        if (this.state.selected) {
                return (
                    <QuizComponent category={this.state.category} categoryName={this.state.categoryName}/>
                )
        }

        else {
            return (     
                <div id="homeBackground">
                <NavComponent picture = {this.props.picture} nickName = {this.props.nickName} />
                <div id="home">
                    <div id="mathematics">
                        <h1>Mathematics</h1>
                        <button id="mathBtn" className="chooseBtn" onClick={this.selectedQuiz}>Choose me!</button>
                    </div>
                    <div id="sciNature">
                        <h1>Science and Nature</h1>
                        <button id="sciNatureBtn" className="chooseBtn" onClick={this.selectedQuiz}>Choose me!</button>
                    </div>
                    <div id="sports">
                        <h1>Sports</h1>
                        <button id="sportsBtn" className="chooseBtn" onClick={this.selectedQuiz}>Choose me!</button>
                    </div>
                    <div id="animals">
                        <h1>Animals</h1>
                        <button id="animalsBtn" className="chooseBtn" onClick={this.selectedQuiz}>Choose me!</button>
                    </div>
                </div>
                </div>
            )
        }
        
    }

    selectedQuiz = (event) => {
        const buttonId = event.target.id;
        switch (buttonId) {
            case 'mathBtn':
                this.setState({
                    selected: true,
                    category: '19',
                    categoryName: 'Math'
                });
              break;
            case 'sciNatureBtn':
                this.setState({
                    selected: true,
                    category: '17',
                    categoryName: 'Science and Nature'
                });
              break;
            case 'sportsBtn':
                this.setState({
                    selected: true,
                    category: '21',
                    categoryName: 'Sports'
                });
              break;
            case 'animalsBtn':
                this.setState({
                    selected: true,
                    category: '27',
                    categoryName: 'Animals'
                });
              break; 
               
          }

         
    }

}

export default HomeComponent;
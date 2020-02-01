import React, { PureComponent } from 'react';
import './index.css';

class HomeComponent extends PureComponent {

    constructor (props) {
        super (props)
        this.state = {
            selectedMath: false,
            selectedArt: false,
            selectedSports: false,
            selectedAnimals: false
        }
    }

    render () {

        if (this.state.selectedMath) {
                return (
                    <div>Matis</div>
                )
        }

        else if (this.state.selectedArt) {
            return (
                <div>Umetnost</div>
            )
        }

        else if (this.state.selectedSports) {
            return (
                <div>Sport</div>
            )
        }

        else if (this.state.selectedAnimals) {
            return (
                <div>Zivotinje</div>
            )
        }

        else {
            return (
            
                <div className="background">
                <div className="nav"><a href="/#">Korisnik</a></div>
                <div className="home">
                    <div id="mathematics">
                        <h1>Mathematics</h1>
                        <button id="mathBtn" className="chooseBtn" onClick={this.selectedQuiz}>Choose me!</button>
                    </div>
                    <div id="art">
                        <h1>Art</h1>
                        <button id="artBtn" className="chooseBtn" onClick={this.selectedQuiz}>Choose me!</button>
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
                    selectedMath: true,
                });
              break;
            case 'artBtn':
                this.setState({
                    selectedArt: true,
                });
              break;
            case 'sportsBtn':
                this.setState({
                    selectedSports: true,
                });
              break;
            case 'animalsBtn':
                this.setState({
                    selectedAnimals: true,
                });
              break;      
          }
          console.log(buttonId)
        
    }

}

export default HomeComponent;
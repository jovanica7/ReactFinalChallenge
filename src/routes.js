import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RegisterComponent from './containers/Register/index';
import HomeComponent from './containers/Home/index';
import QuizComponent from './components/Quiz/index';

const Routes = () => {

    return (
    <BrowserRouter>
        <Switch>
            <Route exact path="register" component={RegisterComponent} />
            <Route path="/home" component={HomeComponent} />  
            <Route path="/quiz" component={QuizComponent} />     
        </Switch>
    </BrowserRouter>
    )
}

export default Routes;
import React from 'react';

import { connect } from 'react-redux';

import { Route, Switch } from "react-router-dom";
  
import Navbar from './Navbar';
import Login  from './forms/Login';
import Signup  from './forms/Signup';
import SurveyGrid from './SurveyGrid';
import SurveyPersonal from './SurveyPersonal';

import jwt from 'jsonwebtoken';

import { logoutAction, loginAction, registerAction } from '../redux/actions/userActions';


class WelcomePage extends React.Component {

    componentDidMount() {
        setTimeout( () => this.props.history.push("/survey"), 1000);
    }

    render() {
        const { auth, registerResult} = this.props;
        const nameDecoded =jwt.decode(auth.token);

    return (
    <div>
        <p className="title is-3 has-text-centered">{!!nameDecoded ?`Welcome ${nameDecoded.username}!` : "Home"}</p>
        {(registerResult.message || auth.message) && 
        <div className="notification is-success CST_isolated">
            <p>{registerResult.message}{auth.message}</p>
        </div>}
    </div>
    )
}
};

class Homepage extends React.Component {

    render() {
        const { auth, submit, logoutProp, registerResult, 
                register} = this.props;
        return(
            <div>
                <Navbar isAuthenticated={!!auth.token} logout={logoutProp}/>            
                <Switch>
                    <Route path="/" exact render={(props)=>(<WelcomePage {...props} auth={auth} registerResult={registerResult} />)}  />
                    <Route path="/login" render={(props) => (<Login {...props} userAuth={auth} submit={submit} logout={logoutProp}/>)} />
                    <Route path="/signup" render={(props) => (<Signup {...props} operationState={registerResult} submit={register} logout={logoutProp}/>)} />
                    <Route path="/survey" render={(props) =>(<SurveyGrid {...props} />)} />
                    <Route path="/ownSurvey" render={(props) =>(<SurveyPersonal {...props} />)} />
                </Switch>
            </div>
        );
    };
};

const mapStateToProps = state => ({
    auth: state.authState,
    registerResult: state.signupState
});

const mapDispatchToProps = dispatch => ({
    logoutProp: () => {
        dispatch( logoutAction() )
    },
    submit: (data) => {
        dispatch( loginAction(data) )
    }, 
    register: (data) => {
        dispatch( registerAction(data) )
    }
})
export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(Homepage);
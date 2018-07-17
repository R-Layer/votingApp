import React from 'react';

import { loginAction, logoutAction } from '../redux/actions/userActions';
import { fetchSurveysAction, createSurveyAction, 
         updateSurveyAction, deleteSurveyAction } from '../redux/actions/surveyActions';

import { connect } from 'react-redux';

class SurveyPage extends React.Component {

    handleFirst = () => {
        this.props.fetchSurveys();
    };

    handleFirstLogin = () => {        
        const requestBody = {
            email: this.firstEmail.value,
            password: this.firstPassword.value
        };
        this.props.login(requestBody);
     };

    handleSecondCreate = () => {
        const newSurveyData = {
            title: this.secondTitle.value,
            surveyOptions: [this.secondOptionOne.value,
                      this.secondOptionTwo.value,
                      this.secondOptionThree.value]
        };
        this.props.createSurvey(newSurveyData);
    }

    handleThirdUpdate = () => {
        const updateSurveyData = {
            title: this.thirdTitle.value,
            surveyOptions: [{x: this.thirdOptionOne.value},
                      {x: this.thirdOptionTwo.value},
                      {x: this.thirdOptionThree.value}],
            markToDel: [],//{x:this.thirdOptionOne.value}, {x:this.thirdOptionThree.value}],
            markToAdd: [{x: 'NewOpt1'}, {x: 'NewOpt2'}],
            markToVote: this.thirdOptionThree.value,
            updateOperation:'Vote'
        };
        this.props.updateSurvey(this.thirdSurveyToUpdate.value, updateSurveyData);
    };

    handleFourthDelete = () => {
        this.props.deleteSurvey(this.fourthSurveyToDelete.value);
    }
    render() {
         return(
                <div className="home-container">
                    <h1 className="home-title">Survey Home Page</h1>
                    <div className="form-container">
                        <h3 className="form-title">Login form</h3>
                        <label>Email</label>
                        <input className="form-field" name="email" ref={(c) => this.firstEmail = c}/>
                        <br/>
                        <label>Password</label>
                        <input className="form-field" name="password" ref={(c) => this.firstPassword = c} />
                        <br/>
                        <button onClick={this.handleFirstLogin}>Login</button>
                        <label className="form-field">{JSON.stringify(this.props.auth.message)}</label>
                        <button onClick={() => this.props.logout()}>Logout</button>
                    </div>
                    <div className="form-container">
                        <h3 className="form-title">Fetch surveys form</h3>
                        <button onClick={this.handleFirst}>Fetch</button>
                        <ul>
                            {this.props.surveysList.surveys && this.props.surveysList.surveys.map(srv => (<ul key={srv._id}>
                                                                                                            <li key={srv._id}>{srv.title}</li>
                                                                                                            <ul>
                                                                                                                {srv.surveyOptions.map( (opt, ind) => (<li key={ind}>{opt.x} - {opt.y} - {opt._id}</li>) )}
                                                                                                            </ul>
                                                                                                          </ul> ))}
                        </ul>
                        <label className="form-field">
                            {this.props.surveysList.message}
                            {JSON.stringify(this.props.surveysList.err)}
                        </label>
                    </div>
                    <div className="form-container">
                        <h3 className="form-title">Survey creation form</h3>
                        <label>Title</label>
                        <input className="form-field" name="title" ref={(c) => this.secondTitle = c}/>
                        <br/>
                        <label>Options</label>
                        <input className="form-field" name="email" ref={(c) => this.secondOptionOne = c}/>
                        <br/>
                        <input className="form-field" name="email" ref={(c) => this.secondOptionTwo = c}/>
                        <br/>
                        <input className="form-field" name="email" ref={(c) => this.secondOptionThree = c}/>
                        <br/>
                        <button onClick={this.handleSecondCreate}>Create</button>
                        <label className="form-field">
                            {this.props.createResult.message}
                            {JSON.stringify(this.props.createResult.newSurvey)}
                        </label>
                    </div>
                    <div className="form-container">
                        <h3 className="form-title">Survey update form</h3>
                        <label>SurveyToUpdate</label>
                        <input className="form-field" name="surveyToUpdate" ref={(c) => this.thirdSurveyToUpdate = c}/>
                        <br/>
                        <br/>
                        <label>Title</label>
                        <input className="form-field" name="title" ref={(c) => this.thirdTitle = c}/>
                        <br/>
                        <label>Options</label>
                        <input className="form-field" name="option-one" ref={(c) => this.thirdOptionOne = c}/>
                        <br/>
                        <input className="form-field" name="option-two" ref={(c) => this.thirdOptionTwo = c}/>
                        <br/>
                        <input className="form-field" name="option-three" ref={(c) => this.thirdOptionThree = c}/>
                        <br/>
                        <button onClick={this.handleThirdUpdate}>Update</button>
                        <label className="form-field">
                            {this.props.updateResult.message}
                            {JSON.stringify(this.props.updateResult.updatedSurvey)}
                        </label>
                    </div>
                    <div className="form-container">
                        <h3 className="form-title">Survey delete form</h3>
                        <label>Survey To delete</label>
                        <input className="form-field" name="surveyToDelete" ref={(c) => this.fourthSurveyToDelete = c}/>
                        <br/>
                        <button onClick={this.handleFourthDelete}>Delete</button>
                        <label className="form-field">
                            {this.props.deleteResult.message}
                            {JSON.stringify(this.props.deleteResult.removedSurvey)}
                        </label>
                    </div>
                </div>
        );
    };
};

const mapStateToProps = state => ({
    auth: state.authState,
    surveysList: state.surveysState,
    createResult: state.surveyCreationState,
    updateResult: state.surveyUpdateState,
    deleteResult: state.surveyDeleteState
});

const mapDispatchToProps = dispatch => ({
    login: data => {
        dispatch( loginAction(data));
    },
    logout: () => {
        dispatch( logoutAction());
    },
    fetchSurveys: () => {
        dispatch( fetchSurveysAction() );
    },
    createSurvey: (data) => {
        dispatch( createSurveyAction(data) );
    },
    updateSurvey: (id, newData) => {
        dispatch( updateSurveyAction( id, newData) );
    },
    deleteSurvey: (id) => {
        dispatch( deleteSurveyAction(id) );
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyPage);

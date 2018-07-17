import React from 'react';

import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';

import {fetchOwnSurveysAction, updateSurveyAction,
        deleteSurveyAction } from '../redux/actions/surveyActions';


class SurveyPersonal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ownSurveys: [],
            activeDropdown: -1
        }
    };

    delHandler(id) {
        this.props.deleteSurvey(id);
        this.updateSurveys();
    };

    removeOption = (title,opt) => {
        const bodyRequest = {
            markToDel: {x:opt},
            updateOperation: 'Del'
        };
        
        this.props.updateSurvey(title, bodyRequest).then( () => this.updateSurveys() );
    };

    componentDidMount () {
        this.updateSurveys();
    };

    updateSurveys = () => {
        const idOwner = jwt.decode(this.props.auth.token).id;
        this.props.fetchOwn(idOwner).then(results => this.setState({ownSurveys: results.personalSurveys}));
    };

    manageDropdown = (ind) => (e) => {
        if(e.target.classList[0] !== "CST_stripe-del" && e.target.classList[0] !=="CST_survey-title") {
        if (this.state.activeDropdown === ind) {
            this.setState({
                activeDropdown: -1
            });
        } else {
            this.setState({
                activeDropdown: ind
            });
        };
    }
    };

    render() {
        const { ownSurveys } = this.state;
        const surveyTiles = ownSurveys.map( (poll, ind) => (

                <article className="message is-marginless" key={ind}>
                    <div className="message-header has-background-link is-radiusless is-flex" onClick={this.manageDropdown(ind)} >
                            <span className="icon is-small">
                                <i className={`CST_toggler ${this.state.activeDropdown === ind ? "CST_open" : ""}`}></i>
                            </span>
                            <span className="CST_survey-title">{poll.title}</span>
                            <div className="CST_stripe-del"  onClick={() => this.delHandler(poll._id)}>
                                <span className="CST_survey-title">DELETE SURVEY</span>
                            </div>
                    </div>
                    <div className={`message-body ${this.state.activeDropdown === ind ? "" : "CST_not-visible"}`}>
                                {poll.surveyOptions.map( (opt, indx) => (
                                    <div className="columns CST_h-divider" key={indx}>
                                        <span className="column is-4 is-offset-2">{opt.x}</span>
                                        <span className="column is-2">{opt.y}</span>
                                        <span className="column is-4"><button className="CST_stripe-del" onClick={() => this.removeOption(poll.title, opt.x)}>REMOVE OPTION</button></span>
                                    </div>
                                ))}
                    </div>
                </article>))

return (
    <section className="section has-background-grey-light">
    <h3 className="title is-3 has-text-centered">POLLS CREATED</h3>
    <h5 className="subtitle is-5 has-text-centered">Click to see the survey details</h5>
        {surveyTiles}
    </section>
        )
    };
};

const mapStateToProps = state => ({
    auth: state.authState,
});

const mapDispatchToProps = dispatch => ({
    fetchOwn: (owner) => (
        dispatch(fetchOwnSurveysAction(owner) )
    ),    
    updateSurvey: (id, newData) => (
        dispatch( updateSurveyAction( id, newData) )
    ),
    deleteSurvey: (id) => (
        dispatch( deleteSurveyAction(id) )
    )
})

export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(SurveyPersonal);


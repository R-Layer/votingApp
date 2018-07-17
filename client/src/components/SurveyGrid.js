import React from 'react';

import { connect } from 'react-redux';

import SurveyForm from './forms/SurveyForm';
import SurveyDetails from './SurveyDetails';

import { fetchSurveysAction, createSurveyAction, 
         deleteSurveyAction, updateSurveyAction } from '../redux/actions/surveyActions';

class SurveyGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            detail: false,
            detailSurvey: {},
            actualSurveys: [],
            modalIsActive: false
        }
    };

    componentDidMount () {
        this.updateSurveys();
    };

    submitHandler = (data) => {
        this.props.createNewSurvey(data).then( () => 
            this.updateSurveys() )
    }

    delHandler(id) {
        this.props.deleteSurveyAction(id);
        this.updateSurveys();
    };

    detailScreen(id) {
        const { actualSurveys } = this.state;
        for (let poll of actualSurveys) {
            if(poll._id === id) {
                this.setState({
                    detailSurvey: poll
                }, this.toggleDetail);
            };
        }        
    };

    updateDetails = (id, data) => {
        this.props.updateSurvey(id, data).then( () => this.updateSurveys() );
    }

    closeDetails = () => {
        this.toggleDetail();
        this.setState({ 
            detailSurvey: {}
        });
    }

    toggleModal = () => {
        this.setState({
            modalIsActive: !this.state.modalIsActive
        });
    };

    toggleDetail = () => {
        this.setState({
            detail: !this.state.detail
        });
    }

    updateSurveys = () => {
        this.props.fetchAll().then(results => this.setState({actualSurveys: results.surveys}, ( () => {
            if(this.state.detailSurvey._id) {
                this.toggleDetail();
                this.detailScreen(this.state.detailSurvey._id);
            }
        } )));
    };

    optionListManager = (arr) => {
        const cappedArray = arr.map((opt, ind) => <li key={ind}>{opt.x}</li>);
        if (cappedArray.length > 4) {
            cappedArray.splice(3, cappedArray.length - 2, <li key={4}>...</li>);
        }
        return cappedArray;
    };

    render() {
        const { actualSurveys, detail } = this.state;
        const { auth } = this.props;
        const surveyTiles = actualSurveys.map(poll => (
                                <div className="column is-half-tablet is-one-third-desktop" key={poll._id}>
                                    <div onClick={() => this.detailScreen(poll._id)} className="box CST_link-scale" id={poll._id}> 
                                        <div className="title is-5 CST_card-title">
                                            {poll.title}
                                            <div className="CST_title-fading"></div>
                                        </div>
                                        <ul>
                                            {this.optionListManager(poll.surveyOptions)}
                                        </ul>
                                    </div>
                                </div>))
if(detail)return (<div>
                    <SurveyDetails survey={this.state.detailSurvey} 
                                    close={this.closeDetails} 
                                    update={this.updateDetails}
                                    />
                </div>)
else      return (
            <div>
                <div className={`modal ${this.state.modalIsActive? 'is-active': ''}`}>
                    <div className="modal-background"></div>
                    <div className="modal-content">
                        <SurveyForm close={this.toggleModal} submit={this.submitHandler} />
                    </div>
                    <button className="modal-close is-large" onClick={this.toggleModal} aria-label="close"></button>
                </div>
{!!auth.token && <div className="CST_icon-container" onClick={this.toggleModal}>
                    <span className="CST_icon-label">New survey</span>
                    <i className="fas fa-plus"></i>
                </div>}
                <section className="section columns is-multiline" >
                    {surveyTiles}
                </section>
            </div>
        )
    };
};

const mapStateToProps = state => ({
    auth: state.authState,
    cachedSurveys: state.surveysState,
    updateResult: state.surveyUpdateState,
    creationState: state.surveyCreationState,
    delState: state.delState
});

const mapDispatchToProps = dispatch => ({
    fetchAll: () => (
        dispatch(fetchSurveysAction() )
    ),
    createNewSurvey: (data) => (
        dispatch( createSurveyAction(data) )
    ),
    updateSurvey: (id, newData) => (
        dispatch( updateSurveyAction( id, newData) )
    ),
    deleteSurvey: (id) => (
        dispatch( deleteSurveyAction(id) )
    )
})

export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(SurveyGrid);
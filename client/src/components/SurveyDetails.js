import React from 'react';

import Survey from './Survey';

class SurveyDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            survey: {},
            optionToAdd: ''
        }
    }

    componentDidMount() {
        this.setState({
            survey: this.props.survey
        });       
    };

    componentWillUnmount() {
        //console.log(this.state.survey);
    }

 
    vote = (e) => {
        const optionSelected = e.target.closest(".CST_vote-button");
        const x = optionSelected.attributes["data-name"].value;
                
        const newObj = Object.assign({}, this.props.survey, {updateOperation:'Vote', markToVote: x})

        this.props.update(newObj._id, newObj);
    };

    sendTweet = () => {
        const twitText= encodeURIComponent(`${window.location.href} \n Come and join my new survey: #${this.props.survey.title}!`);
     
        window.open('https://twitter.com/intent/tweet?text=' + twitText);
    };

    changeHandler = (e) => {
        this.setState({
            optionToAdd: e.target.value
        });
    };

    addOption = () => {
        const { optionToAdd, survey } = this.state;
        if (optionToAdd !== '') {
        const bodyRequest = {
            markToAdd: [{x:optionToAdd}],
            updateOperation: 'Add'
        };
        this.props.update(survey.title, bodyRequest);
        }
    };

    removeOption = (opt) => {
        const bodyRequest = {
            markToDel: {x:opt},
            updateOperation: 'Del'
        };
        this.props.update(this.state.survey.title, bodyRequest);
    };

    render() {
        let options = "No options available";
        let dataOpt = [];

        if (this.props.survey.surveyOptions) {
        options = this.props.survey.surveyOptions.map( (opt, ind) => {
          dataOpt.push(opt);

            return ( 
            <li className="columns CST_flex-item" key={ind} >
                    <span className="column is-7" >{opt.x}</span>
                    <span className="column is-5 CST_vote-button" data-name={opt.x} data-value={opt.y} onClick={this.vote}>
                        <span className="CST_vote-button-item">vote!</span>
                        <i className="fas fa-thumbs-up"></i>
                    </span>
            </li>
            )
        });
};

return (
    <div className="CST_flex-container">
        <h2 className="title is-2 CST_is-alone">{this.state.survey.title}</h2>
        <div className="columns CST_v-center" >
            <button className="column is-1" onClick={this.props.close}>
                <span className="icon">
                    <i className="fas fa-angle-double-left fa-3x"></i>
                </span>
            </button>
            <div className="column is-6 CST-capped">
                <Survey values={dataOpt}/>
            </div>
            <div className="column is-5 CST_capped">
                <ul className="CST_flex-list">
                    {options}
                    <li className="CST_flex-item columns">
                        <div className="field has-addons">
                            <div className="control">
                                <input className="input CST_expanded" type="text" 
                                        onChange={this.changeHandler} 
                                        value={this.state.optionToAdd} 
                                        placeholder="Add your option!" />
                            </div>
                            <div className="control">
                                <a  className="button is-success" 
                                    onClick={this.addOption}>
                                    Add
                                </a>
                            </div>
                        </div>
                    </li>
                    <li className="column CST_stripe-tweet " onClick={this.sendTweet}>
                        <a>share
                            <span className="icon">
                                <i className="fab fa-twitter"></i>
                            </span> 
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
        )
    };
};

export default SurveyDetails;

/* 
User Story: As an authenticated user, I can keep my polls and come back later to access them.
User Story: As an authenticated user, I can share my polls with my friends.
User Story: As an authenticated user, I can see the aggregate results of my polls.
User Story: As an authenticated user, I can delete polls that I decide I don't want anymore.
User Story: As an authenticated user, I can create a poll with any number of possible items.


User Story: As an unauthenticated or authenticated user, I can see and vote on everyone's polls.
User Story: As an unauthenticated or authenticated user, I can see the results of polls in chart form. (This could be implemented using Chart.js or Google Charts.)
User Story: As an authenticated user, if I don't like the options on a poll, I can create a new option.
*/
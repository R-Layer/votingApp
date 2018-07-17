import React from 'react';

class SurveyForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            optionState: ['']
        }
    }
    
    submitHandler = (e) => { 
        e.preventDefault();
        const body = {
            title: this.state.title,
            surveyOptions: this.state.optionState
        }
        this.props.submit(body);
        this.props.close();
        this.setState({
            title:'',
            optionState:['']
        });
    };

    changeHandler = (e) => {
        let newState = [...this.state.optionState];
        newState[e.target.id] = e.target.value;
        this.setState({
            optionState: newState
        });
    };

    changeHandlerField = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    };

    addOption = () => {
        this.setState({
            optionState: [...this.state.optionState, '']
        });


    }

    render() {
        const { optionState } = this.state;
        let options = optionState.map((opt, ind) => 
            <li key={ind}>
                <input  type="text"
                        className="CST_expanded"
                        autoFocus
                        id={ind} 
                        onChange={this.changeHandler} 
                        value={this.state.optionState[ind]} 
                />
            </li>)
        
        return (
            <section className="box">
                <form onSubmit={this.submitHandler}>
                    <div className="field is-grouped">
                        <label className="label CST_label">Title:</label>
                        <div className="field CST_expanded">
                            <p className="control is-expanded">
                                <input className="CST_expanded" type="text" onChange={this.changeHandlerField} value={this.state.title} name="title"/>
                            </p>
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <label className="label CST_label">Options:</label>
                        <div className="field CST_expanded">
                            <ul>
                                {options}
                            </ul>
                        </div>
                    </div>
                    <button type="button" onClick={this.addOption} className="button is-light" disabled={optionState[optionState.length - 1] === ''}>Add Option</button>
                    <hr />
                    <button type="submit" className={`button CST_expanded is-link is-medium ${this.props.isLoading? 'is-loading':''}`}>
                        <span>Submit</span>
                        <span className="icon is-large is-right">
                            <i className="fas fa-arrow-alt-circle-right"></i>
                        </span>
                    </button>
                </form>
            </section>
        );
    }
};

export default SurveyForm;
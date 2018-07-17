import React from 'react';

import { Redirect } from 'react-router-dom';

class SignupForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state= {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            validationErrors: {},
            serverErrors : {},
            submitted: false
        }
    };

    submitHandler = (e) => {
        e.preventDefault();
        const userData = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            passwordConfirmation: this.state.passwordConfirmation
        };
        this.props.submit(userData);
        this.setState({submitted: true});
     };
    
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        
        if (this.state.validationErrors || this.state.serverErrors) {
            this.setState({validationErrors: {}, serverErrors: {} });
        };
    };

    errorTracker = (arr) => {

        let errs = {};
        for (let err of arr) {
            if (err.message !== null) {
                let targetField = err.message.split(" ")[0].replace(/"/g, "");
                errs[targetField] = err;                        // Refer to only one error each field at time
            };
        };
        
        return errs;
    }

    componentDidUpdate() {
        if (this.state.submitted && this.props.operationState.message) {
            const { err } = this.props.operationState;
            if (err) {
            this.setState({
                 validationErrors: this.errorTracker(err.details)
                })
            };
               
            this.setState({
                serverErrors: this.props.operationState,
                submitted:false
            });
        };
    }

    render() {
        const { username, email, password, passwordConfirmation, validationErrors, serverErrors } = this.state;
        const { operationState } = this.props;
        return (
            operationState.userCreated ? <Redirect to="/login" /> :
            <section className="section">
                <form onSubmit={ this.submitHandler }>
                    <div className="field is-grouped">
                        <label className="label CST_label">Email:</label>
                        <div className="field CST_expanded">
                            <p className="control has-icons-left is-expanded">
                                <input className={`input  ${validationErrors.email ? 'is-danger' : ''}`} type="text" name="email" placeholder="test@test.com" 
                                        value={email} onChange={this.changeHandler}/>
                                <span className="icon is-small is-left">
                                    <i className={"fas fa-envelope"}></i>
                                </span>
                            </p>
                            {validationErrors.email && <p className="help is-danger"> {validationErrors.email.message} </p>}
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <label className="label CST_label">Username (optional):</label>
                        <div className="field CST_expanded">
                            <p className="control has-icons-left is-expanded">
                                <input className={`input  ${validationErrors.username ? 'is-danger' : ''}`} type="text" name="username" placeholder="Rocky Bilbao" 
                                        value={username} onChange={this.changeHandler}/>
                                <span className="icon is-small is-left">
                                    <i className={"fas fa-lock"}></i>
                                </span>
                            </p>
                            {validationErrors.username && <p className="help is-danger"> {validationErrors.username.message} </p>}
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <label className="label CST_label">Password:</label>
                        <div className="field CST_expanded">
                            <p className="control has-icons-left is-expanded">
                                <input className={`input  ${validationErrors.password ? 'is-danger' : ''}`} type="text" name="password" placeholder="p4S5w0rD1$2" 
                                        value={password} onChange={this.changeHandler}/>
                                <span className="icon is-small is-left">
                                    <i className={"fas fa-lock"}></i>
                                </span>
                            </p>
                            {validationErrors.password && <p className="help is-danger"> {validationErrors.password.message} </p>}
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <label className="label CST_label">Confirm password:</label>
                        <div className="field CST_expanded">
                            <p className="control has-icons-left is-expanded">
                                <input className={`input  ${validationErrors.passwordConfirmation ? 'is-danger' : ''}`} type="text" name="passwordConfirmation" placeholder="p4S5w0rD1$2" 
                                        value={passwordConfirmation} onChange={this.changeHandler}/>
                                <span className="icon is-small is-left">
                                    <i className={"fas fa-lock"}></i>
                                </span>
                            </p>
                            {validationErrors.passwordConfirmation && <p className="help is-danger"> Passwords must match </p>}
                        </div>
                    </div>
                    <hr />
                    <button type="submit" className={`button CST_expanded is-link is-medium`}>
                        <span>Submit</span>
                        <span className="icon is-large is-right">
                            <i className="fas fa-arrow-alt-circle-right"></i>
                        </span>
                    </button>
                    {serverErrors.err  && <div className="notification is-danger CST_isolated">
                 <p>{serverErrors.message}</p>
                </div>}
                </form>
            </section>

        );
    };
};

export default SignupForm;

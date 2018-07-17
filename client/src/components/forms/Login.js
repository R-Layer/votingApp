import React from 'react';

import { Redirect } from 'react-router-dom';

class LoginForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state= {
            email: '',
            password: '',
            validationErrors: {},
            serverErrors : {},
            submitted: false
        }
    };

    submitHandler = (e) => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.submit(userData);
        this.setState({submitted: true} );
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

    componentDidMount() {
        this.props.logout();
    }

    componentDidUpdate() {
        if (this.state.submitted && this.props.userAuth.message) {
            const { err } = this.props.userAuth;
            if (err) {
            this.setState({
                 validationErrors: this.errorTracker(err.details)
                })
            };
               
            this.setState({
                serverErrors: this.props.userAuth,
                submitted:false
            });
        };
    }

    render() {
        const { email, password, validationErrors, serverErrors } = this.state;
        const { userAuth } = this.props;
        return ( 
            userAuth.token ? <Redirect to="/" /> :
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
                    <hr />
                     <button type="submit" className={`button CST_expanded is-link is-medium` }> 
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

export default LoginForm;
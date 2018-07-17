import React from 'react';

import { loginAction, logoutAction, registerAction, 
        deleteAction, updateAction, getAllAction,
        getAction } from '../redux/actions/userActions';

import { connect } from 'react-redux';

class Homepage extends React.Component {

    componentWillUnmount(){
        localStorage.removeItem('userAuth');
    };

    handleFirstLogin = () => {        
       const requestBody = {
           email: this.firstEmail.value,
           password: this.firstPassword.value
       };
       this.props.login(requestBody);
    };

    handleSecondSignup = () => {
        const requestBody = {
            username: this.secondUsername.value,
            email: this.secondEmail.value,
            password: this.secondPassword.value,
            passwordConfirmation: this.secondConfirmationPassword.value
        };
        this.props.registerUser(requestBody);
    };

    handleThirdDelete = () => {
        this.props.deleteUser(this.thirdDelID.value);
    };

    handleFourthUpdate = () => {
        const requestBody = {
            username: this.fourthUsername.value,
            email: this.fourthEmail.value,
            password: this.fourthPassword.value,
            passwordConfirmation: this.fourthConfirmPassword.value
        };
        this.props.updateUser(this.fourthUserToUpdate.value, requestBody)
    };

    handleFifthFetch = () => {
        this.props.fetchUsers();
    }

    handleSixthFetch = () => {
        this.props.fetchUser(this.sixthUserToFetch.value);
    }

    render() {

        return(
            <div className="home-container">
                <h1 className="home-title">Home Page</h1>
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
                    <h3 className="form-title">Signup form</h3>
                    <label>Username</label>
                    <input className="form-field" name="username" ref={(c) => this.secondUsername = c}/>
                    <br/>
                    <label>Email</label>
                    <input className="form-field" name="email" ref={(c) => this.secondEmail = c}/>
                    <br/>
                    <label>Password</label>
                    <input className="form-field" name="password" ref={(c) => this.secondPassword = c} />
                    <br/>
                    <label>Confirm password</label>
                    <input className="form-field" name="passwordConfirmation" ref={(c) => this.secondConfirmationPassword = c}/>
                    <br/>
                    <button onClick={this.handleSecondSignup}>Signup</button>
                    <label className="form-field">
                        {this.props.registerState.message}
                    </label>
                </div>
                <div className="form-container">
                    <h3 className="form-title">Delete form</h3>
                    <label>User ID</label>
                    <input className="form-field" name="username" ref={(c) => this.thirdDelID = c}/>
                    <br/>
                    <button onClick={this.handleThirdDelete}>Delete user</button>
                    <label className="form-field">
                        {this.props.delState.message}
                    </label>
                </div>
                <div className="form-container">
                    <h3 className="form-title">Update form</h3>
                    <label>User To Update</label>
                    <input className="form-field" name="userToUpdate" ref={(c) => this.fourthUserToUpdate = c}/>
                    <br/>
                    <br/>
                    <label>Username</label>
                    <input className="form-field" name="username" ref={(c) => this.fourthUsername = c}/>
                    <br/>
                    <label>Email</label>
                    <input className="form-field" name="email" ref={(c) => this.fourthEmail = c}/>
                    <br/>
                    <label>Password</label>
                    <input className="form-field" name="password" ref={(c) => this.fourthPassword = c} />
                    <br/>
                    <label>Confirm password</label>
                    <input className="form-field" name="passwordConfirmation" ref={(c) => this.fourthConfirmPassword = c}/>
                    <br/>
                    <button onClick={this.handleFourthUpdate}>Update</button>
                    <label className="form-field">
                        {this.props.updState.message}
                        {JSON.stringify(this.props.updState.err)}
                    </label>
                </div>
                <div className="form-container">
                    <h3 className="form-title">Get Users form</h3>
                    <button onClick={this.handleFifthFetch}>Fetch</button>
                    <ul>
                        {this.props.usrsState.users && this.props.usrsState.users.map(usr => <li key={usr._id}>{usr.email}</li>)}
                    </ul>
                    <label className="form-field">
                        {this.props.usrsState.message}
                        {JSON.stringify(this.props.usrsState.err)}
                    </label>
                </div>
                <div className="form-container">
                    <h3 className="form-title">Get User form</h3>
                    <label>User To Fetch</label>
                    <input className="form-field" name="userToFetch" ref={(c) => this.sixthUserToFetch = c}/>
                    <br/>
                    <button onClick={this.handleSixthFetch}>Fetch</button>
                    <label>{this.props.usrState.user && this.props.usrState.user.email}</label>
                    <label className="form-field">
                        {this.props.usrState.message}
                        {JSON.stringify(this.props.usrState.err)}
                    </label>
                </div>
            </div>
        );
    };
};

const mapStateToProps = state => ({
   auth: state.authState,
   registerState: state.signupState,
   delState: state.delState,
   updState: state.updateState,
   usrsState: state.usersState,
   usrState: state.userState
});

 const mapDispatchToProps = dispatch => ({
    login: data => {
        dispatch( loginAction(data));
    },
    logout: () => {
        dispatch( logoutAction());
    },
    registerUser: newData => {
        dispatch( registerAction( newData));
    },
    deleteUser: userToRemove => {
        dispatch( deleteAction(userToRemove));
    },
    updateUser: (id, newData) => {
        dispatch( updateAction(id, newData));
    },
    fetchUsers: () => {
        dispatch( getAllAction() );
    },
    fetchUser: id => {
        dispatch( getAction(id) );
    }
});

export default connect( mapStateToProps, mapDispatchToProps )(Homepage);
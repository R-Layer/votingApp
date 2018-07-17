export const loginProcess = {
    REQUEST:"LOGIN_REQUEST",
    SUCCESS:"LOGIN_SUCCESS",
    FAILURE:"LOGIN_FAILED",
    LOGOUT:"LOGOUT"
};

export const registerProcess = {
    REQUEST:"REGISTER_REQUEST",
    SUCCESS:"REGISTER_SUCCESS",
    FAILURE:"REGISTER_FAILED"
};

export const deleteProcess = {
    REQUEST: "DELETE_REQUEST",
    SUCCESS: "DELETE_SUCCESS",
    FAILURE: "DELETE_FAILURE"
};

export const updateProcess = {
    REQUEST: "UPDATE_REQUEST",
    SUCCESS: "UPDATE_SUCCESS",
    FAILURE: "UPDATE_FAILURE"
};

export const readProcess = {
    REQUEST: "READ_REQUEST",
    SUCCESS: "READ_SUCCESS",
    FAILURE: "READ_FAILURE"
};

export const loginAction = (userData) => {
  return dispatch => {
       dispatch({type:loginProcess.REQUEST});

       // Fetch request
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(userData)
            };
        
            fetch('/users/login', requestOptions)
                .then(res =>  res.json())
          // end fetch
                .then(logResponse => {
                    if(logResponse.token) {
                        localStorage.setItem('userAuth', JSON.stringify({token: logResponse.token}));
                        return dispatch({type:loginProcess.SUCCESS, logResponse});
                    } else {
                        return dispatch({type:loginProcess.FAILURE, err:logResponse});
                    }                    
                })
                .catch(err => {
                    return dispatch({type:loginProcess.FAILURE, err});
                });
    };
};

export const logoutAction = () => {
  return dispatch => {
        localStorage.removeItem('userAuth');
        return dispatch({type: loginProcess.LOGOUT})};
};

export const registerAction = (newUserData) => {
    return dispatch => {
        dispatch({type: registerProcess.REQUEST});

        // Request to the server
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(newUserData)
        };

        fetch('/users/signup', requestOptions)
            .then(res => res.json() )
        // End request
            .then(newUser => {
                if(newUser.email) {
                    return dispatch({type:registerProcess.SUCCESS, newUser});
                } else {
                    return dispatch({type:registerProcess.FAILURE, err:newUser});
                }
            })
            .catch(err => {
                return dispatch({type: registerProcess.FAILURE, err});
            });
    };
};

export const deleteAction = userToRemove => {
    return dispatch => {
        dispatch({type: deleteProcess.REQUEST});

        // Request to the server
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type':'application/json'},
        };

        fetch(`/users/delete/${userToRemove}`, requestOptions)
            .then(res => res.json())
            .then(delResponse => {
                return dispatch({type: deleteProcess.SUCCESS, delResponse});
            })
            .catch( err => {
                return dispatch({type: deleteProcess.FAILURE, err})
            });
    };
};

export const updateAction = (id, newData) => {
    return dispatch => {
        dispatch({type: updateProcess.REQUEST});

        // Start fetch
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(newData)
        };

        fetch(`/users/update/${id}`, requestOptions)
            .then(res => res.json())
            .then(updateResponse => {
                if(updateResponse) {
                    return dispatch({type:updateProcess.SUCCESS, updateResponse});
                } else {
                    return dispatch({type: updateProcess.FAILURE, err: updateResponse});
                }
            })
            .catch(err => {
                return dispatch({type: updateProcess.FAILURE, err});
            });
    };
};

export const getAllAction = () => {
    return dispatch => {
        dispatch({type: readProcess.REQUEST});

        // Starting fetch
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type':'application/json'},
        };

        fetch('/users', requestOptions)
            .then(res => res.json())
            .then(users => {
                if(users) {
                    return dispatch({type: readProcess.SUCCESS, users});
                } else {
                    return dispatch({type: readProcess.FAILURE, err: users});
                }
            })
            .catch(err => {
                return dispatch({type: readProcess.FAILURE, err});
            });
    };
};

export const getAction = (id) => {
    return dispatch => {
        dispatch({type:readProcess.REQUEST});
        
        //Fetch starts
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type':'application/json',
                      'authorization':localStorage.getItem('userAuth')},
        };

        fetch(`/users/${id}`, requestOptions)
            .then(res => res.json() )
            .then(user => {
                if(user) {
                    return dispatch({type: readProcess.SUCCESS, user});
                } else {
                    return dispatch({type: readProcess.FAILURE, err: user});
                }
            })
            .catch(err => {
                return dispatch({type: readProcess.FAILURE, err});
            });
    };
};
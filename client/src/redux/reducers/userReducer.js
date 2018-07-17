import {  loginProcess, registerProcess,
          deleteProcess, updateProcess,
          readProcess } from '../actions/userActions';

const wasAuth = localStorage.getItem('userAuth')
const initState = wasAuth ? JSON.parse(wasAuth) : {};

export const authState = (state = initState, action) => {
    switch(action.type) {
        case loginProcess.REQUEST:
            return {};
        case loginProcess.SUCCESS:
            return action.logResponse;
        case loginProcess.FAILURE:
            return action.err;
        case loginProcess.LOGOUT:
            return {};
        default: 
            return state;
    }
};

export const signupState = (state = {}, action) => {
    switch(action.type) {
        case registerProcess.REQUEST:
            return {};
        case registerProcess.SUCCESS:
            return action.newUser;
        case registerProcess.FAILURE:
            return action.err;
        default: 
            return state;
    }
};

export const delState = (state = {}, action) => {
    switch(action.type) {
        case deleteProcess.REQUEST:
            return {};
        case deleteProcess.SUCCESS:
            return action.delResponse;
        case deleteProcess.FAILURE:
            return action.err;
        default:
            return state;
    }
};

export const updateState = (state={}, action) => {
    switch(action.type) {
        case updateProcess.REQUEST:
            return {};
        case updateProcess.SUCCESS:
            return action.updateResponse;
        case updateProcess.FAILURE:
            return action.err;
        default:
            return state;
    }
};

export const usersState = (state = {}, action) => {
    switch(action.type) {
        case readProcess.REQUEST:
            return {};
        case readProcess.SUCCESS:
            return action.users || state;
        case readProcess.FAILURE:
            return action.err;
        default:
            return state;
    }
};

export const userState = (state = {}, action) => {
    switch(action.type) {
        case readProcess.REQUEST:
            return {};
        case readProcess.SUCCESS:
            return action.user || state;
        case readProcess.FAILURE:
            return action.err;
        default:
            return state;
    }
}
import { authState, signupState, delState, 
        updateState, usersState,userState } from './userReducer';

import {surveysState, surveyCreationState,
        surveyUpdateState, surveyDeleteState } from '../reducers/surveyReducer';

import { combineReducers } from 'redux';

export const rootReducer = combineReducers({    
    signupState,
    updateState,
    usersState,
    userState,
    authState,
    delState,
    surveysState,
    surveyCreationState,
    surveyUpdateState,
    surveyDeleteState
});
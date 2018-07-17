import {fetchSurveys, creationSurvey, 
        updateSurvey, deleteSurvey } from '../actions/surveyActions';

export const surveysState = (state = {}, action) => {
    switch(action.type) {
        case fetchSurveys.REQUEST:
            return {};
        case fetchSurveys.SUCCESS:
            return action.surveys;
        case fetchSurveys.FAILURE:
            return action.err;
        default:
            return state;
    }
};

export const surveyCreationState = (state = {}, action) => {
    switch(action.type) {
        case creationSurvey.REQUEST:
            return {isFetching: true};
        case creationSurvey.SUCCESS:
            return action.newSurvey;
        case creationSurvey.FAILURE:
            return action.err;
        default:
            return state;
    }
};

export const surveyDeleteState = (state = {}, action) => {
    switch(action.type) {
        case deleteSurvey.REQUEST:
            return {isFetching: true};
        case deleteSurvey.SUCCESS:
            return action.removedSurvey;
        case deleteSurvey.FAILURE:
            return action.err;
        default:
            return state;
    }
};

export const surveyUpdateState = (state = {}, action) => {
    switch(action.type) {
        case updateSurvey.REQUEST:
            return {};
        case updateSurvey.SUCCESS:
            return action.updatedSurvey;
        case updateSurvey.FAILURE:
            return action.err;
        default:
            return state;
    }
};
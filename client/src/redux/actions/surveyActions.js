
export const fetchSurveys = {
    REQUEST:"FETCH_SURVEYS_REQUEST",
    SUCCESS:"FETCH_SURVEYS_SUCCESS",
    FAILURE:"FETCH_SURVEYS_FAILURE"
};

export const creationSurvey = {
    REQUEST:"CREATE_SURVEY_REQUEST",
    SUCCESS:"CREATE_SURVEY_SUCCESS",
    FAILURE:"CREATE_SURVEY_FAILURE"
};

export const updateSurvey = {
    REQUEST:"UPDATE_SURVEY_REQUEST",
    SUCCESS:"UPDATE_SURVEY_SUCCESS",
    FAILURE:"UPDATE_SURVEY_FAILURE"
};

export const deleteSurvey = {
    REQUEST:"DELETE_SURVEY_REQUEST",
    SUCCESS:"DELETE_SURVEY_SUCCESS",
    FAILURE:"DELETE_SURVEY_FAILURE"
};

export const fetchSurveysAction = () => {
    return dispatch => {
        dispatch({type: fetchSurveys.REQUEST});

        const requestOptions = {
            method:'GET',
            headers: {'content-type':'application/json'},
        }

        return fetch('/surveys', requestOptions)
            .then(res => res.json() )
            .then(surveys =>  {
                dispatch({type: fetchSurveys.SUCCESS, surveys});
                return surveys;
            })
            .catch(err => dispatch({type: fetchSurveys.FAILURE, err}));
    };
};

export const fetchOwnSurveysAction = (owner) => {
    return dispatch => {
        dispatch({type: fetchSurveys.REQUEST});

        const requestOptions = {
            method: 'GET',
            headers: {'content-type':'application/json'},
        };

        return fetch(`/surveys/personal/${owner}`, requestOptions)
            .then(res => res.json() )
            .then(ownSurveys => {
                dispatch({type: fetchSurveys.SUCCESS, surveys:ownSurveys});
                return ownSurveys;
            })
            .catch(err => dispatch({type: fetchSurveys.FAILURE, err}));
    };
};

export const createSurveyAction = (newSurveyData) => {
    return dispatch => {
        dispatch({type: creationSurvey.REQUEST});

        const requestOptions = {
            method:'POST',
            headers: {'content-type':'application/json',
                      'authorization': localStorage.userAuth},
            body: JSON.stringify(newSurveyData)
        };

     return fetch('/surveys/create', requestOptions)
            .then(res => res.json() )
            .then(newSurvey => {
                if(newSurvey) {
                    dispatch({type:creationSurvey.SUCCESS, newSurvey});
                    return newSurvey;
                } else {
                    dispatch({type:creationSurvey.FAILURE, err: newSurvey});
                    return newSurvey;
                }
            })
            .catch(err => dispatch({type: creationSurvey.FAILURE, err}));
    };
};

export const deleteSurveyAction = (id) => {
    return dispatch => {
        dispatch({type:deleteSurvey.REQUEST});

        const requestOptions = {
            method:'DELETE',
            headers: {'content-type':'application/json'},
        };

       return fetch(`/surveys/delete/${id}`, requestOptions)
            .then( res => res.json() )
            .then(removedSurvey => {
                if(removedSurvey) {
                    dispatch({type: deleteSurvey.SUCCESS, removedSurvey});
                    return removedSurvey;
                } else {
                    dispatch({type: deleteSurvey.FAILURE, err: removedSurvey});
                    return removedSurvey;
                }
            })
            .catch(err => dispatch({type: deleteSurvey.FAILURE, err}));
    };
};

export const updateSurveyAction = (id, updateData) => {
    return dispatch => {
        dispatch({type: updateSurvey.REQUEST});

        const requestOptions = {
            method: 'PUT',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(updateData)
        };

     return fetch(`/surveys/update/${id}`, requestOptions)
            .then(res => res.json() )
            .then(updatedSurvey => {
                if(updatedSurvey) {
                    dispatch({type:updateSurvey.SUCCESS, updatedSurvey});
                    return updatedSurvey;
                } else {
                    dispatch({type: updateSurvey.FAILURE, err: updatedSurvey});
                    return updatedSurvey;
                }
            })
            .catch(err => dispatch({type:updateSurvey.FAILURE, err}));
    };
};
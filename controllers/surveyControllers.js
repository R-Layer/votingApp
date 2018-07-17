const Survey = require('../models/surveyModel');
const ObjectID = require('mongoose').Types.ObjectId;

exports.surveys_get_all = (req, res) => {
    Survey.find({}).exec()
        .then(surveys =>{ 
            if(surveys) {
                res.status(200).json({
                    message: "Surveys successfully fetched",
                    surveys
                });
            } else {
                res.status(200).json({
                    message: "No survey found",
                    surveys
                });
            };
        })
        .catch(err => {
            res.status(500).json({
                message: "Error: survey fetch failed"
            });
        });
};

exports.surveys_get_by_owner = (req, res) => {
    Survey.find({owner: req.params.owner}).exec()
            .then(personalSurveys => {
                if(personalSurveys.length === 0) {
                    res.status(200).json({
                        message: "No survey found",
                        personalSurveys
                    });
                } else {
                    res.status(200).json({
                        message: "Surveys successfully fetched",
                        personalSurveys
                    });
                }
            })
            .catch(err => res.status(500).json({
                message: "Error: personal surveys fetch error",
                err
                })
            );
};

exports.surveys_get_one = (req, res) => {
    let testID='';
    try {
        testID = new ObjectID(req.params.id);
    } catch (err) {
        testID = 'failed'
    };
    let surParam= testID.toString() === req.params.id ? {_id: testID} : {title: req.params.id}

    Survey.findOne(surParam).exec()
        .then(survey => {
            if(survey) {
                res.status(200).json({
                    message:"Survey successfully fetched",
                    survey
                });
            } else {
                res.status(404).json({
                    message:"Survey not found"
                });
            }
        })
        .catch(err => res.status(500).json({
            message:"Error: survey fetch failed",
            err
            })
        );
};

exports.surveys_create_one = (req, res) => {
    Survey.findOne({title: req.body.title}).exec()
        .then(newSurvey => {
            if(newSurvey) {
                res.status(409).json({
                    message:"Survey already exists!",
                    newSurvey
                });
            } else {
                const newSur = new Survey ({
                    title: req.body.title,
                    owner: req.app.locals.userAuth.id,
                    surveyOptions: req.body.surveyOptions.map( opt => ({x: opt}))
                });
                newSur.save()
                    .then(neoSurvey => res.status(201).json({
                        message: "Survey creation successful",
                        neoSurvey
                    }))
                    .catch(err => res.status(500).json({
                        message:"Error: survey creation failed",
                        err
                    }));
            };
        })
        .catch(err => {
            console.log('err',err);
            res.status(500).json({
                message: "Error: survey detection failed",
                err
            });
        });
};

exports.surveys_delete_one = (req, res) => {
    
    let idTest='';
    try { 
        idTest = new ObjectID(req.params.id)
    } catch (err) {
        idTest = 'failed'
    }
    // Credits to andyMacleod [STACK OVERFLOW]
    let delParam = idTest.toString() === req.params.id ? {_id: idTest} : {title: req.params.id}
    
    Survey.findOneAndRemove(delParam).exec()
            .then(removedSurvey => {
                if(removedSurvey) {
                    res.status(200).json({
                        message:"Survey successfully removed",
                        removedSurvey
                    });
                } else {
                    res.status(404).json({
                        message: "Survey not found",
                        removedSurvey
                    });
                }
            })
            .catch(err => res.status(500).json({
                message: "Error: survey removal failed",
                err
                })
            );
};

exports.surveys_update_one = (req, res) => {
    let testID = '';
    try {
        testID = ObjectID(req.params.id);
    } catch (err) {
        testID = 'failed';
    };
    let updParam = testID.toString() === req.params.id ? {_id: testID} : {title: req.params.id}

    let query = '';
    switch(req.body.updateOperation) {
        case 'Add':
            query = Survey.update(updParam, {$addToSet: {surveyOptions: {$each: req.body.markToAdd}}});
            break;
        case 'Del':
            query = Survey.update(updParam, {$pull: {surveyOptions: req.body.markToDel}});
            break;
        case 'Vote':
            // Credits to user8827176 [STACK OVERFLOW]
            Object.assign(updParam, {"surveyOptions.x": req.body.markToVote});
            query  = Survey.update(updParam, {$inc: {"surveyOptions.$.y": 1}} );
            break;
        default:
            query = Survey.update(updParam, { $set: req.body});
            break;
    }

    query.then(updatedSurvey => {
        if(updatedSurvey) {
            res.status(200).json({
                message:"Survey updated successfully",
                updatedSurvey
            });
        } else {
            res.status(404).json({
                message: "Survey not found",
                updatedSurvey
            });
        }
    })
    .catch(err => res.status(500).json({
        message: "Error: Survey update failed",
        err
        })
    );
};
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const optSchema = new Schema({
    x: {
        type: String,
        required: true
    },
    y: {
        type: Number,
        default:0
    },
    _id: false
});

const surveySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    owner:{
        type: Schema.Types.ObjectId, 
        ref:'User'
    },
    surveyOptions:[optSchema]
});

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;
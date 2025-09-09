const mongoose = require('mongoose');

const Schema = mongoose.Schema

const attentenceSchema = new Schema({
    nameOfStd: {
        type: String,
        required: true
    },
    ad: {
        type: Number,
        required: true
    },
    class: {
        type: Number,
        required: true
    },
    status:{
        type:String,
        required:true,

    },
    SL:{
        type:Number,
        required:true
    },
    attentenceTime: {
        type: String,
        required: true
    },
    attentenceDate: {
        type: String,
        required: true
    }
},{timestamps:true})

module.exports = mongoose.model('Attentence',attentenceSchema);
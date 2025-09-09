const mongoose = require('mongoose')

const Schema = mongoose.Schema

const studentsSchema =new Schema ({
    ["FULL NAME"]: {
        type: String,
        required: true
    },
    ["SHORT NAME"]: {
        type: String,
        required: true
    },
    SL:{
        type:Number,
        required:true
    },
    ADNO: {
        type: Number,
        required: true
    },
    CLASS: {
        type: Number,
        required: true
    },
    Status:{
        type: String,
        required: true
    },
    Time:{
        type: String,
        required: true
    },
    Date:{
        type: String,
        required: true
    }

},{timestamps:true})

module.exports = mongoose.model('Student',studentsSchema);
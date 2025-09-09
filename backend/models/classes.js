const mongoose = require('mongoose');

const Schema = mongoose.Schema

const classSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    class: {
        type: Number,
        required: true
    },
    totalstudents: {
        type: Number,
        required: true
    },
    presentstudents: {
        type: Number,
        required: true
    },
    absentstudents: {
        type: Number,
        required: true
    },
    percentage: {
        type: String,
        required: true
    }
},{timestamps:true})

module.exports = mongoose.model('Class',classSchema);
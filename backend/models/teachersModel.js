const mongoose = require('mongoose');

const Schema = mongoose.Schema

const teacherSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    totalAttTaken: {
        type: Number,
        required: false,
        default:0
    },
    mobile: {
        type: Number,
        required: false
    }

},{timestamps:true})

module.exports = mongoose.model('Teacher',teacherSchema);
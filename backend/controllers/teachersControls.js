const Teacher = require('../models/teachersModel')
const mongoose = require('mongoose')

//get all teachers
const getAllTeacher=async(req,res)=>{
    const teachers= await Teacher.find({}).sort({createdAt:-1})

    res.status(200).json(teachers)
}

//get a single teacher
const getSingleTeacher=async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'such document not fount'})
    }
    const teachers= await Teacher.findById(id)
    if(!teachers){
        return res.status(404).json({error:'such document not fount'})
    }
    res.status(200).json(teachers)
}


//create a teacher db
const createTeacher=async(req,res)=>{
    try{
        const teacher = await Teacher.create(req.body);
        res.status(200).json(teacher);
        console.log(teacher);
    }catch(err){
        res.status(400).json({error:err.message});
    }
}

//delete a teachers
const deleteTeacher =async(req,res)=>{
    const {id}= req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'such document not fount'})
    }
    const teacher=await Teacher.findByIdAndDelete(id)

    if(!teacher){
        return res.status(404).json({error:'such document not fount'})
    }
    res.status(200).json(teacher)


}

//update
const updateTeacher = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'such document not fount'})
    }

    const teacher=await Teacher.findByIdAndUpdate({_id:id},{
        ...req.body
    })

    if(!teacher){
        return res.status(404).json({error:'such document not fount'})
    }
    res.status(200).json(teacher)
}

module.exports = {
    createTeacher,
    getAllTeacher,
    getSingleTeacher,
    deleteTeacher,
    updateTeacher
}
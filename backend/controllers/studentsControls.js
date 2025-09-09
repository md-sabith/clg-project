const Student = require('../models/studentsModel')
const mongoose = require('mongoose')

//get all students
const getAllStudents=async(req,res)=>{
    const students= await Student.find({}).sort({createdAt:-1})

    res.status(200).json(students)
}

//filter by class
const filterByClass= async(req,res)=>{
    const {classId} = req.params
     
    const students = await Student.find({CLASS:classId})

    if(!students){
        return res.status(404).json({error:'such document not fount'})
    }
    res.status(200).json(students)
}


//get a single students
const getSingleStudents=async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'such document not fount'})
    }
    const students= await Student.findById(id)
    if(!students){
        return res.status(404).json({error:'such document not fount'})
    }
    res.status(200).json(students)
}


//create a students db
const createStudents=async(req,res)=>{
    try{
        const students = await Student.create(req.body);
        res.status(200).json(students);
        console.log(students);
    }catch(err){
        res.status(400).json({error:err.message});
    }
}

//delete a students
const deleteStudents =async(req,res)=>{
    const {id}= req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'such document not fount'})
    }
    const students=await Student.findByIdAndDelete(id)

    if(!students){
        return res.status(404).json({error:'such document not fount'})
    }
    res.status(200).json(students)


}

//update
const updateStudents = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'such document not fount'})
    }

    const students=await Student.findByIdAndUpdate({_id:id},{
        ...req.body
    })

    if(!students){
        return res.status(404).json({error:'such document not fount'})
    }
    res.status(200).json(students)
}

// update many students attendance
const updateManyStudents = async (req, res) => {
    try {
      const { updates } = req.body; 
      // updates should be an array of { ADNO, Status, Date, Time }
  
      const bulkOps = updates.map((u) => ({
        updateOne: {
          filter: { ADNO: u.ADNO },
          update: {
            $set: {
              Status: u.Status,
              Time: u.Time,
              Date:u.Date
              
            }
          }
        }
      }));
  
      await Student.bulkWrite(bulkOps);
  
      res.status(200).json({ message: "Students updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  };
  

module.exports = {
    createStudents,
    getAllStudents,
    getSingleStudents,
    deleteStudents,
    updateStudents,
    filterByClass,
    updateManyStudents
}
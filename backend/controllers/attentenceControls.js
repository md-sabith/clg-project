const Attentence = require('../models/attentenceModel');
const mongoose = require('mongoose')

//get all attentence
const getAllAttentence=async(req,res)=>{
    const attentence= await Attentence.find({}).sort({createdAt:-1})

    res.status(200).json(attentence)
}

//get a single attentence
const getSingleAttentence=async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'such document not fount'})
    }
    const attentence= await Attentence.findById(id)
    if(!attentence){
        return res.status(404).json({error:'such document not fount'})
    }
    res.status(200).json(attentence)
}


//create a attentence db
const createAttentence=async(req,res)=>{
    
    try{
        const attentence = await Attentence.create(req.body);
        res.status(200).json(attentence);
        console.log(attentence);
    }catch(err){
        res.status(400).json({error:err.message});
    }
}

//delete a attentence
const deleteAttentence =async(req,res)=>{
    const {id}= req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'such document not fount'})
    }
    const attentence=await Attentence.findByIdAndDelete(id)

    if(!attentence){
        return res.status(404).json({error:'such document not fount'})
    }
    res.status(200).json(attentence)


}

//update attentence
const updateAttentence = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'such document not fount'})
    }

    const attentence=await Attentence.findByIdAndUpdate({_id:id},{
        ...req.body
    })

    if(!attentence){
        return res.status(404).json({error:'such document not fount'})
    }
    res.status(200).json(attentence)
}

const updateManyDocs=async(req,res)=>{
    try {
        const updates = req.body.updates; // array of students
    
        if (!Array.isArray(updates)) {
          return res.status(400).json({ error: "Updates should be an array" });
        }
    
        const bulkOps = updates.map((student) => ({
          updateOne: {
            filter: { _id: student._id },
            update: { $set: { status: student.status } },
          },
        }));
    
        await Attentence.bulkWrite(bulkOps);
    
        res.status(200).json({ message: "Attendance updated successfully" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update attendance" });
      }
}

module.exports = {
    createAttentence,
    getAllAttentence,
    getSingleAttentence,
    deleteAttentence,
    updateAttentence,
    updateManyDocs
}
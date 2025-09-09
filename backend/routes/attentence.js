const express = require('express');
const router = express.Router();
const {createAttentence,deleteAttentence,getAllAttentence,getSingleAttentence,updateAttentence, updateManyDocs} = require('../controllers/attentenceControls')



//get all attentence
router.get('/',getAllAttentence)

//get a single attentence
router.get('/:id',getSingleAttentence)

//add a attentence
router.post('/',createAttentence)

//delete attentence
router.delete('/:id',deleteAttentence)

//update attentence
router.patch('/:id',updateAttentence)

//update many docs
router.patch('/',updateManyDocs)
module.exports = router;
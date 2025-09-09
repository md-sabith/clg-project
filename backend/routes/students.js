const express = require('express');
const router = express.Router();
const {createStudents,
    getAllStudents,
    getSingleStudents,
    deleteStudents,
    updateStudents,
    filterByClass,
    updateManyStudents} = require('../controllers/studentsControls')


//get all Students
router.get('/',getAllStudents)

//filter by class
router.get('/:classId',filterByClass)

//get a single Student
router.get('/:id',getSingleStudents)

//add a Students
router.post('/',createStudents)

//delete Students
router.delete('/:id',deleteStudents)

//update Students
router.patch('/:id',updateStudents)

router.patch('/bulk-update/students',updateManyStudents)

module.exports = router;
//voy a tener una url para agregar un alumno, otra para eliminarlo, etc.

const express = require('express')
const router = express.Router()

const Student = require('../models/student')

router.get('/', async (req,res)=>{
    
    try{
        const students = await Student.find()
        console.log(students)
        
        res.json(students)

    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: 'An error occurred on the server'
        })
    }   
})

router.get('/:id', async(req,res)=>{
    const student = await Student.findById(req.params.id)
    res.json(student)
})

router.post('/', async(req,res)=>{
    
    const {name, last_name, DNI_student, file_number, phone_number, address, ID_related} = req.body
    const {street, number, zip_code} = address
    const student = new Student({
        name, 
        last_name, 
        DNI_student, 
        file_number, 
        phone_number, 
        address:{
            street,
            number,
            zip_code
        },
        ID_related})
    await student.save()
    res.json({status: 'The student was saved successfully'})
})

router.put('/:id', async(req, res)=>{
    const {name, last_name, DNI_student, file_number, phone_number, address, ID_related} = req.body
    const newStudent = {name, last_name, DNI_student, file_number, phone_number, address, ID_related}
    await Student.findByIdAndUpdate(req.params.id, newStudent)
    res.json({status:'The student was updated successfully'})
})

router.delete('/:id', async(req,res)=>{
    await Student.findByIdAndRemove(req.params.id)
    res.json({status:'The student was removed successfully'})
})

module.exports = router
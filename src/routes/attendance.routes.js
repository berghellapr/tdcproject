//una ruta para apuntar una inasistencia, para subir doc, etc.

const express = require('express')
const router = express.Router()

const Attendance = require('../models/attendance')

router.get('/', async (req,res)=>{
    
    try{
        const attendances = await Attendance.find()
        console.log(attendances)
        
        res.json(attendances)

    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: 'An error occurred on the server'
        })
    }   
})

router.get('/:id', async(req,res)=>{
    const attendance = await Attendance.findById(req.params.id)
   
    res.json(attendance)
})

router.post('/', async(req,res)=>{
    
    const {ID_attendance, file_number, date, state} = req.body
    const attendance = new Attendance({ID_attendance, file_number, date, state})
        
    await attendance.save()
    res.json({status: 'The attendance was saved successfully'})
})

router.put('/:id', async(req, res)=>{
    const {ID_attendance, file_number, date, state} = req.body
    const newAttendance = {ID_attendance, file_number, date, state}
    await Attendance.findByIdAndUpdate(req.params.id, newAttendance)
    res.json({status:'The attendance was updated successfully'})
})

router.delete('/:id', async(req,res)=>{
    await Attendance.findByIdAndRemove(req.params.id)
    res.json({status:'The attendance was removed successfully'})
})

module.exports = router
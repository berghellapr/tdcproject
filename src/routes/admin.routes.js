//

const express = require('express')
const router = express.Router()

const Admin = require('../models/admin')

router.get('/', async (req,res)=>{
    
    try{
        const admins = await Admin.find()
        console.log(admins)
        
        res.json(admins)

    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: 'An error occurred on the server'
        })
    }   
})

router.get('/:id', async(req,res)=>{
    const admin = await Admin.findById(req.params.id)
   
    res.json(admin)
})

router.post('/', async(req,res)=>{
    
    const {name, last_name, DNI, mail, password, phone_number, address} = req.body
    const admin = new Admin({name, last_name, DNI, mail, password, phone_number, address})
        
    await admin.save()
    res.json({status: 'The admin was saved successfully'})
})

router.put('/:id', async(req, res)=>{
    const {name, last_name, DNI, mail, password, phone_number, address} = req.body
    const newAdmin = {name, last_name, DNI, mail, password, phone_number, address}
    await Admin.findByIdAndUpdate(req.params.id, newAdmin)
    res.json({status:'The admin was updated successfully'})
})

router.delete('/:id', async(req,res)=>{
    await Admin.findByIdAndRemove(req.params.id)
    res.json({status:'The admin was removed successfully'})
})

module.exports = router
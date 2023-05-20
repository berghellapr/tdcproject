//voy a tener una url para agregar un padre, otra para eliminarlo, etc.

const express = require('express')
const router = express.Router()

const Parent = require('../models/parent')

router.get('/', async (req,res)=>{
    
    try{
        const parents = await Parent.find()
        console.log(parents)
        
        res.json(parents)

    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: 'An error occurred on the server'
        })
    }   
})

router.get('/:id', async(req,res)=>{
    const parent = await Parent.findById(req.params.id)
   
    res.json(parent)
})

router.post('/', async(req,res)=>{
    
    const {name, last_name, DNI_parent, mail, password, phone_number, address, ID_related, related_students} = req.body
    const parent = new Parent({name, last_name, DNI_parent, mail, password, phone_number, address, ID_related, related_students})
        
    await parent.save()
    res.json({status: 'The parent was saved successfully'})
})

router.put('/:id', async(req, res)=>{
    const {name, last_name, DNI_parent, mail, password, phone_number, address, ID_related, related_students} = req.body
    const newParent = {name, last_name, DNI_parent, mail, password, phone_number, address, ID_related, related_students}
    await Parent.findByIdAndUpdate(req.params.id, newParent)
    res.json({status:'The parent was updated successfully'})
})

router.delete('/:id', async(req,res)=>{
    await Parent.findByIdAndRemove(req.params.id)
    res.json({status:'The parent was removed successfully'})
})

module.exports = router
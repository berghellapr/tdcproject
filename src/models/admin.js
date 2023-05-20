const mongoose = require('mongoose')

const {Schema} = mongoose

const AdminSchema = new Schema({
    name:{type:String, required:true},
    last_name:{type:String, required:true},
    DNI:{type:Number, required:true},
    mail:{type:String, required:true},
    password:{type:String, required:true},
    phone_number:{type:String, required:true},
    address:{
        street:{type:String, required:true},
        number:{type:Number, required:true},
        zip_code:{type:String, required:true}
        }
})

module.exports = mongoose.model('Admin', AdminSchema)
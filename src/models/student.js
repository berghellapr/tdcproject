const mongoose = require('mongoose')

const {Schema} = mongoose

const StudentSchema = new Schema({
    name:{type:String, required:true},
    last_name:{type:String, required:true},
    DNI_student:{type:Number, required:true},
    file_number:{type:Number, required:true},
    phone_number:{type:String, required:true},
    address:{
        street:{type:String, required:true},
        number:{type:Number, required:true},
        zip_code:{type:String, required:true}
        },
        grade:{type:Number, required:true}
})

module.exports = mongoose.model('Student', StudentSchema)
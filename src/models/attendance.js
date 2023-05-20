const mongoose = require('mongoose')

const {Schema} = mongoose

const AttendanceSchema = new Schema({
    ID_attendance:{type:Number, required:true},
    file_number:{type:Number, required:true},
    date:{type:Date, required:true},
    state:{type:Boolean, required:true}
})

module.exports = mongoose.model('Attendance', AttendanceSchema)
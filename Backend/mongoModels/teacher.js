const mongoose = require('mongoose')

const Schema = mongoose.Schema
const teacherSchema = new Schema({
    firstName:'string',
    lastName:'string',
    email: 'string',
    password:'string',
    mobileNumber:'number',
    gender:'string',
    birthString:'string'
})

module.exports=mongoose.model('teacher', teacherSchema)
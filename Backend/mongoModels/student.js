const mongoose = require('mongoose')

const Schema = mongoose.Schema
const studentSchema = new Schema({
    name: 'string',
    class: 'string',
    age: 'number',
    roll:'string',
    email:'string',
    phone: 'number',
    address: 'string',
})

module.exports=mongoose.model('students', studentSchema)
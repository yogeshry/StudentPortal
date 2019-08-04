const student = require('../mongoModels/student')

function studentsList() {
    return student.find()
}

module.exports = {
    studentsList,
}
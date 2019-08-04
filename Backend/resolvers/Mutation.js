const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Teacher = require('../mongoModels/teacher')
const Student = require('../mongoModels/student')

const { APP_SECRET } = require('../src/utils')
async function signup( parent, args, context, info) {
    // hash password using bcrypt
    const password = await bcrypt.hash(args.password, 10)

    // crete instance of teacher and save to database
    let teacher = new Teacher({ ...args, password })
    teacher.save()

    // sign in after successful signup using JWT auth
    const token = jwt.sign({ teacherId: teacher.id }, APP_SECRET)

    // return authPayload
    return {
        token,
        teacher,
    }
}

async function login( parent, args, context, info) {
    // query by email
    const teacher = await Teacher.findOne().where({ email: args.email })

    if (!teacher) {
        throw new Error('No such teacher found')
    }

    //compare password and validate
    const valid = await bcrypt.compare(args.password, teacher.password)
    if (!valid) {
        throw new Error('Invalid password')
    }

    const token = jwt.sign({ teacherId: teacher.id }, APP_SECRET)

    // return authPayload
    return {
        token,
        teacher,
    }
}
function addStudent(parent, args, context, info) {
    // crete instance of student and save to database
    let student = new Student({...args});
    student.save()
	return student

}

module.exports = {
    signup,
    login,
    addStudent,
}
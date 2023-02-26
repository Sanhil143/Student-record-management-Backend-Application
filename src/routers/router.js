const router = require('express')()
const {createTeacher} = require('../controllers/teacherController')


//teachers
router.post('/signup', createTeacher)


module.exports = router
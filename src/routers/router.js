const router = require('express')()
const {createTeacher, loginTeacher} = require('../controllers/teacherController')


//teachers
router.post('/signup', createTeacher)
router.post('/signin', loginTeacher)


module.exports = router
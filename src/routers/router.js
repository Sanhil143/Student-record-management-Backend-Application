const router = require('express')()
const {createTeacher, loginTeacher} = require('../controllers/teacherController')
const {createStudent,updateData,getData,deleteStudent} = require('../controllers/studentController')
const {teacherMiddle,auth2} = require('../middlewares/middleware')


//teachers
router.post('/signup', createTeacher)
router.post('/signin', loginTeacher)
//
router.post("/:teacherId/student" ,teacherMiddle,auth2, createStudent)
router.put("/:teacherId/:studentId/student" , teacherMiddle,auth2,updateData)
router.get("/data", teacherMiddle,getData)
router.delete("/:teacherId/:studentId/deleted" , teacherMiddle,auth2,deleteStudent)


router.all('/*' ,(req,res)=>{
  res.status(400).send({status: false , message:"invalid path"})
})



module.exports = router
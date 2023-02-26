const studentModel = require('../models/studentModel')
const teacherModel = require('../models/teacherModel')

const createStudent = async (req, res) => {
      let data = req.body
      let teacherId = req.params.teacherId

      let user = await teacherModel.findById({ _id: teacherId })
      if (!user) return res.status(400).send({ status: false, message: " not found" })
      let create = await studentModel.create(data)
      res.status(400).send({ status: true, data: create })
}

const getData = async (req, res) => {

      let query = req.query

      let data = await studentModel.find(query)
      if (data.length == 0) return res.status(400).send({ status: false, message: " not found" })
      res.status(200).send({ status: true, data: data })

}

const updateData = async (req, res) => {
      let studentId = req.params.studentId
      let data = req.body

      let update = await studentModel.findOneAndUpdate({ _id: studentId, isDeleted: false }, data, { new: true })
      if (!update) return res.status(400).send({ status: false, message: "id not found" })
      res.status(400).send({ status: true, data: update })
}

const deleteStudent = async (req, res) => {
      let studentId = req.params.studentId
      let deleted = await studentModel.findOneAndUpdate({ _id: studentId, isDeleted: false }, { isDeleted: true })
      if (!deleted) return res.status(400).send({ status: false, message: "id not found" })
      return res.status(200).send({ status: true, message: "successful deleted" })
}

module.exports = {createStudent,getData,updateData,deleteStudent}
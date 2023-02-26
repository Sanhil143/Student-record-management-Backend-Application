const studentModel = require('../models/studentModel')
const teacherModel = require('../models/teacherModel')

exports.createStudent = async (req, res) => {
      let data = res.body
      let id = req.params.userId

      let user = await teacherModel.findById({ _id: id })
      if (!user) return res.status(400).send({ status: false, message: " not found" })
      data.teacherName = user.name
      let create = await studentModel.create(data)
      res.status(400).send({ status: true, data: create })
}

exports.getData = async (req, res) => {

      let query = req.query

      let data = await studentModel.find(query)
      if (data.length == 0) return res.status(400).send({ status: false, message: " not found" })
      res.status(200).send({ status: true, data: data })

}

exports.updateData = async (req, res) => {
      let id = req.params
      let data = req.body

      let update = await studentModel.findOneAndUpdate({ _id: id, isDeleted: false }, data, { new: true })
      if (!update) return res.status(400).send({ status: false, message: "id not found" })
      res.status(400).send({ status: true, data: update })
}

exports.deleteStudent = async (req, res) => {
      let id = req.params
      let deleted = await studentModel.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true })
      if (!deleted) return res.status(400).send({ status: false, message: "id not found" })
      return res.status(200).send({ status: true, message: "successful deleted" })
}


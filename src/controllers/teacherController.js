const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const teacherModel = require('../models/teacherModel')
const { validName, validEmail, validPhone, validPassword } = require('../validations/regexValidation')



const createTeacher = async (req, res) => {
      try {
            let data = req.body
            if (Object.keys(data).length === 0) {
                  return res.status(400).send({ status: false, message: "please provide your details!" })
            }
            const { name, email, password, phone, ...rest } = data

            if (Object.keys(rest).length > 0) {
                  return res.status(400).send({ status: false, message: "Please enter valid details!" })
            }
            //name
            if (!name || name.trim() == "") {
                  return res.status(400).send({ status: false, message: "please enter your name" })
            }
            if (!validName(name)) {
                  return res.status(400).send({ status: false, message: "please enter your valid name" })
            }
            //email
            if (!email && email.trim() == "") {
                  return res.status(400).send({ status: false, message: "please enter your email!" })
            }
            if (!validEmail(email)) {
                  return res.status(400).send({ status: false, message: "please enter valid email!" })
            }
            let verifyEmail = await teacherModel.findOne({ email: email })
            if (verifyEmail) {
                  return res.status(400).send({ status: false, message: "email is already exist" })
            }
            //phone
            if (!phone) {
                  return res.status(400).send({ status: false, message: "please enter your phone no.!" })
            }
            if (!validPhone(phone)) {
                  return res.status(400).send({ status: false, message: "please enter valid phone no.!" })
            }
            let verifyPhone = await teacherModel.findOne({ phone: phone })
            if (verifyPhone) {
                  return res.status(400).send({ status: false, message: "phone no. is already exist!" })
            }
            //password
            if (!password) {
                  return res.status(400).send({ status: false, message: "please enter your password!" })
            }
            if (!validPassword(password)) {
                  return res.status(400).send({ status: false, message: "please enter valid password!" })
            }
            data.password = await bcrypt.hash(password, 10)

            let savedData = await teacherModel.create(data)
            return res.status(201).send({ status: true, message: "Successfully created your account", data: savedData })
      }
      catch (err) {
            return res.status(500).send({ status: false, message: err.message })
      }
}

const loginTeacher = async (req, res) => {
      try {
            let data = req.body
            if (Object.keys(data).length == 0) {
                  return res.status(400).send({ status: false, message: "please provide login login credentials!" })
            }
            const { email, password } = data
            if (!email) {
                  return res.status(400).send({ status: false, message: "please enter your email!" })
            }
            if (!password) {
                  return res.status(400).send({ status: false, message: "please enter your password" })
            }
            let verify = await teacherModel.findOne({ email: email })
            if (!verify) {
                  return res.status(400).send({ status: false, message: "please enter valid email!" })
            }
            let hash = verify.password
            let decryptPass = await bcrypt.compare(password, hash)
            if (!decryptPass) {
                  return res.status(400).send({ status: false, message: "please enter valid password!" })
            }
            let token = jwt.sign({ teacherId: verify._id }, "Sanhil", { expiresIn: "1h" })
            let obj = { teacherId: verify._id, token }
            return res.status(200).send({ status: true, message: "login successfully", data: obj })
      }
      catch (err) {
            return res.status(500).send({ status: false, message: "err.message" })
      }
}



module.exports = { createTeacher, loginTeacher }
const mongoose = require('mongoose')


const teacherSchema = new mongoose.Schema({
      name: {
            type: String,
            required: true
      },
      email: {
            type: String,
            required: true,
            unique: true
      },
      password: {
            type: String,
            required: true
      },
      phone: {
            type: Number,
            unique: true
      },
      isDeleted:{
            type: Boolean,
            default:false
      }
}, { timestamps: true })


module.exports = mongoose.model('teachers', teacherSchema)
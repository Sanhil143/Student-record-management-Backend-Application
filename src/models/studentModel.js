const mongoose = require('mongoose')

const objectId = mongoose.Schema.Types.ObjectId

const studentSchema = new mongoose.Schema({
      name: {
            type: String,
            required: true
      },
      teacherId: {
            type: objectId,
            ref: 'teachers'
      },
      subject: {
            type: String,
            required: true,
            
      },
      marks: {
          type:Number,
          required:true
      },
      isDeleted: {
            type: Boolean,
            default: false
      },
      updatedAt: {
            type: Date,

      },
      deletedAt: {
            type: Date,

      },

}, { timestamps: true })

module.exports = mongoose.model('students', studentSchema)
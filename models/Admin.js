const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full Name (fullName) is required'],
      trim: true,
      minlength: [3, 'fullName must be at least 3 chars long'],
    },
    email: {
      type: String,
      unique: [true, 'email already exist'],
    },
    password: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Admin', AdminSchema)

const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First Name (firstName) is required'],
      minlength: 5,
      maxlength: 50,
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last Name (lastName) is required'],
      minlength: 5,
      maxlength: 50,
      trim: true,
    },
    otherName: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      default: 'Male',
      minlength: 4,
      maxlength: 6,
      trim: true,
    },
    email: {
      type: String,
      unique: [true, 'Email is already Taken'],
      required: [true, 'Email is required'],
      minlength: 5,
      maxlength: 255,
      trim: true,
    },

    password: {
      type: String,
      minlength: 8,
      maxlength: 255,
      select: false, //default hide password
    },
    passwordChangedAt: {
      type: Date,
      select: false,
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      select: false,
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      select: false,
    },
    deleted: {
      type: Boolean,
      default: false,
      select: false,
    },
  },
  { timestamps: true, discriminatorKey: 'type' }
)

// Hooks

userSchema.pre(/find/, function (next) {
  this.select({ deleted: false })
  next()
})

// Hashing Password
// userSchema.pre('save', function (next) {
//   if (this.isModified('password') || this.isNew) {
//     const salt = bcrypt.genSaltSync(11)
//     this.password = bcrypt.hashSync(this.password, salt)
//     this.passwordChangedAt = Date.now() - 1000
//   }
//   next()
// })

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { iat: Date.now() + 2000, userId: this._id },
    config.get('jwtPrivateKey')
  )
  return token
}

userSchema.methods.changesPasswordAfter = function (timestamp) {
  if (this.passwordChangedAt) {
    return this.passwordChangedAt.getTime() > timestamp
  }
  return false
}

userSchema.virtual('fullName').get(function () {
  if (this.otherName) {
    return `${this.firstName} ${this.otherName} ${this.lastName}`
  }
  return `${this.firstName} ${this.lastName}`
})

const User = mongoose.model('User', userSchema)
module.exports = User

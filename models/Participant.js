const mongoose = require('mongoose')
const moment = require('moment')

const ParticipantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Participant Name (name) is required'],
    },
    title: {
      type: String,
      trim: true,
    },

    createdAt: {
      type: String,
      default: moment().format('dddd Do MMMM YYYY'),
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// Virtual Populate Fields
ParticipantSchema.virtual('claims', {
  ref: 'Claim',
  localField: '_id',
  foreignField: 'participant',
})

// Hooks
ParticipantSchema.pre('findOne', function (next) {
  this.populate('claims', 'amount description status createdAt')
  next()
})

const Participant = mongoose.model('Participant', ParticipantSchema)
module.exports = Participant

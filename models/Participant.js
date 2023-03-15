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
  }
)

const Participant = mongoose.model('Participant', ParticipantSchema)
module.exports = Participant

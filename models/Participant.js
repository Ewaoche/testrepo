const mongoose = require('mongoose');
const moment = require('moment');

const ParticipantSchema = new mongoose.Schema({
  name: {
    type: String
  },
  title: {
    type: String
  },

  createdAt: {
    type: String,
   default: moment().format("dddd Do MMMM YYYY")
  }
}, 


);






module.exports = mongoose.model('Participant', ParticipantSchema);

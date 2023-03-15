const mongoose = require('mongoose');
const moment = require('moment');

const ParticipantSchema = new mongoose.Schema({
  pid: {
    type: String
  },
  title: {
    type: String
  },
nin:{type: Number},
  firstName: {
    type: String,

  },
  lastName: {
    type: String

  },
  address: {
    type: String,

  },
  country: {
    type: String,

  },
  state: {
    type: String,

  },
  lga: {
    type: String,

  },
  ward: {
    type: String,

  },
  dob: {
    type: String,
    default: moment().format("dddd Do MMMM YYYY")

  },
  gender: {
    type: String,
    required: [true, 'Please add an gender'],

  },
  gsm: {
    type: String,
    required: [true, 'Please add an gsm'],

  },
  natureOfBiz: {
    type: String,
    required: [true, 'Please add an natureOfBiz'],

  },
  occupation: {
    type: String,
    required: [true, 'Please add an occupation'],

  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
 
  createdAt: {
    type: String,
   default: moment().format("dddd Do MMMM YYYY")
  }
}, 

{
  toJSON: {
      transform(doc, ret){
          ret.id = ret._id;
          delete ret.password;
          delete ret.__v;
          delete  ret._id;
      }
  }
}
);






module.exports = mongoose.model('Participant', ParticipantSchema);

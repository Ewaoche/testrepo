const mongoose = require('mongoose');
const moment = require('moment');
const MotorPolicyItemSchema = new mongoose.Schema({

   motor_PolicyId:{
     type:String
   },
   coverType: {
    type: String
  },
  registrationNumber: {
    type: String
  },
   bodyType: {
    type: String
  },
   numberPlate: {
    type: String
  },
  color: {
    type: String
  },
  vehicleUsage: {
    type: String
  },
  vehicleCategory: {
    type: String
  },
  vehicleModel: {
    type: String
  },
  vehicleMake: {
    type: String
  },
  // itemType: {
  //   type: String,
  //   enum: ['motor', 'fire', 'engineering','generalAcident','marine'],
  //   default: 'motor'
  // },
  engineSize: {
    type: String
  },
  vin: {
    type: String
  },
   
   riskType:{
     type:String,
   },
   issuanceDate: {
    type: String,
    default: moment().format("dddd Do MMMM YYYY")
  },
  expiryDate: {
    type: String,
    default: moment().format("dddd Do MMMM YYYY")
  },
  sumCovered: {
    type: String
  },
  contribution: {
    type: Number
  },
  // absolute: {
  //   type: Boolean,
  //   default:true
  // },
  valueType:{
    type: String,
    enum: ['abs', 'per'],
    default: 'abs'
  },
  // percentage: {
  //   type: Boolean,
  //   default:false
  // },
  percentageValue: {
    type: Number,
    
  },
  
  endDate:{
     type:String,
     default: moment().format("dddd Do MMMM YYYY")

   },
   itemStatus:{
     type:String,
   },
   sumAssuerd:{
     type:String,
   },
  
   currentPremium:{
     type:String,
   },
   inspectionDate:{
     type:String,
     default: moment().format("dddd Do MMMM YYYY")

   },
   rate:{
     type:String,
   },

  


},
{
  toJSON: {
      transform(doc, ret){
          ret.id = ret._id;
          delete ret.__v;
          delete  ret._id;
      }
  }
}
);


module.exports = mongoose.model('MotorPolicyItem', MotorPolicyItemSchema);
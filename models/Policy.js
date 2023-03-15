const mongoose = require('mongoose');
const moment = require('moment');
const PolicySchema = new mongoose.Schema({

  policy: {
    type: String
  },
  plid: {
    type: String
  },
  policyId: {
    type: String
  },
  participantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Participant',
    required: [true, 'please add ParticipantId']
  },
  motorPolicyitem: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MotorPolicyItem'
  }],
  marinePolicyitem: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MarinePolicyItem'
  }],



  agency: {
    type: String,
  },
  marketingGroup: {
    type: String,
  },
  policyType: {
    type: String,
  },
  riskType: {
    type: String,
  },
  businessType: {
    type: String,
  },
  sector: {
    type: String,
  },

  effectiveDate: {
    type: String,
    default: moment().format("dddd Do MMMM YYYY")

  },
  expDate: {
    type: String,
    default: moment().format("dddd Do MMMM YYYY")
  },
  paid: {
    type: Boolean,
    default: false
  },
  companyShare: {
    type: String,
  },
  currency: {
    type: String,
  },
  underWritingYear: {
    type: String

  },
  branch: {
    type: String,
  },
  relationshipOfficer: {
    type: String,
  },



},
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
      }
    }
  }
);

let ID;
let words = "";
let classfirstWord
let classsecondWord
let classthirdWord
let joinedPolicyClass

let riskfirstWord
let risksecondWord
let riskthirdWord
let riskjoined

let myday;
let mymonth;
let myDate;
let myeffectiveDate

let branchWord






PolicySchema.pre('save', function (next) {
  words = this.policyType;
  risks = this.riskType;
  branch = this.branch;
  myeffectiveDate = this.effectiveDate;

  if (words.includes(' ')) {
    classfirstWord = words.split(" ")[0];
    classfirstWord = classfirstWord.slice(0, 3).toUpperCase();
    classsecondWord = words.split(" ")[1];
    classsecondWord = classsecondWord.slice(0, 3).toUpperCase();

    classthirdWord = words.split(" ")[2];

    if (classthirdWord.length > 0) {
      classthirdWord = classthirdWord.slice(0, 3).toUpperCase();
      joinedPolicyClass = `${classfirstWord}-${classsecondWord}-${classthirdWord}`;

    } else {
      joinedPolicyClass = `${classfirstWord}-${classsecondWord}`;

    }

  } else {
    joinedPolicyClass = this.policyType;
  }

  if (risks.includes(' ')) {
    riskfirstWord = risks.split(" ")[0];
    riskfirstWord = riskfirstWord.slice(0, 3).toUpperCase();
    risksecondWord = risks.split(" ")[1];
    risksecondWord = risksecondWord.slice(0, 3).toUpperCase();


    riskthirdWord = risks.split(" ")[2];

    if (riskthirdWord.length > 1) {
      riskthirdWord = riskthirdWord.slice(0, 3).toUpperCase();
      riskjoined = `${riskfirstWord}-${risksecondWord}-${riskthirdWord}`;

    } else {
      riskjoined = `${riskfirstWord}-${risksecondWord}`;

    }


  } else {
    riskjoined = this.riskType.slice(0, 3).toUpperCase();
  }


  if (branch === 'HEAD OFFICE') {
    branchWord = branch.split(" ")[0].toUpperCase();
  } else {
    branchWord = branch.slice(0, 3).toUpperCase();

  }

  if (myeffectiveDate) {
    myday = myeffectiveDate.split("-")[2];
    mymonth = myeffectiveDate.split("-")[1];
    myDate = `${myday}-${mymonth}`;

  } else {
    myDate = "";

  }


  this.policyId = `${joinedPolicyClass}/${riskjoined}/${branchWord}/${myDate}/${this.plid}`
  return next();

});



module.exports = mongoose.model('Policy', PolicySchema);
const { Schema, model } = require('mongoose')
const { CLAIM_STATUS } = require('../utils/constants')

const policySchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Policy name (name) is required'],
      trim: true,
    },
    description: String,

    // Maximum Amount Covered By This Policy
    maxAmountCovered: {
      type: Number,
      required: [true, 'Maximum Amount Covered (maxAmountCovered) is required'],
    },

    payable: {
      type: Number,
      required: [true, 'Payable Amount (payable) is required'],
      validate: {
        validator: function (val) {
          // As a test
          // Can not be more than 30% of maxAmountCovered
          return val <= 0.3 * this.payable
        },
        message: 'payable exceed 30% of amount Covered',
      },
    },
    // Interval in days covered by each payable
    // After which policy expires
    interval: {
      type: Number,
      required: [true, 'Payment Interval'],
      max: 365, // A maximum of 1 year
      min: 1, // Minimum of a day
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// Virtual Populate Field

// If populated returned all claims that are yet to be resolved under this policy
policySchema.virtual('pending_claims', {
  ref: 'Claim',
  localField: '_id',
  foreignField: 'policy',
  match: {
    status: [
      CLAIM_STATUS.PENDING,
      CLAIM_STATUS.UNDER_REVIEW,
      CLAIM_STATUS.APPROVED,
    ],
  },
})

const Policy = model('Policy', policySchema)
module.exports = Policy

const { Schema, model } = require('mongoose')

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
  }
)

const Policy = model('Policy', policySchema)
module.exports = Policy

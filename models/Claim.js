const { Schema, model, Types } = require('mongoose')
const { CLAIM_STATUS } = require('../utils/constants')

const claimSchema = Schema(
  {
    policy: {
      type: Types.ObjectId,
      ref: 'Policy',
      required: [true, 'Policy ID (policy) is required'],
    },
    participant: {
      type: Types.ObjectId,
      ref: 'Participant',
      required: [true, 'Participant ID (participant) is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount claimed (amount) is required'],
      min: [0, 'amount can not be negative'],
    },
    description: String, // Additional Information,
    // Optional Third party details
    thirdParty: {
      name: String,
      address: String,
      contact: String,
    },
    status: {
      type: String,
      default: CLAIM_STATUS.PENDING,
      enum: {
        values: Object.values(CLAIM_STATUS),
        message: `Invalid claim status accepted = (${Object.values(
          CLAIM_STATUS
        ).join(',')})`,
      },
    },
  },
  {
    timestamps: true,
  }
)

// Hooks

const Claim = model('Claim', claimSchema)
module.exports = Claim

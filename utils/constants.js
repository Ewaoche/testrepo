/**
 * Defines different status a claim can be in
 */
const ClaimStatus = Object.freeze({
  PENDING: 'pending',
  UNDER_REVIEW: 'under_review',
  DENIED: 'denied',
  APPROVED: 'approved',
  CANCELED: 'canceled',
})

exports.CLAIM_STATUS = ClaimStatus

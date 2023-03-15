const ErrorResponse = require('../../utils/errorResponse')
const ParticipantRepository = require('./participantRepository')
const asyncHandler = require('../../middleware/async')
const { generateRandomToken } = require('../../utils/helper')
var participantRepo = new ParticipantRepository()

const createParticipant = asyncHandler(async (req, res, next) => {
  // Not Required Validated by mongoose schema
  // const participant = await  participantRepo.getParticipantByEmail(req.body.email);
  // if (participant) {
  //   return next(
  //     new ErrorResponse(
  //       `The Participant with Email ${ req.body.email}  already exist`,
  //       400
  //     )
  //   );
  // }

  req.body.pid = generateRandomToken(6)

  const participants = await participantRepo.createParticipant(req.body)
  res.status(201).json({
    success: true,
    data: participants,
  })
})

const getParticipants = asyncHandler(async (req, res, next) => {
  const participants = await participantRepo.getAllParticipant()

  return res.status(200).json({
    success: true,
    count: participants.length,
    data: participants,
  })
})
//

const getParticipant = asyncHandler(async (req, res, next) => {
  const participant = await participantRepo.getParticipantById(req.params.id)
  if (!participant) {
    return next(
      new ErrorResponse(
        `Please No participant with the id of ${req.params.id}`,
        404
      )
    )
  }

  res.status(200).json({
    success: true,
    data: participant,
  })
})

module.exports = {
  createParticipant,
  getParticipant,
  getParticipants,
}
